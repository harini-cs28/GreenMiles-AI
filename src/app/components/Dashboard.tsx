import { Leaf, Zap, TrendingUp, Flame, Star, MapPin, Clock, ChevronRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { useApp } from "../context/AppContext";

const weekData = [
  { day: "Mon", co2: 1.2, coins: 120 },
  { day: "Tue", co2: 2.8, coins: 280 },
  { day: "Wed", co2: 1.5, coins: 150 },
  { day: "Thu", co2: 3.4, coins: 340 },
  { day: "Fri", co2: 2.1, coins: 210 },
  { day: "Sat", co2: 4.2, coins: 420 },
  { day: "Sun", co2: 3.1, coins: 310 },
];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { coins, co2Saved, tripsCompleted, streak, trips, user } = useApp();
  const firstName = user?.name ? user.name.split(" ")[0] : "Arjun";

  const statCards = [
    {
      label: "CO₂ Saved",
      value: co2Saved.toFixed(1),
      unit: "kg",
      icon: <Leaf className="w-5 h-5" />,
      change: "+8.3 this week",
      positive: true,
      bg: "from-green-400 to-emerald-500",
      glow: "shadow-green-200",
    },
    {
      label: "GreenCoins",
      value: coins.toLocaleString(),
      unit: "",
      icon: <span className="text-lg">🪙</span>,
      change: "+180 today",
      positive: true,
      bg: "from-yellow-400 to-amber-500",
      glow: "shadow-yellow-200",
    },
    {
      label: "Trips Completed",
      value: tripsCompleted.toString(),
      unit: "",
      icon: <MapPin className="w-5 h-5" />,
      change: "+12 this week",
      positive: true,
      bg: "from-blue-400 to-cyan-500",
      glow: "shadow-blue-200",
    },
    {
      label: "Green Streak",
      value: streak.toString(),
      unit: "days",
      icon: <Flame className="w-5 h-5" />,
      change: "Personal best!",
      positive: true,
      bg: "from-orange-400 to-red-500",
      glow: "shadow-orange-200",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Good morning, {firstName}! 🌿</h1>
          <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Sunday, June 14, 2026 · Delhi, India
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
            <span>🪙</span>
            <span className="font-bold text-yellow-700">{coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-orange-600">{streak} days</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.bg} text-white rounded-2xl p-5 shadow-lg ${card.glow} relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-x-2 -translate-y-4" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">{card.label}</span>
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">{card.icon}</div>
            </div>
            <p className="text-3xl font-extrabold">
              {card.value}
              {card.unit && <span className="text-sm font-semibold ml-1 opacity-80">{card.unit}</span>}
            </p>
            <p className="text-xs mt-1 opacity-80 font-medium">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Sustainability score + chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Score */}
        <div className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm flex flex-col items-center justify-center">
          <p className="text-sm font-semibold text-gray-500 mb-3">Sustainability Score</p>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#dcfce7" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 42 * 0.82} ${2 * Math.PI * 42}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-gray-900">82</span>
              <span className="text-xs text-green-600 font-semibold">Excellent</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Top 12% of all users
            </p>
            <div className="flex items-center gap-1 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* CO2 chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-gray-900">Weekly CO₂ Savings</p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>Jun 8 – Jun 14, 2026</p>
            </div>
            <div className="flex items-center gap-1 bg-green-50 rounded-full px-3 py-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs font-bold text-green-600">+23%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #dcfce7", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [`${v} kg`, "CO₂ Saved"]}
              />
              <Area type="monotone" dataKey="co2" stroke="#22c55e" strokeWidth={2.5} fill="url(#co2Grad)" dot={{ fill: "#22c55e", strokeWidth: 0, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activities + GreenCoins chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent trips */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900">Recent Activities</p>
            <button
              onClick={() => onNavigate("route")}
              className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              Plan trip <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {trips.slice(0, 4).map((trip, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {trip.modeEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {trip.from} → {trip.to}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{trip.mode}</span>
                    <span className="text-gray-200">·</span>
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{trip.time}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-400">{trip.date}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-green-600">-{trip.co2Saved}kg CO₂</p>
                  <p className="text-xs font-bold text-yellow-600">+{trip.coins} 🪙</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GreenCoins earnings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900">Coins Earned</p>
            <span className="text-xl">🪙</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weekData} barSize={18}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #fef3c7", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [v, "GreenCoins"]}
              />
              <Bar dataKey="coins" fill="#facc15" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-between bg-yellow-50 rounded-xl p-3">
            <div>
              <p className="text-xs text-gray-500">This week total</p>
              <p className="font-extrabold text-gray-900">1,830 🪙</p>
            </div>
            <button
              onClick={() => onNavigate("wallet")}
              className="text-xs font-semibold text-yellow-700 bg-yellow-100 hover:bg-yellow-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              View Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Plan Route", icon: "🗺️", page: "route", color: "bg-blue-50 border-blue-100 text-blue-700" },
          { label: "AI Coach", icon: "🤖", page: "coach", color: "bg-purple-50 border-purple-100 text-purple-700" },
          { label: "Eco Twin", icon: "👥", page: "ecotwin", color: "bg-pink-50 border-pink-100 text-pink-700" },
          { label: "Challenges", icon: "🏆", page: "challenges", color: "bg-orange-50 border-orange-100 text-orange-700" },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => onNavigate(a.page)}
            className={`${a.color} border rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform`}
          >
            <span className="text-2xl">{a.icon}</span>
            <span className="text-xs font-bold">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

