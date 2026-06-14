import { Users, Leaf, TrendingUp, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../context/AppContext";

const forestGrowth = [
  { month: "Jan", trees: 120 },
  { month: "Feb", trees: 280 },
  { month: "Mar", trees: 480 },
  { month: "Apr", trees: 720 },
  { month: "May", trees: 1100 },
  { month: "Jun", trees: 1847 },
];

const milestones = [
  { trees: 500, label: "First Grove", emoji: "🌿", reached: true },
  { trees: 1000, label: "Mini Forest", emoji: "🌲", reached: true },
  { trees: 1847, label: "Campus Forest", emoji: "🌳", reached: true },
  { trees: 2500, label: "Urban Jungle", emoji: "🏙️🌳", reached: false },
  { trees: 5000, label: "Carbon Neutral Campus", emoji: "♻️", reached: false },
];

const forestEmojis = ["🌱", "🌿", "🌲", "🌳", "🌴", "🌵"];

export function CommunityForest() {
  const { forestTrees, userTrees, co2Saved, user } = useApp();
  
  const currentUserName = user?.name || "Arjun Mehta";
  const getInitials = (n: string) => {
    return n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  // Large scale representation: user's co2Saved translates into real campus stats
  const co2Reduced = Math.round(92350 + co2Saved * 2);
  const totalUsers = 48000;

  // Dynamically update user's tree count in the contributors list
  const currentContributors = [
    { name: "Priya Sharma", trees: 48, avatar: "PS", color: "from-purple-400 to-violet-500" },
    { name: "Rahul Verma", trees: 42, avatar: "RV", color: "from-blue-400 to-cyan-500" },
    { name: "Ananya Gupta", trees: 38, avatar: "AG", color: "from-pink-400 to-rose-500" },
    { name: currentUserName, trees: Math.round(userTrees), avatar: getInitials(currentUserName), color: "from-green-400 to-emerald-600" },
    { name: "Kiran Reddy", trees: 29, avatar: "KR", color: "from-orange-400 to-amber-500" },
  ].sort((a, b) => b.trees - a.trees);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Community Forest 🌲</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Together, we're growing a virtual forest for real impact
        </p>
      </div>

      {/* Hero stats */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-3xl p-8 relative overflow-hidden text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #facc15 0%, transparent 50%), radial-gradient(circle at 70% 80%, #22c55e 0%, transparent 40%)" }}
        />
        <div className="relative text-center mb-8">
          <div className="text-6xl mb-3 leading-none">🌲🌳🌲🌳🌲</div>
          <p className="text-6xl font-extrabold mb-1">{forestTrees.toLocaleString()}</p>
          <p className="text-xl font-semibold opacity-80">Virtual Trees Planted</p>
          <p className="text-sm opacity-60 mt-1">By {totalUsers.toLocaleString()} GreenMiles users worldwide</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "CO₂ Reduced", val: `${(co2Reduced / 1000).toFixed(1)}t`, icon: <Globe className="w-4 h-4" /> },
            { label: "Active Users", val: "48K+", icon: <Users className="w-4 h-4" /> },
            { label: "This Month", val: "747", icon: <TrendingUp className="w-4 h-4" /> },
          ].map((s) => (
            <div key={s.label} className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center border border-white/20">
              <div className="flex justify-center mb-1 opacity-70">{s.icon}</div>
              <p className="font-extrabold text-xl">{s.val}</p>
              <p className="text-xs opacity-70 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual forest visualization */}
      <div className="bg-gradient-to-b from-sky-100 to-green-100 rounded-3xl border border-green-200 p-6 relative overflow-hidden" style={{ minHeight: 220 }}>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-300/50 to-transparent rounded-b-3xl" />
        <p className="font-bold text-gray-700 mb-4 relative z-10">Your Campus Forest</p>
        <div className="flex flex-wrap gap-2 justify-center items-end pb-4 relative z-10">
          {Array.from({ length: Math.min(Math.round(userTrees), 80) }).map((_, i) => (
            <span
              key={i}
              className="text-xl animate-bounce-slow"
              style={{
                fontSize: `${1.2 + (i % 3) * 0.3}rem`,
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            >
              {forestEmojis[i % forestEmojis.length]}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 right-4 bg-white/80 backdrop-blur rounded-xl px-3 py-1.5 text-xs font-bold text-green-700 border border-green-200">
          You've contributed {userTrees.toFixed(1)} trees 🌳
        </div>
      </div>

      {/* Growth chart + contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Forest Growth Over Time</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={forestGrowth}>
              <defs>
                <linearGradient id="forestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #dcfce7", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [v.toLocaleString(), "Trees"]}
              />
              <Area type="monotone" dataKey="trees" stroke="#22c55e" strokeWidth={2.5} fill="url(#forestGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Top Contributors</p>
          <div className="space-y-3">
            {currentContributors.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-4">{i + 1}</span>
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-green-500 rounded-full h-1.5"
                      style={{ width: `${(c.trees / currentContributors[0].trees) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600 shrink-0">{c.trees}🌳</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
        <p className="font-bold text-gray-900 mb-4">Community Milestones</p>
        <div className="space-y-3">
          {milestones.map((m) => {
            const isMilestoneReached = forestTrees >= m.trees;
            return (
              <div key={m.label} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${isMilestoneReached ? "bg-green-100" : "bg-gray-100"}`}>
                  {isMilestoneReached ? m.emoji.split("")[0] : "🔒"}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className={`text-sm font-semibold ${isMilestoneReached ? "text-gray-900" : "text-gray-400"}`}>{m.label}</p>
                    <p className="text-xs text-gray-400">{m.trees.toLocaleString()} trees</p>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`rounded-full h-2 transition-all ${isMilestoneReached ? "bg-green-500" : "bg-gray-250"}`}
                      style={{ width: `${Math.min((forestTrees / m.trees) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                {isMilestoneReached && <span className="text-green-500 text-lg shrink-0">✅</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

