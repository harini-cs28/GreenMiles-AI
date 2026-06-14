import { useState } from "react";
import { Medal, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useApp } from "../context/AppContext";

const avatarColors = [
  "from-purple-400 to-violet-500",
  "from-blue-400 to-cyan-500",
  "from-pink-400 to-rose-500",
  "from-orange-400 to-amber-500",
  "from-teal-400 to-emerald-500",
  "from-green-400 to-emerald-600",
  "from-indigo-400 to-purple-500",
  "from-red-400 to-rose-500",
  "from-yellow-400 to-amber-500",
  "from-cyan-400 to-blue-500",
];

const departments = [
  { rank: 1, name: "Computer Science", members: 284, co2: 8420, coins: 248600 },
  { rank: 2, name: "Mechanical Engg", members: 210, co2: 7640, coins: 224800 },
  { rank: 3, name: "Civil Engg", members: 198, co2: 6820, coins: 201400 },
  { rank: 4, name: "Electronics", members: 176, co2: 5960, coins: 178200 },
  { rank: 5, name: "MBA", members: 142, co2: 5140, coins: 151600 },
];

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-2xl">🥇</span>;
  if (rank === 2) return <span className="text-2xl">🥈</span>;
  if (rank === 3) return <span className="text-2xl">🥉</span>;
  return <span className="text-sm font-bold text-gray-400">#{rank}</span>;
}

function ChangeIcon({ change }: { change: string }) {
  if (change === "up") return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
  if (change === "down") return <TrendingDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-gray-300" />;
}

export function Leaderboard() {
  const [tab, setTab] = useState<"students" | "departments">("students");
  const { coins, co2Saved, streak, user } = useApp();

  const currentUserName = user?.name || "Arjun Mehta";
  const getInitials = (n: string) => {
    return n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const students = [
    { rank: 1, name: "Priya Sharma", dept: "Computer Science", co2: 124.3, coins: 8420, streak: 32, avatar: "PS", change: "same", score: 96 },
    { rank: 2, name: "Rahul Verma", dept: "Mechanical Engg", co2: 118.7, coins: 7960, streak: 28, avatar: "RV", change: "up", score: 93 },
    { rank: 3, name: "Ananya Gupta", dept: "Chemical Engg", co2: 112.4, coins: 7340, streak: 21, avatar: "AG", change: "up", score: 90 },
    { rank: 4, name: "Kiran Reddy", dept: "Civil Engg", co2: 98.6, coins: 6820, streak: 18, avatar: "KR", change: "down", score: 87 },
    { rank: 5, name: "Divya Menon", dept: "Electronics", co2: 94.2, coins: 6410, streak: 25, avatar: "DM", change: "up", score: 85 },
    { rank: 6, name: currentUserName, dept: "MBA", co2: co2Saved, coins: coins, streak: streak, avatar: getInitials(currentUserName), change: "same", score: 82, isMe: true },
    { rank: 7, name: "Suresh Kumar", dept: "Physics", co2: 82.1, coins: 5480, streak: 12, avatar: "SK", change: "down", score: 79 },
    { rank: 8, name: "Meera Nair", dept: "Chemistry", co2: 78.9, coins: 5120, streak: 9, avatar: "MN", change: "up", score: 76 },
    { rank: 9, name: "Vikram Singh", dept: "Mathematics", co2: 74.3, coins: 4730, streak: 7, avatar: "VS", change: "down", score: 73 },
    { rank: 10, name: "Pooja Joshi", dept: "Biology", co2: 68.5, coins: 4290, streak: 11, avatar: "PJ", change: "up", score: 70 },
  ].sort((a, b) => b.co2 - a.co2).map((s, idx) => ({ ...s, rank: idx + 1 }));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Leaderboard 🏆</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Top eco-warriors ranked by CO₂ saved · June 2026
        </p>
      </div>

      {/* Top 3 podium */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 50% 0%, #facc15 0%, transparent 60%)" }}
        />
        <p className="text-white font-bold text-center mb-6 opacity-80">Top Performers This Month</p>
        <div className="flex items-end justify-center gap-4 relative">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm mb-2 border-2 border-white/30">
              RV
            </div>
            <p className="text-white text-xs font-bold">Rahul V.</p>
            <p className="text-green-200 text-xs">118.7 kg</p>
            <div className="mt-2 w-16 h-14 bg-white/20 backdrop-blur rounded-t-xl flex items-end justify-center pb-2">
              <span className="text-2xl">🥈</span>
            </div>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center -mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-white font-bold mb-2 border-2 border-yellow-300/50 shadow-xl">
              PS
            </div>
            <p className="text-white text-sm font-bold">Priya S.</p>
            <p className="text-yellow-200 text-xs">124.3 kg</p>
            <div className="mt-2 w-20 h-20 bg-white/20 backdrop-blur rounded-t-xl flex items-end justify-center pb-2">
              <span className="text-3xl">🥇</span>
            </div>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm mb-2 border-2 border-white/30">
              AG
            </div>
            <p className="text-white text-xs font-bold">Ananya G.</p>
            <p className="text-green-200 text-xs">112.4 kg</p>
            <div className="mt-2 w-16 h-10 bg-white/20 backdrop-blur rounded-t-xl flex items-end justify-center pb-2">
              <span className="text-2xl">🥉</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
        {(["students", "departments"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all
              ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {t === "students" ? "👤 Students" : "🏛️ Departments"}
          </button>
        ))}
      </div>

      {tab === "students" && (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          {students.map((s, i) => (
            <div
              key={s.rank}
              className={`flex items-center gap-3 px-5 py-4 transition-colors
                ${s.isMe ? "bg-green-50 border-l-4 border-green-500" : "hover:bg-gray-50"}
                ${i < students.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <div className="w-8 flex items-center justify-center shrink-0">
                <MedalIcon rank={s.rank} />
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {s.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                  {s.isMe && <span className="bg-green-100 text-green-700 text-xs font-bold px-1.5 py-0.5 rounded-full">You</span>}
                </div>
                <p className="text-xs text-gray-400">{s.dept} · 🔥 {s.streak}d streak</p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <p className="text-sm font-bold text-green-600">{s.co2} kg CO₂</p>
                <p className="text-xs text-yellow-600 font-semibold">{s.coins.toLocaleString()} 🪙</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <ChangeIcon change={s.change} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "departments" && (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          {departments.map((dept, i) => (
            <div
              key={dept.rank}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${i < departments.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <div className="w-8 flex items-center justify-center shrink-0">
                <MedalIcon rank={dept.rank} />
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center shrink-0`}>
                <span className="text-white text-sm font-bold">{dept.rank}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{dept.name}</p>
                <p className="text-xs text-gray-400">{dept.members} members</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-green-600">{dept.co2.toLocaleString()} kg CO₂</p>
                <p className="text-xs text-yellow-600 font-semibold">{dept.coins.toLocaleString()} 🪙 total</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
