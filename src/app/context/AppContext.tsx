import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Trip {
  from: string;
  to: string;
  mode: string;
  modeEmoji: string;
  distance: string;
  time: string;
  co2Saved: number;
  co2Baseline: number;
  coins: number;
  date: string;
}

export interface Transaction {
  type: "earn" | "spend";
  desc: string;
  amount: number;
  date: string;
  icon: string;
}

export interface Challenge {
  title: string;
  desc: string;
  icon: string;
  progress: number;
  total: number;
  reward: number;
  badge: string;
  daysLeft: number;
  color: string;
}

export interface Achievement {
  name: string;
  emoji: string;
  desc: string;
  earned: boolean;
  date: string | null;
  coins: number;
}

export interface UserInfo {
  name: string;
  email: string;
}

interface AppContextType {
  user: UserInfo | null;
  coins: number;
  co2Saved: number;
  tripsCompleted: number;
  streak: number;
  buddyWaterCount: number;
  buddyLevel: number;
  forestTrees: number;
  userTrees: number;
  trips: Trip[];
  transactions: Transaction[];
  challenges: Challenge[];
  achievements: Achievement[];
  addTrip: (trip: Omit<Trip, "date">) => void;
  addCoins: (amount: number, reason: string, icon: string) => void;
  spendCoins: (amount: number, reason: string, icon: string) => boolean;
  waterBuddy: () => void;
  claimChallengeReward: (title: string) => void;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default states for Arjun Mehta demo user
const arjunDefaultState = {
  coins: 2847,
  co2Saved: 47.2,
  tripsCompleted: 143,
  streak: 14,
  buddyWaterCount: 156,
  buddyLevel: 4,
  forestTrees: 1847,
  userTrees: 31,
  trips: [
    { from: "Home", to: "IIT Campus", mode: "Metro", modeEmoji: "🚇", co2Saved: 1.8, co2Baseline: 2.1, coins: 180, time: "28 min", date: "2h ago" },
    { from: "Campus", to: "Market", mode: "Bicycle", modeEmoji: "🚲", co2Saved: 2.4, co2Baseline: 2.4, coins: 240, time: "15 min", date: "Yesterday" },
    { from: "Hostel", to: "Library", mode: "Walk", modeEmoji: "🚶", co2Saved: 0.9, co2Baseline: 0.9, coins: 90, time: "10 min", date: "Yesterday" },
    { from: "Home", to: "College", mode: "Bus", modeEmoji: "🚌", co2Saved: 1.2, co2Baseline: 1.7, coins: 120, time: "35 min", date: "2 days ago" },
  ],
  transactions: [
    { type: "earn", desc: "Metro ride – Campus to Market", amount: 110, date: "Today, 9:30 AM", icon: "🚇" },
    { type: "earn", desc: "Cycling streak bonus", amount: 200, date: "Today, 8:00 AM", icon: "🔥" },
    { type: "spend", desc: "Redeemed: Café Discount (20%)", amount: -150, date: "Yesterday", icon: "☕" },
    { type: "earn", desc: "Walking to library", amount: 90, date: "Yesterday", icon: "🚶" },
    { type: "earn", desc: "Weekly challenge completed", amount: 500, date: "Jun 12", icon: "🏆" },
    { type: "spend", desc: "Redeemed: Metro pass (1-day)", amount: -200, date: "Jun 11", icon: "🎟️" },
    { type: "earn", desc: "Bus trip – Home to IIT", amount: 120, date: "Jun 11", icon: "🚌" },
    { type: "earn", desc: "Referral bonus – Priya joined", amount: 300, date: "Jun 10", icon: "👥" },
  ],
  challenges: [
    { title: "Cycle 5 Days", desc: "Ride a bicycle to your destination for 5 days this week", icon: "🚲", progress: 3, total: 5, reward: 500, badge: "Cycle Hero", daysLeft: 3, color: "from-green-400 to-emerald-500" },
    { title: "Metro Maestro", desc: "Complete 10 metro trips this week", icon: "🚇", progress: 8, total: 10, reward: 400, badge: "Metro Master", daysLeft: 3, color: "from-blue-400 to-indigo-500" },
    { title: "Zero Car Week", desc: "Go 7 days without taking a car or cab", icon: "🚫🚗", progress: 4, total: 7, reward: 1000, badge: "Car-Free Champion", daysLeft: 3, color: "from-purple-400 to-violet-500" },
    { title: "Green Commute Streak", desc: "Use only eco-friendly transport for 5 consecutive days", icon: "🌱", progress: 3, total: 5, reward: 600, badge: "Streak Master", daysLeft: 3, color: "from-teal-400 to-cyan-500" },
  ],
  achievements: [
    { name: "First Green Trip", emoji: "🌱", desc: "Completed first eco-friendly trip", earned: true, date: "May 3, 2026", coins: 100 },
    { name: "Week Warrior", emoji: "⚔️", desc: "7-day eco travel streak", earned: true, date: "May 15, 2026", coins: 500 },
    { name: "Carbon Saver", emoji: "🌍", desc: "Saved 10kg of CO₂", earned: true, date: "May 22, 2026", coins: 300 },
    { name: "Metro Champion", emoji: "🚇", desc: "25 metro trips completed", earned: true, date: "Jun 1, 2026", coins: 400 },
    { name: "Cycle King", emoji: "👑", desc: "30 bicycle trips", earned: false, date: null, coins: 600 },
    { name: "Forest Builder", emoji: "🌲", desc: "Contributed 50 trees to community forest", earned: false, date: null, coins: 1000 },
    { name: "Legend", emoji: "🏆", desc: "Reach 10,000 GreenCoins", earned: false, date: null, coins: 2000 },
    { name: "Eco Influencer", emoji: "📣", desc: "Refer 10 friends", earned: false, date: null, coins: 1500 },
  ],
};

// Clean default states for newly registered users
const freshDefaultState = {
  coins: 500,
  co2Saved: 0,
  tripsCompleted: 0,
  streak: 1,
  buddyWaterCount: 0,
  buddyLevel: 0,
  forestTrees: 1847,
  userTrees: 0,
  trips: [],
  transactions: [
    { type: "earn", desc: "Welcome Bonus", amount: 500, date: "Just now", icon: "🪙" }
  ],
  challenges: [
    { title: "Cycle 5 Days", desc: "Ride a bicycle to your destination for 5 days this week", icon: "🚲", progress: 0, total: 5, reward: 500, badge: "Cycle Hero", daysLeft: 3, color: "from-green-400 to-emerald-500" },
    { title: "Metro Maestro", desc: "Complete 10 metro trips this week", icon: "🚇", progress: 0, total: 10, reward: 400, badge: "Metro Master", daysLeft: 3, color: "from-blue-400 to-indigo-500" },
    { title: "Zero Car Week", desc: "Go 7 days without taking a car or cab", icon: "🚫🚗", progress: 0, total: 7, reward: 1000, badge: "Car-Free Champion", daysLeft: 3, color: "from-purple-400 to-violet-500" },
    { title: "Green Commute Streak", desc: "Use only eco-friendly transport for 5 consecutive days", icon: "🌱", progress: 0, total: 5, reward: 600, badge: "Streak Master", daysLeft: 3, color: "from-teal-400 to-cyan-500" },
  ],
  achievements: [
    { name: "First Green Trip", emoji: "🌱", desc: "Completed first eco-friendly trip", earned: false, date: null, coins: 100 },
    { name: "Week Warrior", emoji: "⚔️", desc: "7-day eco travel streak", earned: false, date: null, coins: 500 },
    { name: "Carbon Saver", emoji: "🌍", desc: "Saved 10kg of CO₂", earned: false, date: null, coins: 300 },
    { name: "Metro Champion", emoji: "🚇", desc: "25 metro trips completed", earned: false, date: null, coins: 400 },
    { name: "Cycle King", emoji: "👑", desc: "30 bicycle trips", earned: false, date: null, coins: 600 },
    { name: "Forest Builder", emoji: "🌲", desc: "Contributed 50 trees to community forest", earned: false, date: null, coins: 1000 },
    { name: "Legend", emoji: "🏆", desc: "Reach 10,000 GreenCoins", earned: false, date: null, coins: 2000 },
    { name: "Eco Influencer", emoji: "📣", desc: "Refer 10 friends", earned: false, date: null, coins: 1500 },
  ],
};

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  // Authentication user state
  const [user, setUser] = useState<UserInfo | null>(() => {
    const stored = localStorage.getItem("greenmiles_current_user");
    return stored ? JSON.parse(stored) : null;
  });

