import React, { useState } from "react";
import Auth from "./components/Auth";   
import AddExpense from "./components/AddExpense";
import SetBudget from "./components/SetBudget";
import Analytics from "./components/Analytics";
import { LogOut, BarChart, CreditCard, Wallet, Home } from "lucide-react";

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("finmate_user");
    return raw ? JSON.parse(raw) : null;
  });

  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("finmate_user");
    setUser(null);
    setActiveTab("dashboard");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Auth
          setUser={(u) => {
            localStorage.setItem("finmate_user", JSON.stringify(u));
            setUser(u);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-8">FinMate</h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Home size={18} /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab("expenses")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition ${
                activeTab === "expenses"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <CreditCard size={18} /> Add Expense
            </button>
            <button
              onClick={() => setActiveTab("budgets")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition ${
                activeTab === "budgets"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Wallet size={18} /> Budgets
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition ${
                activeTab === "analytics"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <BarChart size={18} /> Analytics
            </button>
          </nav>
        </div>
        <div>
          <p className="mb-2 text-gray-500">Welcome, {user.name}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeTab === "dashboard" && (
          <h1 className="text-3xl font-bold">Welcome to your Dashboard 🎉</h1>
        )}
        {activeTab === "expenses" && <AddExpense user={user} />}
        {activeTab === "budgets" && <SetBudget user={user} />}
        {activeTab === "analytics" && <Analytics user={user} />}
      </main>
    </div>
  );
}

export default App;
