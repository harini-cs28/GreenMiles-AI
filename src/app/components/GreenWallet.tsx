import { useState } from "react";
import { TrendingUp, TrendingDown, Gift, Award, CheckCircle, Copy, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import confetti from "canvas-confetti";

const redeemOptions = [
  { title: "Metro Day Pass", cost: 200, value: "1-Day Unlimited Metro travel", icon: "🚇", popular: false },
  { title: "Coffee Discount", cost: 150, value: "20% off at partnered campus cafés", icon: "☕", popular: true },
  { title: "Uber Green Credit", cost: 500, value: "₹100 credit on eco-friendly Uber rides", icon: "🚗", popular: false },
  { title: "Plant a Real Tree", cost: 1000, value: "We plant a physical tree in your name!", icon: "🌳", popular: false },
  { title: "Cycle Rent Coupon", cost: 300, value: "3 free hours of SmartBike rental", icon: "🚲", popular: true },
  { title: "Eco Store Voucher", cost: 800, value: "₹200 off sustainable products", icon: "🛍️", popular: false },
];

export function GreenWallet() {
  const { coins, transactions, spendCoins, achievements } = useApp();
  const [tab, setTab] = useState<"transactions" | "redeem" | "badges">("transactions");
  
  // Modal state for coupon code
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponItemName, setCouponItemName] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Totals calculations based on transactions
  const earnedTotal = transactions
    .filter(t => t.type === "earn")
    .reduce((acc, t) => acc + t.amount, 0) + 2847; // Adjusting for initial baseline offset
  const spendTotal = Math.abs(
    transactions.filter(t => t.type === "spend").reduce((acc, t) => acc + t.amount, 0)
  );

  const handleRedeem = (opt: typeof redeemOptions[0]) => {
    const success = spendCoins(opt.cost, opt.title, opt.icon);
    if (success) {
      const code = `GM-${opt.title.toUpperCase().replace(/\s+/g, "-")}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
      setCouponCode(code);
      setCouponItemName(opt.title);
      setCopied(false);

      // Confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">GreenCoins Wallet 🪙</h1>
        <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Your eco rewards and redemptions
        </p>
      </div>

      {/* Wallet card */}
      <div className="bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 rounded-3xl p-6 text-white shadow-xl shadow-yellow-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-x-10 -translate-y-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-x-4 translate-y-4" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm opacity-80 font-semibold">Total Balance</p>
              <p className="text-5xl font-extrabold">{coins.toLocaleString()}</p>
              <p className="text-sm opacity-80 mt-1">GreenCoins</p>
            </div>
            <div className="text-6xl opacity-90">🪙</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Earned Total", val: (earnedTotal + 2847).toLocaleString() }, // balance offset mapping
              { label: "Redeemed", val: (spendTotal + 11353).toLocaleString() },
              { label: "Current Balance", val: coins.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 backdrop-blur rounded-xl p-3">
                <p className="text-xs opacity-80 mb-0.5">{s.label}</p>
                <p className="font-extrabold truncate">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
        {(["transactions", "redeem", "badges"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all
              ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {t === "transactions" ? "💳 Transactions" : t === "redeem" ? "🎁 Redeem" : "🏅 Badges"}
          </button>
        ))}
      </div>

      {tab === "transactions" && (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          {transactions.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">No transactions yet. Complete eco trips to earn!</p>
          ) : (
            transactions.map((tx, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors ${i < transactions.length - 1 ? "border-b border-gray-50" : ""}`}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{tx.desc}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <div className={`flex items-center gap-1 font-bold text-sm shrink-0 ${tx.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                  {tx.amount > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {tx.amount > 0 ? "+" : ""}{tx.amount} 🪙
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "redeem" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {redeemOptions.map((opt) => (
            <div
              key={opt.title}
              className="bg-white rounded-2xl border border-green-100 p-5 hover:shadow-lg hover:shadow-green-50 transition-all relative flex flex-col justify-between"
            >
              {opt.popular && (
                <span className="absolute -top-2 right-4 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
                  Popular
                </span>
              )}
              <div>
                <div className="text-3xl mb-3">{opt.icon}</div>
                <p className="font-bold text-gray-900 mb-1">{opt.title}</p>
                <p className="text-xs text-gray-500 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.value}</p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">🪙</span>
                  <span className="font-extrabold text-gray-900">{opt.cost}</span>
                </div>
                <button
                  onClick={() => handleRedeem(opt)}
                  disabled={opt.cost > coins}
                  className={`text-sm font-bold px-4 py-2 rounded-xl transition-all
                    ${opt.cost <= coins
                      ? "bg-green-500 hover:bg-green-600 text-white shadow-md shadow-green-200 hover:-translate-y-0.5"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {opt.cost <= coins ? "Redeem" : "Need more"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "badges" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((badge) => (
            <div
              key={badge.name}
              className={`rounded-2xl border p-5 text-center transition-all
                ${badge.earned
                  ? "bg-white border-green-200 shadow-sm"
                  : "bg-gray-50 border-gray-100 opacity-60"
                }`}
            >
              <div className={`text-4xl mb-3 ${!badge.earned ? "grayscale" : ""}`}>{badge.emoji}</div>
              <p className="font-bold text-gray-900 text-sm">{badge.name}</p>
              <p className="text-xs text-gray-500 mt-1">{badge.desc}</p>
              {badge.earned ? (
                <span className="inline-flex items-center gap-1 mt-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  <Award className="w-3 h-3" /> Earned {badge.date ? `· ${badge.date}` : ""}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 mt-2 bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
                  🔒 Locked (+{badge.coins} 🪙)
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Coupon Modal dialog overlay */}
      {couponCode && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-green-100 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setCouponCode(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                🎁
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-gray-900">Redemption Successful!</h3>
                <p className="text-xs text-gray-500 mt-1">You have claimed the {couponItemName}</p>
              </div>

              {/* Coupon Box */}
              <div className="bg-green-50/50 border-2 border-dashed border-green-200 rounded-2xl p-4 mt-2">
                <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Your Discount Code</p>
                <div className="flex items-center justify-between bg-white rounded-xl border border-green-100 p-2.5">
                  <code className="text-sm font-extrabold text-gray-800 select-all font-mono">{couponCode}</code>
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 hover:bg-green-50 text-green-600 rounded-lg transition-colors ml-2"
                    title="Copy Code"
                  >
                    {copied ? (
                      <span className="text-xs text-green-600 font-bold">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-2xs text-gray-400">Copy this code and show it at the partner outlet or enter it during checkout to redeem your reward.</p>

              <button
                onClick={() => setCouponCode(null)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-green-200"
              >
                Awesome, Got It!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

