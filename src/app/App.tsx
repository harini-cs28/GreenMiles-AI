import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPages";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { RoutePlanner } from "./components/RoutePlanner";
import { AICoach } from "./components/AICoach";
import { EcoTwin } from "./components/EcoTwin";
import { GreenBuddy } from "./components/GreenBuddy";
import { GreenWallet } from "./components/GreenWallet";
import { Challenges } from "./components/Challenges";
import { Leaderboard } from "./components/Leaderboard";
import { CommunityForest } from "./components/CommunityForest";
import { CarbonReceipt } from "./components/CarbonReceipt";
import { Profile } from "./components/Profile";
import { AppContextProvider } from "./context/AppContext";
import { Toaster } from "sonner";

type Page =
  | "landing"
  | "login"
  | "signup"
  | "dashboard"
  | "route"
  | "coach"
  | "ecotwin"
  | "buddy"
  | "wallet"
  | "challenges"
  | "leaderboard"
  | "receipt"
  | "community"
  | "profile";

const appPages: Page[] = [
  "dashboard", "route", "coach", "ecotwin", "buddy",
  "wallet", "challenges", "leaderboard", "community", "receipt", "profile",
];

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (p: string) => setPage(p as Page);

  const isApp = appPages.includes(page);

  return (
    <AppContextProvider>
      <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Public pages */}
        {page === "landing" && <LandingPage onNavigate={navigate} />}
        {page === "login" && <AuthPage mode="login" onNavigate={navigate} />}
        {page === "signup" && <AuthPage mode="signup" onNavigate={navigate} />}

        {/* App pages with sidebar */}
        {isApp && (
          <div className="flex min-h-screen">
            <Sidebar current={page} onNavigate={navigate} open={sidebarOpen} setOpen={setSidebarOpen} />
            <main className="flex-1 lg:ml-64 overflow-y-auto bg-gray-50/50 min-h-screen">
              {page === "dashboard" && <Dashboard onNavigate={navigate} />}
              {page === "route" && <RoutePlanner />}
              {page === "coach" && <AICoach />}
              {page === "ecotwin" && <EcoTwin />}
              {page === "buddy" && <GreenBuddy />}
              {page === "wallet" && <GreenWallet />}
              {page === "challenges" && <Challenges />}
              {page === "leaderboard" && <Leaderboard />}
              {page === "community" && <CommunityForest />}
              {page === "receipt" && <CarbonReceipt />}
              {page === "profile" && <Profile />}
            </main>
          </div>
        )}
      </div>
      <Toaster position="top-right" richColors />
    </AppContextProvider>
  );
}

