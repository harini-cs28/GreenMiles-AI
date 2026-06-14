import {
  LayoutDashboard, Map, MessageSquare, GitCompare, Leaf, Wallet, Trophy, Users, User, BarChart3, LogOut, X, Menu,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "route", icon: Map, label: "Route Planner" },
  { id: "coach", icon: MessageSquare, label: "AI Carbon Coach" },
  { id: "ecotwin", icon: GitCompare, label: "Eco Twin AI" },
  { id: "buddy", icon: Leaf, label: "Green Buddy" },
  { id: "wallet", icon: Wallet, label: "GreenCoins Wallet" },
  { id: "challenges", icon: Trophy, label: "Challenges" },
  { id: "leaderboard", icon: BarChart3, label: "Leaderboard" },
  { id: "community", icon: Users, label: "Community Forest" },
  { id: "profile", icon: User, label: "Profile" },
];

interface SidebarProps {
  current: string;
  onNavigate: (page: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export function Sidebar({ current, onNavigate, open, setOpen }: SidebarProps) {
  const { coins, streak, buddyLevel, logout, user } = useApp();

  const getLevelRole = (lvl: number) => {
    if (lvl === 0) return "Seed Starter";
    if (lvl === 1) return "Eco Sprout";
    if (lvl === 2) return "Sapling Savior";
    if (lvl === 3) return "Forest Guardian";
    if (lvl === 4) return "Eco Champion";
    return "Green Legend";
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-white border-r border-green-100 flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-green-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-200">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-gray-900 leading-none">GreenMiles</p>
              <p className="text-xs text-green-600 font-semibold mt-0.5">AI Platform</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User pill */}
        <div className="mx-4 mt-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-2.5 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              {user?.name ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "AM"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm truncate">{user?.name || "Arjun Mehta"}</p>
              <p className="text-xs text-gray-500 truncate">Lvl {buddyLevel} · {getLevelRole(buddyLevel)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-yellow-600">{coins.toLocaleString()}</p>
              <p className="text-xs text-gray-400">coins</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all
                ${current === id
                  ? "bg-green-500 text-white shadow-md shadow-green-200"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {id === "wallet" && (
                <span className="ml-auto bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-green-50">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-2.5 mb-2 text-white">
            <p className="text-xs font-bold mb-0.5">🌱 Daily Streak: {streak} days</p>
            <div className="w-full bg-white/20 rounded-full h-1.5">
              <div className="bg-white rounded-full h-1.5 w-3/4" />
            </div>
            <p className="text-[10px] opacity-80 mt-1">6 days to next badge!</p>
          </div>
          <button
            onClick={() => { logout(); onNavigate("landing"); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden w-10 h-10 bg-white border border-green-200 rounded-xl flex items-center justify-center shadow-sm"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>
    </>
  );
}

