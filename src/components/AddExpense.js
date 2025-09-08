import React, { useState } from "react";
import API from "../api";
import { CreditCard } from "lucide-react";

export default function AddExpense({ user }) {
  const [form, setForm] = useState({ amount: "", category: "", description: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expenses", {
        ...form,
        userId: user.id,
        amount: parseFloat(form.amount),
      });
      alert("Expense added successfully!");
      setForm({ amount: "", category: "", description: "" });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CreditCard className="w-6 h-6 text-rose-600" /> Add Expense
      </h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
        />
        <input
          required
          placeholder="Category (Food, Travel, etc.)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
        />
        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
