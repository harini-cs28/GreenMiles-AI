import { useState, useRef, useEffect } from "react";
import { Send, Leaf, Zap, TrendingUp, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";

type Msg = { role: "user" | "bot"; text: string; time: string };

const suggestions = [
  "What's my best route to college?",
  "How can I improve my sustainability score?",
  "How many trees have I saved this month?",
  "What are this week's challenges?",
];

const insights = [
  { icon: "🌍", title: "Carbon Saved Today", value: "3.1 kg", sub: "vs. 1.8 kg avg", positive: true },
  { icon: "🚲", title: "Best Mode Today", value: "Bicycle", sub: "Most eco-friendly", positive: true },
  { icon: "📈", title: "Weekly Trend", value: "+23%", sub: "Better than last week", positive: true },
  { icon: "🎯", title: "Daily Goal", value: "72%", sub: "2.1 of 2.9 kg target", positive: false },
];

export function AICoach() {
  const { coins, co2Saved, challenges, userTrees, user } = useApp();
  const firstName = user?.name ? user.name.split(" ")[0] : "Arjun";

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      role: "bot",
      text: `Hi ${firstName}! 👋 I'm your AI Carbon Coach. I've analyzed your travel patterns from the past 30 days and I'm ready to help you make greener choices. What would you like to know?`,
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Dynamic Bot Reply Generator using live state
  const getBotReply = (msg: string): string => {
    const lower = msg.toLowerCase();
    
    if (lower.includes("route") || lower.includes("college") || lower.includes("campus")) {
      return `For your Home Sector 14 → IIT Campus route, I highly recommend cycling 🚲. It saves 1.4kg CO₂, earns 140 GreenCoins, and takes just 22 minutes. You'll also complete your active cycle challenge! Would you like to map it?`;
    }

    if (lower.includes("score") || lower.includes("sustainability")) {
      const remainingChallengesCount = challenges.filter(c => c.progress < c.total).length;
      return `Your current sustainability score is 82/100 (Excellent)! To reach 90+, try completing the remaining ${remainingChallengesCount} weekly challenges. Commuting by Metro instead of Car 3 times this week will also give you a significant +15 pt boost!`;
    }

    if (lower.includes("tree") || lower.includes("forest") || lower.includes("co2")) {
      return `This month, you've personally saved ${co2Saved.toFixed(1)}kg of CO₂! That is equivalent to planting ${userTrees.toFixed(1)} virtual trees 🌳. Your efforts have prevented emissions equivalent to driving a petrol car 185km less! Keep up the amazing work!`;
    }

    if (lower.includes("challenge") || lower.includes("weekly")) {
      const activeLines = challenges.map(c => 
        `• ${c.icon} ${c.title}: (${c.progress}/${c.total} completed, rewards ${c.reward} 🪙)`
      ).join("\n");
      
      return `Here are your active weekly challenges:\n\n${activeLines}\n\nComplete them to claim your bonus coins and unlock new badges!`;
    }

    return `Great question! Based on your live state, you currently have ${coins.toLocaleString()} GreenCoins and have saved ${co2Saved.toFixed(1)}kg of CO₂. Swapping a cab for the metro tomorrow is your best option to save carbon and unlock the next badge! 🌱`;
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", text, time: now }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: getBotReply(text), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1200 + Math.random() * 800);
  };

  const resetChat = () => {
    setMessages([
      {
        role: "bot",
        text: `Chat history cleared. I'm ready for new questions! What would you like to know, ${firstName}? 🌱`,
        time: "now",
      }
    ]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">AI Carbon Coach 🤖</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Personalized sustainability guidance powered by AI
        </p>
      </div>

      {/* Insights strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {insights.map((ins) => (
          <div key={ins.title} className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm">
            <div className="text-2xl mb-2">{ins.icon}</div>
            <p className="font-extrabold text-gray-900">{ins.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{ins.title}</p>
            <p className={`text-xs font-semibold mt-1 ${ins.positive ? "text-green-600" : "text-yellow-600"}`}>
              {ins.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chat */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-green-100 shadow-sm flex flex-col" style={{ height: 520 }}>
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b border-green-50">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">
              🤖
            </div>
            <div>
              <p className="font-bold text-gray-900">GreenMiles AI Coach</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-xs text-green-600 font-medium">Online · Powered by AI</p>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="ml-auto text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-50"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-auto shrink-0 text-sm">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                    ${msg.role === "user"
                      ? "bg-green-500 text-white rounded-br-md"
                      : "bg-gray-50 text-gray-800 rounded-bl-md border border-gray-100"
                    }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {msg.text}
                  <p className={`text-xs mt-1 ${msg.role === "user" ? "text-green-200" : "text-gray-400"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-2 shrink-0 text-sm">
                  🤖
                </div>
                <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="shrink-0 text-xs bg-green-50 hover:bg-green-100 text-green-700 font-medium px-3 py-1.5 rounded-full transition-colors border border-green-100 whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 pt-0">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask your AI coach..."
                className="flex-1 px-4 py-2.5 bg-green-50 border border-green-100 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI recommendations panel */}
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-5 text-white">
            <p className="font-bold mb-1">Today's Tip 🌱</p>
            <p className="text-sm opacity-90 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Swap your afternoon cab to campus for a bicycle ride. You'll save 1.4kg CO₂ and earn 140 GreenCoins!
            </p>
            <div className="mt-3 flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-semibold">Potential: -1.4kg CO₂</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-green-100 p-4">
            <p className="font-bold text-gray-900 mb-3">Weekly Targets</p>
            <div className="space-y-3">
              {[
                { label: "CO₂ Saved", current: co2Saved, target: 60, unit: "kg" },
                { label: "Eco Trips", current: challenges.filter(c => c.progress >= c.total).length, target: 4, unit: "" },
                { label: "GreenCoins Balance", current: coins, target: 5000, unit: "" },
              ].map((t) => (
                <div key={t.label}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="font-semibold">{t.label}</span>
                    <span className="font-bold text-gray-700">{t.current.toFixed(0)}{t.unit} / {t.target}{t.unit}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 rounded-full h-2 transition-all"
                      style={{ width: `${Math.min((t.current / t.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <p className="font-bold text-gray-900 text-sm">Quick Win</p>
            </div>
            <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Water your plant or complete a short walking trip tomorrow to claim your daily bonus coins!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