  // Lazy loaders from localStorage relative to current user
  const loadUserValue = (key: string, defaultValue: any) => {
    const storedUser = localStorage.getItem("greenmiles_current_user");
    if (!storedUser) return defaultValue;
    try {
      const parsedUser = JSON.parse(storedUser);
      const userState = localStorage.getItem(`greenmiles_state_${parsedUser.email}`);
      if (!userState) {
        if (parsedUser.email === "arjun@example.com") {
          return (arjunDefaultState as any)[key] ?? defaultValue;
        }
        return (freshDefaultState as any)[key] ?? defaultValue;
      }
      const parsedState = JSON.parse(userState);
      return parsedState[key] !== undefined ? parsedState[key] : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  const [coins, setCoins] = useState(() => loadUserValue("coins", 2847));
  const [co2Saved, setCo2Saved] = useState(() => loadUserValue("co2Saved", 47.2));
  const [tripsCompleted, setTripsCompleted] = useState(() => loadUserValue("tripsCompleted", 143));
  const [streak, setStreak] = useState(() => loadUserValue("streak", 14));
  const [buddyWaterCount, setBuddyWaterCount] = useState(() => loadUserValue("buddyWaterCount", 156));
  const [buddyLevel, setBuddyLevel] = useState(() => loadUserValue("buddyLevel", 4));
  const [forestTrees, setForestTrees] = useState(() => loadUserValue("forestTrees", 1847));
  const [userTrees, setUserTrees] = useState(() => loadUserValue("userTrees", 31));

  const [trips, setTrips] = useState<Trip[]>(() => loadUserValue("trips", arjunDefaultState.trips));
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadUserValue("transactions", arjunDefaultState.transactions));
  const [challenges, setChallenges] = useState<Challenge[]>(() => loadUserValue("challenges", arjunDefaultState.challenges));
  const [achievements, setAchievements] = useState<Achievement[]>(() => loadUserValue("achievements", arjunDefaultState.achievements));

  // Sync state data whenever values change
  useEffect(() => {
    if (user) {
      const stateToSave = {
        coins,
        co2Saved,
        tripsCompleted,
        streak,
        buddyWaterCount,
        buddyLevel,
        forestTrees,
        userTrees,
        trips,
        transactions,
        challenges,
        achievements,
      };
      localStorage.setItem(`greenmiles_state_${user.email}`, JSON.stringify(stateToSave));
    }
  }, [
    user,
    coins,
    co2Saved,
    tripsCompleted,
    streak,
    buddyWaterCount,
    buddyLevel,
    forestTrees,
    userTrees,
    trips,
    transactions,
    challenges,
    achievements,
  ]);

  // Handle auto-achievements unlocking when values change
  useEffect(() => {
    if (!user) return;
    // Carbon Saver Check
    if (co2Saved >= 50 && !achievements.find(a => a.name === "Carbon Saver")?.earned) {
      unlockAchievement("Carbon Saver");
    }
    // Legend Check
    const totalEarned = coins + transactions.filter(t => t.type === "spend").reduce((acc, t) => acc + Math.abs(t.amount), 0);
    if (totalEarned >= 10000 && !achievements.find(a => a.name === "Legend")?.earned) {
      unlockAchievement("Legend");
    }
  }, [co2Saved, coins, user]);

  const loadStateForUser = (userInfo: UserInfo | null) => {
    if (!userInfo) {
      setCoins(2847);
      setCo2Saved(47.2);
      setTripsCompleted(143);
      setStreak(14);
      setBuddyWaterCount(156);
      setBuddyLevel(4);
      setForestTrees(1847);
      setUserTrees(31);
      setTrips(arjunDefaultState.trips);
      setTransactions(arjunDefaultState.transactions);
      setChallenges(arjunDefaultState.challenges);
      setAchievements(arjunDefaultState.achievements);
      return;
    }

    const savedStateStr = localStorage.getItem(`greenmiles_state_${userInfo.email}`);
    let state = freshDefaultState;
    if (userInfo.email === "arjun@example.com") {
      state = arjunDefaultState;
    }
    if (savedStateStr) {
      try {
        state = JSON.parse(savedStateStr);
      } catch (e) {
        // use default
      }
    }

    setCoins(state.coins);
    setCo2Saved(state.co2Saved);
    setTripsCompleted(state.tripsCompleted);
    setStreak(state.streak);
    setBuddyWaterCount(state.buddyWaterCount);
    setBuddyLevel(state.buddyLevel);
    setForestTrees(state.forestTrees);
    setUserTrees(state.userTrees);
    setTrips(state.trips);
    setTransactions(state.transactions);
    setChallenges(state.challenges);
    setAchievements(state.achievements);
  };

  const login = (email: string, name?: string) => {
    let resolvedName = name || "";
    if (!resolvedName) {
      if (email === "arjun@example.com") {
        resolvedName = "Arjun Mehta";
      } else {
        const part = email.split("@")[0];
        resolvedName = part.charAt(0).toUpperCase() + part.slice(1);
      }
    }

    const userInfo = { name: resolvedName, email };
    localStorage.setItem("greenmiles_current_user", JSON.stringify(userInfo));
    setUser(userInfo);
    loadStateForUser(userInfo);
    toast.success(`Welcome back, ${resolvedName}!`);
  };

  const signup = (name: string, email: string) => {
    const userInfo = { name, email };
    localStorage.setItem("greenmiles_current_user", JSON.stringify(userInfo));
    localStorage.setItem(`greenmiles_state_${email}`, JSON.stringify(freshDefaultState));
    setUser(userInfo);
    loadStateForUser(userInfo);
    toast.success(`Welcome to GreenMiles, ${name}!`);
  };

  const logout = () => {
    localStorage.removeItem("greenmiles_current_user");
    setUser(null);
    loadStateForUser(null);
    toast.success("Signed out successfully.");
  };

  const unlockAchievement = (name: string) => {
    setAchievements(prev =>
      prev.map(ach => {
        if (ach.name === name && !ach.earned) {
          const nowStr = new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
          toast.success(`🎉 Achievement Unlocked: ${ach.name}! (+${ach.coins} 🪙)`);
          
          setTimeout(() => {
            setCoins(c => c + ach.coins);
            setTransactions(txs => [
              { type: "earn", desc: `Unlocked Achievement: ${ach.name}`, amount: ach.coins, date: "Just now", icon: ach.emoji },
              ...txs
            ]);
          }, 100);

          return { ...ach, earned: true, date: nowStr };
        }
        return ach;
      })
    );
  };

  const addTrip = (tripDetails: Omit<Trip, "date">) => {
    const timeStr = "Just now";
    const newTrip: Trip = { ...tripDetails, date: timeStr };

    setTrips(prev => [newTrip, ...prev]);
    setCoins(prev => prev + tripDetails.coins);
    setCo2Saved(prev => parseFloat((prev + tripDetails.co2Saved).toFixed(1)));
    setTripsCompleted(prev => prev + 1);
    
    const earnedTrees = parseFloat((tripDetails.co2Saved * 0.5).toFixed(2));
    setUserTrees(prev => parseFloat((prev + earnedTrees).toFixed(1)));
    setForestTrees(prev => Math.round(prev + earnedTrees));

    setTransactions(prev => [
      {
        type: "earn",
        desc: `${tripDetails.mode} ride – ${tripDetails.from.split(",")[0]} to ${tripDetails.to.split(",")[0]}`,
        amount: tripDetails.coins,
        date: "Just now",
        icon: tripDetails.modeEmoji,
      },
      ...prev,
    ]);

    toast.success(`🌿 Commute logged! Saved ${tripDetails.co2Saved}kg CO₂ and earned ${tripDetails.coins} 🪙!`);

    setChallenges(prev =>
      prev.map(ch => {
        let addedProgress = 0;
        if (ch.title === "Cycle 5 Days" && tripDetails.mode === "Bicycle") {
          addedProgress = 1;
        } else if (ch.title === "Metro Maestro" && tripDetails.mode === "Metro") {
          addedProgress = 1;
        } else if (ch.title === "Zero Car Week" && tripDetails.mode !== "Car/Cab") {
          addedProgress = 1;
        } else if (ch.title === "Green Commute Streak" && tripDetails.mode !== "Car/Cab") {
          addedProgress = 1;
        }

        if (addedProgress > 0) {
          const nextProgress = Math.min(ch.progress + addedProgress, ch.total);
          if (nextProgress === ch.total && ch.progress < ch.total) {
            toast.success(`🏆 Challenge Completed: ${ch.title}! Claim your ${ch.reward} coins reward.`);
          }
          return { ...ch, progress: nextProgress };
        }
        return ch;
      })
    );
  };

  const addCoins = (amount: number, reason: string, icon: string) => {
    setCoins(prev => prev + amount);
    setTransactions(prev => [
      { type: "earn", desc: reason, amount, date: "Just now", icon },
      ...prev,
    ]);
    toast.success(`🪙 Added ${amount} GreenCoins for ${reason}!`);
  };

  const spendCoins = (amount: number, reason: string, icon: string) => {
    if (coins < amount) {
      toast.error("Not enough GreenCoins!");
      return false;
    }
    setCoins(prev => prev - amount);
    setTransactions(prev => [
      { type: "spend", desc: `Redeemed: ${reason}`, amount: -amount, date: "Just now", icon },
      ...prev,
    ]);
    return true;
  };

  const waterBuddy = () => {
    setBuddyWaterCount(prev => {
      const nextCount = prev + 1;
      if (nextCount % 3 === 0) {
        addCoins(10, "Watered Green Buddy 3x", "💧");
      }
      return nextCount;
    });

    const nextLevelCheck = () => {
      if (coins >= 12000) return 5;
      if (coins >= 6000) return 4;
      if (coins >= 3000) return 3;
      if (coins >= 1500) return 2;
      if (coins >= 500) return 1;
      return 0;
    };

    const calculatedLevel = nextLevelCheck();
    if (calculatedLevel > buddyLevel) {
      setBuddyLevel(calculatedLevel);
      toast.success(`🎉 Your Green Buddy evolved to Level ${calculatedLevel}!`);
    }
  };

  const claimChallengeReward = (title: string) => {
    const challenge = challenges.find(c => c.title === title);
    if (challenge && challenge.progress >= challenge.total) {
      addCoins(challenge.reward, `Challenge Reward: ${challenge.title}`, "🏆");
      if (challenge.badge && !achievements.find(a => a.name === challenge.badge)?.earned) {
        unlockAchievement(challenge.badge);
      }
      setChallenges(prev =>
        prev.map(c => (c.title === title ? { ...c, progress: 0 } : c))
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        coins,
        co2Saved,
        tripsCompleted,
        streak,
        buddyWaterCount,
        buddyLevel,
        forestTrees,
        userTrees,
        trips,
        transactions,
        challenges,
        achievements,
        addTrip,
        addCoins,
        spendCoins,
        waterBuddy,
        claimChallengeReward,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
}
