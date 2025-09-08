import React, { useState } from "react";
import API from "../api";
import { Wallet } from "lucide-react";

export default function SetBudget({ user }) {
  const [form, setForm] = useState({ category: "", limitAmount: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/budgets", {
        userId: user.id,
        category: form.category,
        limitAmount: parseFloat(form.limitAmount),
      });
      alert("Budget set successfully!");
      setForm({ category: "", limitAmount: "" });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Wallet className="w-6 h-6 text-emerald-600" /> Set Budget
      </h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
        />
        <input
          required
          type="number"
          placeholder="Limit Amount"
          value={form.limitAmount}
          onChange={(e) => setForm({ ...form, limitAmount: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
}
