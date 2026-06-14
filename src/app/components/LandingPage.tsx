import { useState } from "react";
import { Leaf, Zap, Trophy, Users, TrendingUp, Star, ChevronRight, Play, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { value: "2.4M+", label: "kg CO₂ Saved" },
  { value: "48K+", label: "Active Users" },
  { value: "156K+", label: "Green Trips" },
  { value: "₹12L+", label: "Rewards Earned" },
];

const features = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Real-Time Carbon Tracking",
    desc: "Track CO₂ savings on every trip. Compare your impact across car, bus, metro, bicycle, and walking.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI Carbon Coach",
    desc: "Get personalized sustainability insights and smart route recommendations powered by AI.",
    color: "from-yellow-400 to-amber-500",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "GreenCoins Rewards",
    desc: "Earn GreenCoins for every eco-friendly choice. Redeem for real rewards and discounts.",
    color: "from-purple-400 to-violet-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Forest",
    desc: "Join thousands of users growing a virtual forest together. Every trip plants a virtual tree.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Eco Twin AI",
    desc: "See your sustainable alter ego. Compare current you vs. sustainable you with visual analytics.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Weekly Challenges",
    desc: "Compete in weekly eco challenges, unlock achievements, and climb the green leaderboard.",
    color: "from-orange-400 to-red-500",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Engineering Student, IIT Delhi",
    text: "GreenMiles helped me save 45kg of CO₂ last month just by switching to metro. The AI coach is incredible!",
    avatar: "PS",
    coins: 2400,
  },
  {
    name: "Arjun Mehta",
    role: "MBA Student, IIM Bangalore",
    text: "The gamification is addictive in the best way. I now compete with my friends on the leaderboard every week.",
    avatar: "AM",
    coins: 3100,
  },
  {
    name: "Kavya Reddy",
    role: "Design Student, NID",
    text: "Watching my Green Buddy grow from a seed to a tree because of my eco choices is so motivating!",
    avatar: "KR",
    coins: 1870,
  },
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>
              GreenMiles <span className="text-green-500">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it Works", "Leaderboard", "Community"].map((item) => (
              <a key={item} href="#" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("login")}
              className="text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate("signup")}
              className="text-sm font-semibold bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Style block for animations */}
        <style>{`
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 25px 5px rgba(34, 197, 94, 0.45); transform: scale(1) translate(-50%, -50%); }
            50% { box-shadow: 0 0 45px 15px rgba(34, 197, 94, 0.7); transform: scale(1.04) translate(-50%, -50%); }
          }
          @keyframes float-node {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes flow-dash {
            to {
              stroke-dashoffset: -40;
            }
          }
        `}</style>
        
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/50 to-white" />
        <div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-0 left-10 w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #facc15 0%, transparent 70%)", filter: "blur(50px)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column (CTA redesign) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-6 w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 text-sm font-semibold">AI-Powered Sustainability Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Travel Green.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                Earn Rewards.
              </span>{" "}
              Build a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                Sustainable
              </span>{" "}
              Future.
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Track your carbon savings, earn GreenCoins for eco-friendly commutes, and grow a virtual forest with your campus community.
            </p>
            
            {/* Primary CTA with increased whitespace */}
            <div className="my-10 flex justify-center lg:justify-start">
              <button
                onClick={() => onNavigate("signup")}
                className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-green-200 hover:shadow-green-300 hover:-translate-y-1 text-lg cursor-pointer"
              >
                Start Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {["#22c55e", "#16a34a", "#facc15", "#60a5fa"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                    {["P", "A", "K", "R"][i]}
                  </div>
                ))}
              </div>
              <span><strong className="text-gray-800">48,000+</strong> eco-warriors already joined</span>
            </div>
          </div>

          {/* Right column (Futuristic Circular Ecosystem) */}
          <div className="lg:col-span-5 relative w-full aspect-square max-w-[480px] mx-auto lg:max-w-none flex items-center justify-center h-[480px]">
            {/* Curved Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400">
              {/* Paths generated dynamically for curvature */}
              {[
                { angle: -90, color: "#22C55E" }, // Coach
                { angle: -30, color: "#FACC15" }, // Coins
                { angle: 30, color: "#22C55E" },  // Buddy
                { angle: 90, color: "#FACC15" },  // Leaderboard
                { angle: 150, color: "#15803D" }, // Forest
                { angle: 210, color: "#22C55E" }, // Savings
              ].map((node, idx) => {
                const rad = (node.angle * Math.PI) / 180;
                // Coordinates relative to SVG viewBox 400x400 (center is 200, 200)
                const tx = 200 + Math.round(135 * Math.cos(rad));
                const ty = 200 + Math.round(135 * Math.sin(rad));
                
                // Control points to draw nice curves
                const midX = (200 + tx) / 2;
                const midY = (200 + ty) / 2;
                const angle = Math.atan2(ty - 200, tx - 200);
                const curveAngle = angle - Math.PI / 4;
                const curveDist = 30;
                const cx = Math.round(midX + Math.cos(curveAngle) * curveDist);
                const cy = Math.round(midY + Math.sin(curveAngle) * curveDist);
                const d = `M 200 200 Q ${cx} ${cy} ${tx} ${ty}`;

                return (
                  <g key={idx}>
                    {/* Background glow path */}
                    <path
                      d={d}
                      stroke={node.color}
                      strokeWidth="3"
                      fill="none"
                      opacity="0.15"
                      className="blur-[2px]"
                    />
                    {/* Flowing animated pulse line */}
                    <path
                      d={d}
                      stroke={node.color}
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="6 8"
                      className="animate-[flow-dash_2.5s_linear_infinite]"
                      opacity="0.75"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Glowing Core in center */}
            <div 
              className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 flex flex-col items-center justify-center border-4 border-white/80 shadow-2xl z-20 cursor-pointer animate-[pulse-glow_4s_ease-in-out_infinite]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <span className="text-4xl filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]">🌍</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-white text-center mt-2.5 drop-shadow-sm select-none">
                GreenMiles AI
              </span>
            </div>

            {/* Floating Glassmorphism Nodes */}
            {[
              { label: "AI Carbon Coach", icon: "🤖", angle: -90 },
              { label: "GreenCoins Rewards", icon: "🪙", angle: -30 },
              { label: "Green Buddy", icon: "🌱", angle: 30 },
              { label: "Campus Leaderboard", icon: "🏆", angle: 90 },
              { label: "Community Forest", icon: "🌳", angle: 150 },
              { label: "Carbon Savings", icon: "♻️", angle: 210 },
            ].map((node, idx) => {
              const rad = (node.angle * Math.PI) / 180;
              // R = 33.75% coordinate offsets relative to container size (symmetrical to SVG viewBox)
              const R_pct = 33.75;
              const x = (R_pct * Math.cos(rad)).toFixed(2);
              const y = (R_pct * Math.sin(rad)).toFixed(2);

              return (
                <div
                  key={idx}
                  className="absolute z-30"
                  style={{
                    left: `${50 + parseFloat(x)}%`,
                    top: `${50 + parseFloat(y)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="flex items-center gap-2.5 bg-white/75 backdrop-blur-md border border-white/60 px-4 py-2.5 rounded-2xl shadow-lg shadow-green-100/10 hover:shadow-green-200/40 hover:bg-white/90 hover:scale-105 transition-all select-none whitespace-nowrap cursor-pointer"
                    style={{
                      animation: "float-node 4s ease-in-out infinite",
                      animationDelay: `${idx * 0.5}s`,
                    }}
                  >
                    <span className="text-xl filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]">{node.icon}</span>
                    <span className="text-xs font-bold text-gray-800 tracking-tight">{node.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold text-white mb-1">{s.value}</p>
              <p className="text-green-100 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Everything you need to go green
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              A complete sustainability ecosystem designed for students and eco-conscious commuters.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-xl hover:shadow-green-50 hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Join thousands of eco-warriors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-3xl shadow-sm border border-green-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <span className="text-yellow-500 text-xs">🪙</span>
                    <span className="text-xs font-bold text-yellow-600">{t.coins.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🌍</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to make every trip count?
          </h2>
          <p className="text-gray-500 mb-8 text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Join GreenMiles AI and start earning rewards for your eco-friendly commutes today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm"
            />
            <button
              onClick={() => onNavigate("signup")}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-green-200"
            >
              Join Free <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-gray-700">GreenMiles AI</span>
          </div>
          <p className="text-gray-400 text-sm">© 2024 GreenMiles AI. Building a sustainable future, one trip at a time.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-green-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-green-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-green-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
