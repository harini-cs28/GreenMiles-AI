import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, DollarSign, Leaf, Zap, ChevronRight, Compass, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface Route {
  mode: string;
  label: string;
  time: string;
  timeVal: number;
  cost: string;
  costVal: number;
  distance: string;
  co2: number;
  co2Saved: number;
  coins: number;
  color: string;
  badge: string | null;
  steps: string[];
}

const getDeterministicDistance = (from: string, to: string): number => {
  const f = from.trim().toLowerCase();
  const t = to.trim().toLowerCase();
  if (!f || !t) return 0;
  
  // Default fallback for initial load: Sector 14 to IIT Hauz Khas
  if (
    (f.includes("sector 14") && t.includes("iit")) ||
    (f.includes("home") && t.includes("campus"))
  ) {
    return 3.2;
  }
  
  let hash = 0;
  const combined = f + t;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);
  const d = 1.2 + (absHash % 238) / 10; // 1.2 km to 25.0 km range
  return Math.round(d * 10) / 10;
};

const formatTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
};

export function RoutePlanner() {
  const { addTrip } = useApp();
  const [from, setFrom] = useState("Home, Sector 14");
  const [to, setTo] = useState("IIT Campus, Hauz Khas");
  const [selected, setSelected] = useState(0);
  const [searched, setSearched] = useState(true);

  // Navigation Simulation States
  const [navigatingRoute, setNavigatingRoute] = useState<Route | null>(null);
  const [navProgress, setNavProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [navIntervalId, setNavIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Distance calculation based on input values
  const D = getDeterministicDistance(from, to);

  // Dynamic Route Options Generator
  const generatedRoutes: Route[] = [];

  if (D > 0) {
    // 1. Walking
    if (D <= 6.0) {
      const timeMins = Math.max(1, Math.round(D * 15));
      generatedRoutes.push({
        mode: "🚶",
        label: "Walking",
        time: formatTime(timeMins),
        timeVal: timeMins,
        cost: "₹0",
        costVal: 0,
        distance: `${D} km`,
        co2: 0,
        co2Saved: parseFloat((0.27 * D).toFixed(1)),
        coins: Math.round(D * 40),
        color: "from-teal-400 to-cyan-500",
        badge: null,
        steps: [
          `Depart from ${from} on foot`,
          "Walk along the pedestrian sidewalk & cross sector boundaries",
          "Follow standard footpaths and crossing signals",
          `Arrive safely at ${to}`
        ]
      });
    }

    // 2. Bicycle
    if (D <= 15.0) {
      const timeMins = Math.max(1, Math.round(D * 4.5));
      generatedRoutes.push({
        mode: "🚲",
        label: "Bicycle",
        time: formatTime(timeMins),
        timeVal: timeMins,
        cost: `₹${10 + Math.round(D * 2)}`,
        costVal: 10 + Math.round(D * 2),
        distance: `${D} km`,
        co2: parseFloat((0.005 * D).toFixed(3)),
        co2Saved: parseFloat(((0.27 - 0.005) * D).toFixed(1)),
        coins: Math.round(D * 35),
        color: "from-green-400 to-emerald-500",
        badge: null,
        steps: [
          `Depart from ${from}`,
          "Unlock a nearby GreenMiles SmartBike at the dock station",
          "Ride safely using designated bicycle lanes and tracks",
          `Lock the bicycle at the station closest to ${to}`
        ]
      });
    }

    // 3. Metro
    if (D >= 1.5) {
      const metroD = parseFloat((D * 1.05).toFixed(1));
      const timeMins = Math.max(1, Math.round(D * 1.6) + 6);
      generatedRoutes.push({
        mode: "🚇",
        label: "Metro",
        time: formatTime(timeMins),
        timeVal: timeMins,
        cost: `₹${15 + Math.round(D * 3)}`,
        costVal: 15 + Math.round(D * 3),
        distance: `${metroD} km`,
        co2: parseFloat((0.04 * D).toFixed(1)),
        co2Saved: parseFloat(((0.27 - 0.04) * D).toFixed(1)),
        coins: Math.round(D * 25),
        color: "from-blue-400 to-indigo-500",
        badge: null,
        steps: [
          `Depart from ${from}`,
          "Walk to the closest rapid transit Metro Station entrance",
          "Board the fast transit train line towards destination",
          `Exit the station terminal and proceed to ${to}`
        ]
      });
    }

    // 4. Bus
    if (D >= 1.0) {
      const busD = parseFloat((D * 1.15).toFixed(1));
      const timeMins = Math.max(1, Math.round(D * 2.6) + 8);
      generatedRoutes.push({
        mode: "🚌",
        label: "Bus",
        time: formatTime(timeMins),
        timeVal: timeMins,
        cost: `₹${10 + Math.round(D * 1.5)}`,
        costVal: 10 + Math.round(D * 1.5),
        distance: `${busD} km`,
        co2: parseFloat((0.08 * D).toFixed(1)),
        co2Saved: parseFloat(((0.27 - 0.08) * D).toFixed(1)),
        coins: Math.round(D * 20),
        color: "from-yellow-400 to-amber-500",
        badge: null,
        steps: [
          `Depart from ${from}`,
          "Walk to the public transit bus stop",
          "Board the electric commuter bus route line",
          `De-board at the stop nearest to ${to}`
        ]
      });
    }

    // 5. Train
    if (D >= 5.0) {
      const trainD = parseFloat((D * 1.25).toFixed(1));
      const timeMins = Math.max(1, Math.round(D * 1.1) + 12);
      generatedRoutes.push({
        mode: "🚆",
        label: "Train",
        time: formatTime(timeMins),
        timeVal: timeMins,
        cost: `₹${15 + Math.round(D * 2)}`,
        costVal: 15 + Math.round(D * 2),
        distance: `${trainD} km`,
        co2: parseFloat((0.03 * D).toFixed(1)),
        co2Saved: parseFloat(((0.27 - 0.03) * D).toFixed(1)),
        coins: Math.round(D * 30),
        color: "from-purple-400 to-violet-500",
        badge: null,
        steps: [
          `Depart from ${from}`,
          "Navigate to the main commuter railway station",
          "Board the commuter train service departing on Platform 3",
          `De-board rail coach at the station near ${to}`
        ]
      });
    }

    // 6. Car/Cab
    const carD = parseFloat((D * 1.02).toFixed(1));
    const carTimeMins = Math.max(1, Math.round(D * 2.2) + 2);
    generatedRoutes.push({
      mode: "🚗",
      label: "Car/Cab",
      time: formatTime(carTimeMins),
      timeVal: carTimeMins,
      cost: `₹${50 + Math.round(D * 15)}`,
      costVal: 50 + Math.round(D * 15),
      distance: `${carD} km`,
      co2: parseFloat((0.27 * D).toFixed(1)),
      co2Saved: 0,
      coins: 0,
      color: "from-red-400 to-rose-500",
      badge: null,
      steps: [
        `Depart from ${from}`,
        "Order a ride-hailing cab or start personal vehicle",
        "Drive along standard roadways in regular city traffic",
        `Arrive at ${to}`
      ]
    });
  }

  // Calculate badges dynamically
  let cheapestIdx = -1;
  let minCost = Infinity;
  let fastestIdx = -1;
  let minTime = Infinity;
  let recommendedIdx = -1;
  let minCo2 = Infinity;

  generatedRoutes.forEach((route, idx) => {
    // Cheapest
    if (route.costVal < minCost) {
      minCost = route.costVal;
      cheapestIdx = idx;
    }
    // Fastest
    if (route.timeVal < minTime) {
      minTime = route.timeVal;
      fastestIdx = idx;
    }
    // Sustainable Recommended (lowest co2)
    if (route.co2 < minCo2) {
      minCo2 = route.co2;
      recommendedIdx = idx;
    } else if (route.co2 === minCo2) {
      // Tie breaker: prefer Bicycle over Walking as it is faster
      if (route.label === "Bicycle") {
        recommendedIdx = idx;
      }
    }
  });

  const routes = generatedRoutes.map((route, idx) => {
    let badge: string | null = null;
    if (idx === recommendedIdx) {
      badge = "AI Recommended";
    } else if (idx === fastestIdx) {
      badge = "Fastest";
    } else if (idx === cheapestIdx && route.costVal > 0) {
      badge = "Cheapest";
    }
    return { ...route, badge };
  });

  const recommendedRoute = routes.find(r => r.badge === "AI Recommended") || routes[0];
  const carRoute = routes.find(r => r.label === "Car/Cab") || routes[routes.length - 1];
  const savings = carRoute && recommendedRoute ? Math.max(0, parseFloat((carRoute.co2 - recommendedRoute.co2).toFixed(1))) : 0;
  const treesSaved = parseFloat((savings * 0.66).toFixed(1));

  const startNavigation = (route: Route) => {
    setNavigatingRoute(route);
    setNavProgress(0);
    setActiveStep(0);
  };

  useEffect(() => {
    if (navigatingRoute) {
      const interval = setInterval(() => {
        setNavProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const next = prev + 5;
          const stepsCount = navigatingRoute.steps.length;
          const stepIndex = Math.min(Math.floor((next / 100) * stepsCount), stepsCount - 1);
          setActiveStep(stepIndex);
          return next;
        });
      }, 800);
      setNavIntervalId(interval);
      return () => clearInterval(interval);
    }
  }, [navigatingRoute]);

  const finishCommute = () => {
    if (navigatingRoute) {
      if (navIntervalId) clearInterval(navIntervalId);
      
      addTrip({
        from,
        to,
        mode: navigatingRoute.label,
        modeEmoji: navigatingRoute.mode,
        distance: navigatingRoute.distance,
        time: navigatingRoute.time,
        co2Saved: navigatingRoute.co2Saved,
        co2Baseline: navigatingRoute.co2Saved + navigatingRoute.co2,
        coins: navigatingRoute.coins,
      });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setNavigatingRoute(null);
    }
  };

  const skipCommute = () => {
    setNavProgress(100);
    if (navigatingRoute) {
      setActiveStep(navigatingRoute.steps.length - 1);
    }
  };

  const cancelNavigation = () => {
    if (navIntervalId) clearInterval(navIntervalId);
    setNavigatingRoute(null);
  };

  const handleSearch = () => {
    if (!from.trim() || !to.trim()) {
      toast.error("Please enter both starting and destination locations.");
      return;
    }
    setSelected(0);
    setSearched(true);
  };

  // If navigating, show simulation layout
  if (navigatingRoute) {
    return (
      <div className="p-6 max-w-xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="bg-white rounded-3xl border border-green-100 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-6 text-white text-center relative">
            <Compass className="w-10 h-10 mx-auto mb-2 animate-spin-slow" />
            <h2 className="font-extrabold text-xl">Simulating Green Journey</h2>
            <p className="text-xs text-green-100 mt-1">{from} → {to}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Live Progress Card */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100 text-center relative overflow-hidden">
              <div className="text-4xl mb-2 animate-bounce inline-block">
                {navigatingRoute.mode}
              </div>
              <p className="font-bold text-gray-800 text-lg">{navigatingRoute.label} Ride</p>
              
              {/* Progress Bar */}
              <div className="w-full bg-green-100 rounded-full h-3 mt-4">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${navProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Distance: {navigatingRoute.distance}</span>
                <span className="font-bold text-green-700">{navProgress}% Completed</span>
                <span>Time: {navigatingRoute.time}</span>
              </div>
            </div>

            {/* Steps tracker */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Live GPS Guidance</p>
              <div className="relative pl-6 space-y-4 border-l border-green-100">
                {navigatingRoute.steps.map((step, idx) => {
                  const isActive = idx === activeStep;
                  const isPassed = idx < activeStep;

                  return (
                    <div key={idx} className="relative">
                      {/* Step Indicator Dot */}
                      <span className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 transition-all
                        ${isActive
                          ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-200"
                          : isPassed
                          ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                          : "bg-white border-gray-200 text-gray-300"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <p className={`text-sm transition-colors
                        ${isActive ? "font-bold text-gray-900" : isPassed ? "text-gray-400" : "text-gray-300"}`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Impact indicator */}
            <div className="bg-yellow-50 rounded-xl p-4 flex items-center justify-between border border-yellow-100">
              <div>
                <p className="text-xs text-gray-500">Accumulated Savings</p>
                <p className="font-extrabold text-green-700 text-lg">
                  -{(navigatingRoute.co2Saved * (navProgress / 100)).toFixed(2)}kg CO₂
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Estimated Earnings</p>
                <p className="font-extrabold text-yellow-600 text-lg">
                  +{Math.round(navigatingRoute.coins * (navProgress / 100))} 🪙
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              {navProgress < 100 ? (
                <>
                  <button
                    onClick={skipCommute}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    Skip Travel
                  </button>
                  <button
                    onClick={cancelNavigation}
                    className="px-4 bg-red-50 hover:bg-red-100 text-red-500 font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={finishCommute}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Log Eco Commute & Claim Rewards
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Route Planner 🗺️</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Compare routes and choose the greenest option
        </p>
      </div>

      {/* Search box */}
      <div className="bg-white rounded-3xl border border-green-100 shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From location"
              className="w-full pl-9 pr-4 py-3 bg-green-50 border border-green-100 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To location"
              className="w-full pl-9 pr-4 py-3 bg-green-50 border border-green-100 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-200"
        >
          Find Green Routes
        </button>
      </div>

      {searched && (
        <>
          {/* AI Sustainable Insight Card */}
          {recommendedRoute && carRoute && (
            <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/10 border border-green-200/60 rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-4 items-center">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-xl -mr-5 -mt-5" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                🤖
              </div>
              <div className="flex-1 text-center md:text-left space-y-1">
                <h4 className="font-extrabold text-gray-900 text-sm">AI Sustainable Insight</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Choosing <strong className="text-green-700">{recommendedRoute.label} ({recommendedRoute.mode})</strong> over <strong className="text-red-600">Car/Cab</strong> saves <strong className="text-green-700">{savings} kg of CO₂</strong> emissions for this trip. That is equivalent to planting <strong className="text-green-700">{treesSaved} virtual trees</strong>! 🌱
                </p>
              </div>
              <div className="flex gap-2 shrink-0 bg-white/60 backdrop-blur border border-green-100 rounded-2xl px-4 py-2 text-center">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Net Savings</p>
                  <p className="text-base font-black text-green-600">-{savings}kg CO₂</p>
                </div>
              </div>
            </div>
          )}

          {/* Route cards */}
          <div className="grid grid-cols-1 gap-3">
            {routes.map((route, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`relative bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all hover:shadow-md
                  ${selected === i ? "border-green-400 shadow-lg shadow-green-100" : "border-gray-100 hover:border-green-200"}`}
              >
                {/* Badge */}
                {route.badge && (
                  <div
                    className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md
                      ${route.badge === "AI Recommended"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                        : route.badge === "Fastest"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                        : "bg-gradient-to-r from-yellow-500 to-amber-600"
                      }`}
                  >
                    {route.badge === "AI Recommended" && "🤖 "}
                    {route.badge}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {/* Mode icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${route.color} flex items-center justify-center text-2xl shadow-md shrink-0`}>
                    {route.mode}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{route.label}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {route.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <DollarSign className="w-3 h-3" />
                        {route.cost}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Navigation className="w-3 h-3" />
                        {route.distance}
                      </div>
                    </div>
                  </div>

                  {/* Carbon + coins */}
                  <div className="text-right shrink-0">
                    {route.co2Saved > 0 ? (
                      <>
                        <p className="text-sm font-bold text-green-600">
                          <Leaf className="w-3 h-3 inline mr-0.5" />
                          -{route.co2Saved}kg CO₂
                        </p>
                        <p className="text-xs font-bold text-yellow-600">+{route.coins} 🪙</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-red-500">
                          +{route.co2}kg CO₂
                        </p>
                        <p className="text-xs text-gray-400">No coins</p>
                      </>
                    )}
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${selected === i ? "text-green-500" : "text-gray-300"}`} />
                </div>

                {/* Expanded steps */}
                {selected === i && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Route Steps</p>
                    <div className="space-y-2 mb-4">
                      {route.steps.map((step, si) => (
                        <div key={si} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0">
                            {si + 1}
                          </div>
                          <p className="text-sm text-gray-600">{step}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startNavigation(route);
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-green-150"
                    >
                      Start Navigation
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm overflow-x-auto">
            <p className="font-bold text-gray-900 mb-4">Quick Comparison</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-100">
                  <th className="text-left pb-2 font-semibold">Mode</th>
                  <th className="text-center pb-2 font-semibold">Time</th>
                  <th className="text-center pb-2 font-semibold">Cost</th>
                  <th className="text-center pb-2 font-semibold">CO₂ Saved</th>
                  <th className="text-center pb-2 font-semibold">🪙 Coins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {routes.map((r, i) => (
                  <tr key={i} className={`${selected === i ? "bg-green-50" : ""} transition-colors`}>
                    <td className="py-2 font-medium">{r.mode} {r.label}</td>
                    <td className="py-2 text-center text-gray-600">{r.time}</td>
                    <td className="py-2 text-center text-gray-600">{r.cost}</td>
                    <td className="py-2 text-center">
                      {r.co2Saved > 0 ? (
                        <span className="text-green-600 font-semibold">-{r.co2Saved}kg</span>
                      ) : (
                        <span className="text-red-400">+{r.co2}kg</span>
                      )}
                    </td>
                    <td className="py-2 text-center font-bold text-yellow-600">{r.coins || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
