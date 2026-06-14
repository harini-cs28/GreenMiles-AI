import { Share2, Download, CheckCircle, Leaf } from "lucide-react";
import { useApp } from "../context/AppContext";

interface Trip {
  from: string;
  to: string;
  mode: string;
  modeEmoji: string;
  distance: string;
  time: string;
  co2Saved: number;
  co2Baseline: number;
  coins: number;
  date: string;
}

const sampleTrip: Trip = {
  from: "Home, Sector 14",
  to: "IIT Campus, Hauz Khas",
  mode: "Metro",
  modeEmoji: "🚇",
  distance: "4.1 km",
  time: "18 min",
  co2Saved: 1.1,
  co2Baseline: 1.4,
  coins: 110,
  date: "Sunday, June 14, 2026 · 9:42 AM",
};

export function CarbonReceipt() {
  const { coins, co2Saved, tripsCompleted, userTrees } = useApp();

  return (
    <div className="p-6 max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Carbon Receipt 🧾</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Your trip summary and environmental impact
        </p>
      </div>

      {/* Receipt card */}
      <div className="bg-white rounded-3xl border border-green-100 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              <span className="font-extrabold">GreenMiles AI</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
              <CheckCircle className="w-3 h-3" />
              Verified Eco Trip
            </div>
          </div>
          <p className="text-green-200 text-xs mb-1">{sampleTrip.date}</p>
          <div className="flex items-center gap-3">
            <div className="text-4xl">{sampleTrip.modeEmoji}</div>
            <div>
              <p className="font-extrabold text-xl">{sampleTrip.from}</p>
              <p className="text-green-200">→ {sampleTrip.to}</p>
            </div>
          </div>
        </div>

        {/* Dashed divider */}
        <div className="flex items-center px-6 py-3 bg-green-50">
          <div className="flex-1 border-t border-dashed border-green-200" />
          <div className="w-5 h-5 bg-green-50 rounded-full border-2 border-green-200 flex items-center justify-center mx-2 shrink-0">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          </div>
          <div className="flex-1 border-t border-dashed border-green-200" />
        </div>

        {/* Trip details */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Mode", val: sampleTrip.mode },
              { label: "Distance", val: sampleTrip.distance },
              { label: "Duration", val: sampleTrip.time },
            ].map((d) => (
              <div key={d.label} className="text-center bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">{d.label}</p>
                <p className="font-bold text-gray-800 text-sm">{d.val}</p>
              </div>
            ))}
          </div>

          {/* CO2 impact */}
          <div className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Carbon Impact</p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-sm" />
                <span className="text-sm text-gray-600">Car equivalent</span>
              </div>
              <span className="font-bold text-red-500">{sampleTrip.co2Baseline} kg CO₂</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
                <span className="text-sm text-gray-600">{sampleTrip.mode} emissions</span>
              </div>
              <span className="font-bold text-green-600">0.3 kg CO₂</span>
            </div>
            <div className="border-t border-green-200 pt-3 flex items-center justify-between">
              <span className="font-bold text-gray-800">🌍 You Saved</span>
              <span className="font-extrabold text-2xl text-green-600">{sampleTrip.co2Saved} kg CO₂</span>
            </div>
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              = Driving 4.4 km less in a petrol car
            </p>
          </div>

          {/* GreenCoins earned */}
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-4 mb-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80 font-medium">GreenCoins Earned</p>
                <p className="text-3xl font-extrabold">+{sampleTrip.coins} 🪙</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-70">Total Balance</p>
                <p className="font-bold text-lg">{coins.toLocaleString()} 🪙</p>
              </div>
            </div>
          </div>

          {/* Fun fact */}
          <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-100">
            <p className="text-xs text-blue-700 font-semibold">
              💡 Fun Fact: You've now saved enough CO₂ to charge 47 smartphones fully!
            </p>
          </div>

          {/* Cumulative stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Total CO₂ Saved", val: `${co2Saved.toFixed(1)} kg`, emoji: "🌍" },
              { label: "Total Coins", val: `${coins.toLocaleString()} 🪙`, emoji: "💰" },
              { label: "Green Trips", val: tripsCompleted.toString(), emoji: "🚲" },
              { label: "Trees Planted", val: `${userTrees.toFixed(1)} 🌳`, emoji: "🌲" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">{s.label}</p>
                <p className="font-bold text-gray-800 text-sm">{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-green-200">
            <Share2 className="w-4 h-4" />
            Share Impact
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

