import { useState } from "react";
import { Leaf, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AuthProps {
  mode: "login" | "signup";
  onNavigate: (page: string) => void;
}

export function AuthPage({ mode, onNavigate }: AuthProps) {
  const { login, signup } = useApp();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isLogin = mode === "login";

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-green-800 relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #facc15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #22c55e 0%, transparent 40%)`,
          }}
        />
        <div className="relative">
          <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 text-white">
            <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl">GreenMiles AI</span>
          </button>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
            <span className="text-yellow-300 text-sm font-semibold">🌱 48,000+ eco-warriors</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Travel Green.<br />Earn Rewards.<br />
            <span className="text-yellow-300">Change the World.</span>
          </h2>
          <p className="text-green-100 text-lg leading-relaxed mb-8">
            Join thousands of students tracking their carbon footprint and earning GreenCoins for eco-friendly commutes.
          </p>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "2.4M+", label: "kg CO₂ Saved", icon: "🌍" },
              { val: "156K+", label: "Green Trips", icon: "🚲" },
              { val: "₹12L+", label: "Rewards Earned", icon: "🪙" },
              { val: "14", label: "Active Cities", icon: "🏙️" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className="text-white font-extrabold text-lg">{s.val}</p>
                <p className="text-green-200 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-green-200 text-sm">
          © 2024 GreenMiles AI — Building a sustainable future
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-gray-900">GreenMiles AI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {isLogin ? "Welcome back! 👋" : "Join the movement 🌱"}
            </h1>
            <p className="text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {isLogin
                ? "Sign in to continue your eco journey"
                : "Create your free account and start earning GreenCoins"}
            </p>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>{provider === "Google" ? "🔍" : "🍎"}</span>
                {provider}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isLogin) {
                login(form.email, form.name);
              } else {
                signup(form.name, form.email);
              }
              onNavigate("dashboard");
            }}
            className="space-y-4"
          >
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Arjun Mehta"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@university.edu"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                {isLogin && (
                  <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" className="mt-0.5 accent-green-500 rounded" required />
                <p className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  I agree to the{" "}
                  <a href="#" className="text-green-600 font-medium hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-green-600 font-medium hover:underline">Privacy Policy</a>
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
            >
              {isLogin ? "Sign in to GreenMiles" : "Create Free Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {isLogin ? "New to GreenMiles? " : "Already have an account? "}
            <button
              onClick={() => onNavigate(isLogin ? "signup" : "login")}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </p>

          {!isLogin && (
            <div className="mt-6 bg-green-50 rounded-2xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">🪙</span>
                <p className="text-sm font-bold text-gray-800">Welcome bonus!</p>
              </div>
              <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sign up today and get <strong className="text-green-700">500 GreenCoins</strong> to kick-start your eco journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
