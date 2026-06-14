import { useState } from "react";
import { Trophy, Clock, CheckCircle, Star } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Challenges() {
  const { challenges, achievements, claimChallengeReward } = useApp();
  const [tab, setTab] = useState<"weekly" | "achievements">("weekly");

  const activeCount = challenges.filter(c => c.progress < c.total).length;
  const completedCount = challenges.filter(c => c.progress >= c.total).length;
  const bonusCoinsAvailable = challenges
    .filter(c => c.progress < c.total)
    .reduce((acc, c) => acc + c.reward, 0);

  const earnedAchievementsCount = achievements.filter(a => a.earned).length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Challenges & Achievements 🏆</h1>
          <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Complete challenges to earn bonus GreenCoins and badges
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
          <Trophy className="w-4 h-4 text-yellow-600" />
          <span className="font-bold text-yellow-700 text-sm">{earnedAchievementsCount} earned</span>
        </div>
      </div>

      {/* Progress summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active Challenges", val: activeCount.toString(), icon: "⚡", color: "bg-blue-50 border-blue-100 text-blue-700" },
          { label: "Completed Ready to Claim", val: completedCount.toString(), icon: "✅", color: "bg-green-50 border-green-100 text-green-700" },
          { label: "Bonus Coins Available", val: bonusCoinsAvailable.toLocaleString(), icon: "🪙", color: "bg-yellow-50 border-yellow-100 text-yellow-700" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} border rounded-2xl p-4 text-center flex flex-col justify-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="font-extrabold text-xl">{s.val}</p>
            <p className="text-xs mt-0.5 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
        {(["weekly", "achievements"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all
              ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {t === "weekly" ? "⚡ Weekly Challenges" : "🏅 All Achievements"}
          </button>
        ))}
      </div>

      {tab === "weekly" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((ch) => (
            <div key={ch.title} className="bg-white rounded-3xl border border-green-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ch.color} flex items-center justify-center text-xl shadow-md shrink-0`}>
                    {ch.icon.split("")[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900">{ch.title}</p>
                      <div className="flex items-center gap-1 text-xs text-orange-600 font-semibold">
                        <Clock className="w-3 h-3" />
                        {ch.daysLeft}d left
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{ch.desc}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span className="font-semibold text-gray-600">{ch.progress}/{ch.total} completed</span>
                    <span>{Math.round((ch.progress / ch.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`bg-gradient-to-r ${ch.color} rounded-full h-2.5 transition-all`}
                      style={{ width: `${(ch.progress / ch.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Reward */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <span className="text-yellow-500 text-xs">🪙</span>
                    <span className="text-xs font-bold text-yellow-700">{ch.reward} coins</span>
                  </div>
                  {ch.badge && (
                    <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-purple-500" />
                      <span className="text-xs font-bold text-purple-700">{ch.badge}</span>
                    </div>
                  )}
                </div>
                {ch.progress >= ch.total ? (
                  <button
                    onClick={() => claimChallengeReward(ch.title)}
                    className="text-xs font-bold bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg transition-all shadow-md shadow-yellow-200"
                  >
                    Claim Reward!
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-gray-400">In Progress</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "achievements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.name}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all
                ${ach.earned
                  ? "bg-white border-green-100 hover:shadow-md"
                  : "bg-gray-50/50 border-gray-100 opacity-60"
                }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${ach.earned ? "bg-green-50" : "bg-gray-100"}`}>
                {ach.earned ? ach.emoji : "🔒"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{ach.name}</p>
                <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>{ach.desc}</p>
                {ach.earned && ach.date && (
                  <p className="text-xs text-green-600 font-semibold mt-0.5">Earned {ach.date}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-yellow-600">+{ach.coins} 🪙</p>
                {ach.earned && <CheckCircle className="w-4 h-4 text-green-500 ml-auto mt-1" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

