import { useState } from "react";
import { useApp } from "../context/AppContext";

const levels = [
  { level: 0, name: "Seed", emoji: "🌱", threshold: 0, maxCoins: 500, color: "from-yellow-300 to-amber-400", desc: "You've just planted your eco journey!" },
  { level: 1, name: "Sprout", emoji: "🌿", threshold: 500, maxCoins: 1500, color: "from-green-300 to-emerald-400", desc: "You're growing! Keep up the eco habits." },
  { level: 2, name: "Sapling", emoji: "🪴", threshold: 1500, maxCoins: 3000, color: "from-green-400 to-emerald-500", desc: "You've established strong eco roots!" },
  { level: 3, name: "Young Tree", emoji: "🌲", threshold: 3000, maxCoins: 6000, color: "from-emerald-400 to-green-600", desc: "You're growing tall and strong!" },
  { level: 4, name: "Tree", emoji: "🌳", threshold: 6000, maxCoins: 12000, color: "from-green-500 to-emerald-700", desc: "A proud tree, shading your community!" },
  { level: 5, name: "Forest", emoji: "🌲🌳🌲", threshold: 12000, maxCoins: 999999, color: "from-green-600 to-emerald-800", desc: "You've grown a whole forest! Legend." },
];

const buddyActions = [
  { icon: "🚇", label: "Take Metro", reward: "+80 coins", impact: "Buddy grows 2cm" },
  { icon: "🚲", label: "Ride Bicycle", reward: "+140 coins", impact: "Buddy grows 5cm" },
  { icon: "🚶", label: "Walk", reward: "+90 coins", impact: "Buddy grows 3cm" },
  { icon: "🌱", label: "Log Meal", reward: "+20 coins", impact: "Buddy blooms" },
];

export function GreenBuddy() {
  const { coins, co2Saved, buddyWaterCount, buddyLevel, waterBuddy } = useApp();
  const [watered, setWatered] = useState(false);

  const level = levels[buddyLevel] || levels[0];
  const nextLevel = levels[Math.min(buddyLevel + 1, levels.length - 1)];

  const progressPct = buddyLevel < levels.length - 1
    ? Math.max(0, Math.min(100, ((coins - level.threshold) / (nextLevel.threshold - level.threshold)) * 100))
    : 100;

  const milestones = [
    { coins: 500, emoji: "🌿", label: "Sprout", reached: coins >= 500 },
    { coins: 1500, emoji: "🪴", label: "Sapling", reached: coins >= 1500 },
    { coins: 3000, emoji: "🌲", label: "Young Tree", reached: coins >= 3000 },
    { coins: 6000, emoji: "🌳", label: "Tree", reached: coins >= 6000 },
    { coins: 12000, emoji: "🌲🌳🌲", label: "Forest", reached: coins >= 12000 },
  ];

  const handleWatering = () => {
    setWatered(true);
    waterBuddy();
    setTimeout(() => setWatered(false), 1500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Green Buddy 🌱</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Your virtual plant grows with every eco-friendly choice
        </p>
      </div>

      {/* Main buddy display */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-white rounded-3xl border border-green-100 p-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #22c55e 0%, transparent 70%)" }}
        />

        <div className="relative">
          {/* Buddy emoji */}
          <div
            className={`text-8xl mb-4 inline-block transition-transform duration-300 ${watered ? "scale-110 rotate-6" : "scale-100"}`}
            style={{ filter: "drop-shadow(0 8px 20px rgba(34,197,94,0.3))" }}
          >
            {level.emoji}
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{level.name}</h2>
          <p className="text-green-600 font-semibold mb-2">Level {buddyLevel} · {coins.toLocaleString()} GreenCoins</p>
          <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {level.desc}
          </p>

          {/* Progress to next level */}
          {buddyLevel < levels.length - 1 ? (
            <div className="max-w-sm mx-auto">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span className="font-semibold text-gray-600">{level.name}</span>
                <span>{nextLevel.threshold - coins} coins to {nextLevel.name} {nextLevel.emoji}</span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{progressPct.toFixed(0)}% to next level</p>
            </div>
          ) : (
            <div className="max-w-sm mx-auto bg-green-100 text-green-800 rounded-xl p-3 text-xs font-bold">
              🌟 Max Evolution Reached! You have grown a Forest!
            </div>
          )}

          {/* Water button */}
          <button
            onClick={handleWatering}
            className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95"
          >
            {watered ? "🌊 Watered!" : "💧 Water Your Buddy"}
          </button>
        </div>
      </div>

      {/* Evolution timeline */}
      <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
        <p className="font-bold text-gray-900 mb-5">Evolution Journey</p>
        <div className="relative">
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-green-100" />
          <div className="flex justify-between relative">
            {milestones.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 z-10 relative transition-all
                    ${m.reached
                      ? "bg-green-500 border-green-500 shadow-md shadow-green-200"
                      : "bg-white border-gray-200"
                    }`}
                >
                  {m.emoji.split("")[0]}
                </div>
                <p className="text-xs font-semibold text-gray-600">{m.label}</p>
                <p className="text-xs text-gray-400">{(m.coins / 1000).toFixed(1)}K 🪙</p>
                {m.reached && (
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth actions */}
      <div>
        <p className="font-bold text-gray-900 mb-3">Grow Your Buddy Faster</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {buddyActions.map((action) => (
            <div
              key={action.label}
              className="bg-white rounded-2xl border border-green-100 p-4 hover:shadow-md hover:border-green-300 transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
              <p className="font-bold text-gray-900 text-sm">{action.label}</p>
              <p className="text-xs text-green-600 font-semibold mt-1">{action.reward}</p>
              <p className="text-xs text-gray-400 mt-0.5">{action.impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buddy stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Age", value: "42 days", icon: "📅", sub: "Born on May 3, 2026" },
          { label: "Total CO₂ Absorbed", value: `${co2Saved.toFixed(1)} kg`, icon: "🌍", sub: `Equal to ${(co2Saved * 0.05).toFixed(1)} trees` },
          { label: "Times Watered", value: buddyWaterCount.toString(), icon: "💧", sub: "Gives coins every 3 waterings" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-green-100 p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className="font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
