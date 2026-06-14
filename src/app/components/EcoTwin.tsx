import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", current: 28, sustainable: 8 },
  { month: "Feb", current: 22, sustainable: 6 },
  { month: "Mar", current: 31, sustainable: 7 },
  { month: "Apr", current: 18, sustainable: 5 },
  { month: "May", current: 24, sustainable: 6 },
  { month: "Jun", current: 14, sustainable: 4 },
];

const radarData = [
  { subject: "Transport", current: 60, sustainable: 90 },
  { subject: "Shopping", current: 55, sustainable: 85 },
  { subject: "Food", current: 70, sustainable: 80 },
  { subject: "Energy", current: 65, sustainable: 90 },
  { subject: "Waste", current: 50, sustainable: 85 },
];

const comparisons = [
  { label: "Monthly CO₂ Footprint", current: "127 kg", sustainable: "38 kg", saving: "89 kg less", icon: "🌍" },
  { label: "Transport Emissions", current: "84 kg", sustainable: "12 kg", saving: "85.7% reduction", icon: "🚗" },
  { label: "GreenCoins Earned", current: "1,200", sustainable: "4,800", saving: "4× more", icon: "🪙" },
  { label: "Money Spent Commuting", current: "₹3,200", sustainable: "₹640", saving: "₹2,560 saved", icon: "💰" },
];

export function EcoTwin() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Eco Twin AI 👥</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          See who you could be with sustainable choices
        </p>
      </div>

      {/* Twin comparison header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current You */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-md">
              😐
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-lg">Current You</p>
              <p className="text-xs text-gray-500">June 2026 · Delhi</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-extrabold text-red-500">127</p>
              <p className="text-xs text-gray-500">kg CO₂/month</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Cab/Car trips", val: "18/month", bad: true },
              { label: "Sustainability Score", val: "42/100", bad: true },
              { label: "GreenCoins", val: "1,200/month", bad: false },
              { label: "Eco Rank", val: "#847 in campus", bad: true },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.label}</span>
                <span className={`font-bold ${item.bad ? "text-red-500" : "text-gray-700"}`}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainable You */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            AI Projected
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-md">
              🌟
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-lg">Sustainable You</p>
              <p className="text-xs text-green-600 font-medium">Achievable in 30 days</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-extrabold text-green-600">38</p>
              <p className="text-xs text-gray-500">kg CO₂/month</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Cab/Car trips", val: "2/month", good: true },
              { label: "Sustainability Score", val: "91/100", good: true },
              { label: "GreenCoins", val: "4,800/month", good: true },
              { label: "Eco Rank", val: "#12 in campus", good: true },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-bold text-green-600">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact comparisons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {comparisons.map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-green-100 p-4">
            <div className="text-2xl mb-2">{c.icon}</div>
            <p className="text-xs text-gray-400 mb-1">{c.label}</p>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-red-400 line-through">{c.current}</span>
              <span className="text-sm">→</span>
              <span className="text-sm font-bold text-green-600">{c.sustainable}</span>
            </div>
            <p className="text-xs font-bold text-emerald-600 bg-green-50 rounded-full px-2 py-0.5 inline-block">{c.saving}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly CO2 bar chart */}
        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Monthly CO₂ Emissions (kg)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barGap={4}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #dcfce7", borderRadius: 12, fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="current" name="Current You" fill="#f87171" radius={[6, 6, 0, 0]} />
              <Bar dataKey="sustainable" name="Sustainable You" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Sustainability Dimensions</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
              <Radar name="Current You" dataKey="current" stroke="#f87171" fill="#f87171" fillOpacity={0.2} />
              <Radar name="Sustainable You" dataKey="sustainable" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action plan */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white">
        <p className="font-extrabold text-xl mb-2">Your 30-Day Transformation Plan 🚀</p>
        <p className="opacity-80 text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          3 changes that will get you 70% closer to your Sustainable Twin
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { step: "Week 1", action: "Replace 5 cab rides with metro", impact: "-30kg CO₂", coins: "+1,200 🪙" },
            { step: "Week 2", action: "Cycle to campus 3x per week", impact: "-18kg CO₂", coins: "+840 🪙" },
            { step: "Week 3–4", action: "Go zero-car for 14 days", impact: "-42kg CO₂", coins: "+2,800 🪙" },
          ].map((p) => (
            <div key={p.step} className="bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20">
              <p className="text-xs font-bold opacity-70 mb-1">{p.step}</p>
              <p className="font-bold mb-2">{p.action}</p>
              <p className="text-sm opacity-90">{p.impact}</p>
              <p className="text-sm font-bold text-yellow-300">{p.coins}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
