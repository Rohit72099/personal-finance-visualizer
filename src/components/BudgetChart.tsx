"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Transaction = {
  amount: number;
  category: string;
};

type Budget = {
  amount: number;
  category: string;
};

type ChartData = {
  category: string;
  budget: number;
  spent: number;
};

export default function BudgetChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [totals, setTotals] = useState({ totalSpent: 0, totalBudget: 0 });

  useEffect(() => {
    const load = async () => {
      const txnsRes = await fetch("/api/transactions");
      const budgetsRes = await fetch("/api/budgets");
      const txns: Transaction[] = await txnsRes.json();
      const budgets: Budget[] = await budgetsRes.json();

      const spending: { [key: string]: number } = {};
      txns.forEach((t) => {
        if (t.category) {
          spending[t.category] = (spending[t.category] || 0) + t.amount;
        }
      });

      const chartData: ChartData[] = budgets.map((b) => ({
        category: b.category,
        budget: b.amount,
        spent: spending[b.category] || 0,
      }));

      const totalSpent = chartData.reduce((sum, d) => sum + d.spent, 0);
      const totalBudget = chartData.reduce((sum, d) => sum + d.budget, 0);

      setData(chartData);
      setTotals({ totalSpent, totalBudget });
    };
    load();
  }, []);

  const overspending = data.some((d) => d.spent > d.budget);

  return (
    <div className="h-auto mt-6">
      <h2 className="font-semibold text-lg mb-2">Budget vs Actual</h2>
            <button
        onClick={async () => {
            const confirmed = confirm("Are you sure you want to reset all budgets?");
            if (!confirmed) return;

            const res = await fetch("/api/budgets/reset", {
            method: "DELETE",
            });

            if (res.ok) {
            alert("Budgets reset successfully.");
            window.location.reload(); 
            } else {
            alert("Failed to reset budgets.");
            }
        }}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
        Reset Budgets
        </button>

      <div className="bg-gray-100 p-4 rounded mb-4">
        
        <strong>Total Budget:</strong> ₹{totals.totalBudget} | <strong>Total Spent:</strong> ₹{totals.totalSpent}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="spent" name="Spent">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.spent > entry.budget ? "#ff4d4f" : "#82ca9d"}
                cursor="pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {overspending && (
        <div className="text-red-600 font-semibold mt-2">
          Warning: You have exceeded your budget in one or more categories.
        </div>
      )}
    </div>
  );
}
