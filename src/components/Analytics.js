import React, { useEffect, useState } from "react";
import API from "../api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

export default function Analytics({ user }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const res = await API.get(`/analytics/${user.id}`);
      const formatted = Object.entries(res.data).map(([name, value]) => ({
        name,
        value,
      }));
      setData(formatted);
    }
    load();
  }, [user]);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6">
      <h2 className="text-xl font-bold mb-4">Expense Analytics</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No expenses yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
