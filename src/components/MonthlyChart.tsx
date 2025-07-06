"use client";

import { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

export default function MonthlyChart() {
  type Transaction = {
    date: string;
    amount: number;
    // add other fields if needed
  };

  const [data, setData] = useState<{ month: string; amount: number }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("/api/transactions");
      const txns: Transaction[] = await res.json();

      const grouped: { [key: string]: number } = {};
      txns.forEach((txn: Transaction) => {
        const month = new Date(txn.date).toLocaleString("default", { month: "short", year: "numeric" });
        grouped[month] = (grouped[month] || 0) + txn.amount;
      });

      const result = Object.entries(grouped).map(([month, amount]) => ({ month, amount }));
      setData(result);
    };

    loadData();
  }, []);

  return (
    <div className="h-64 mt-6">
      <h2 className="font-semibold text-lg mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" name="₹ Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}