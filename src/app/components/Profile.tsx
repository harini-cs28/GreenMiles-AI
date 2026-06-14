import { MapPin, Calendar, Edit3, Award, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../context/AppContext";

const monthlyStats = [
  { month: "Jan", co2: 8 },
  { month: "Feb", co2: 12 },
  { month: "Mar", co2: 9 },
  { month: "Apr", co2: 18 },
  { month: "May", co2: 22 },
  { month: "Jun", co2: 14 },
];

export function Profile() {
  const { coins, co2Saved, tripsCompleted, streak, buddyLevel, trips, achievements, user } = useApp();
  const currentUserName = user?.name || "Arjun Mehta";
  const getInitials = (n: string) => {
    return n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const getLevelRole = (lvl: number) => {
    if (lvl === 0) return "Seed Starter";
    if (lvl === 1) return "Eco Sprout";
    if (lvl === 2) return "Sapling Savior";
    if (lvl === 3) return "Forest Guardian";
    if (lvl === 4) return "Eco Champion";
    return "Green Legend";
  };

  const earnedBadges = achievements.filter(a => a.earned);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">My Profile 👤</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Your sustainability journey and achievements
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-3xl border border-green-100 overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 relative">
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #facc15 0%, transparent 50%)" }}
          />
          <button className="absolute top-3 right-3 bg-white/20 backdrop-blur text-white p-2 rounded-xl hover:bg-white/30 transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-5 relative">
            <div className="w-20 h-20 -mt-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center text-white text-2xl font-extrabold border-4 border-white shadow-xl shrink-0 z-10">
              {getInitials(currentUserName)}
            </div>
            <div className="pt-2 text-center sm:text-left">
              <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">{currentUserName}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  Delhi, India
                </div>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Joined May 2026
                </div>
              </div>
            </div>
            <div className="sm:ml-auto pt-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-sm">
                Level {buddyLevel} · {getLevelRole(buddyLevel)}
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center sm:text-left" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Student and eco-warrior. On a mission to make my commute carbon-neutral by 2027. 🌱 Green travel ≥ Cab rides.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "CO₂ Saved", val: `${co2Saved.toFixed(1)} kg`, icon: "🌍", color: "bg-emerald-50/50 text-emerald-600" },
              { label: "GreenCoins", val: coins.toLocaleString(), icon: "🪙", color: "bg-amber-50/50 text-amber-600" },
              { label: "Trips", val: tripsCompleted.toString(), icon: "🚲", color: "bg-blue-50/50 text-blue-600" },
              { label: "Streak", val: `${streak} days`, icon: "🔥", color: "bg-orange-50/50 text-orange-600" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-white hover:bg-gray-50/80 rounded-2xl p-4 border border-green-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{s.label}</p>
                  <p className="font-extrabold text-gray-900 text-base mt-0.5">{s.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts + badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly CO2 */}
        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900">CO₂ Saved Per Month</p>
            <div className="flex items-center gap-1 bg-green-50 rounded-full px-2 py-1 text-xs font-bold text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              +23%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyStats} barSize={24}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #dcfce7", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [`${v} kg`, "CO₂ Saved"]}
              />
              <Bar dataKey="co2" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900">Earned Badges</p>
            <div className="flex items-center gap-1 bg-purple-50 rounded-full px-2 py-1">
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs font-bold text-purple-700">{earnedBadges.length} earned</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {earnedBadges.length === 0 ? (
              <p className="col-span-3 text-center py-6 text-sm text-gray-400">No badges earned yet. Unlock achievements to earn badges!</p>
            ) : (
              earnedBadges.map((badge) => (
                <div key={badge.name} className="flex flex-col items-center gap-1.5 bg-green-50/50 hover:bg-green-50 rounded-2xl p-3 border border-green-100/60 hover:border-green-200 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
                  <span className="text-2xl">{badge.emoji}</span>
                  <p className="text-xs font-bold text-gray-700 text-center">{badge.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Travel history */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <p className="font-bold text-gray-900">Recent Travel History</p>
        </div>
        {trips.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-400">No trips logged yet. Plan a route to get started!</p>
        ) : (
          trips.map((day, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${i < trips.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <div className="text-center bg-green-50 rounded-xl px-3 py-2 shrink-0 border border-green-100">
                <p className="text-xs font-bold text-green-700">{day.date}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{day.from} → {day.to}</p>
                <p className="text-xs text-gray-400">{day.mode} commute</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-green-600">{day.co2Saved} kg saved</p>
                <p className="text-xs text-yellow-600">+{day.coins} 🪙</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mode breakdown */}
      <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
        <p className="font-bold text-gray-900 mb-4">My Transport Mix</p>
        <div className="space-y-3">
          {[
            { mode: "🚇 Metro", pct: 42, color: "bg-blue-500" },
            { mode: "🚲 Bicycle", pct: 28, color: "bg-green-500" },
            { mode: "🚶 Walking", pct: 18, color: "bg-teal-500" },
            { mode: "🚌 Bus", pct: 8, color: "bg-yellow-500" },
            { mode: "🚗 Car/Cab", pct: 4, color: "bg-red-400" },
          ].map((m) => (
            <div key={m.mode}>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span className="font-semibold">{m.mode}</span>
                <span className="font-bold text-gray-700">{m.pct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className={`${m.color} rounded-full h-2 transition-all`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

