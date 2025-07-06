"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

type ChartData = { name: string; value: number };

export default function CategoryPieChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/transactions");
      const txns = await res.json();
      const grouped: { [key: string]: number } = {};
      txns.forEach((txn: { category: string; amount: number }) => {
        grouped[txn.category] = (grouped[txn.category] || 0) + txn.amount;
      });
      const chartData = Object.entries(grouped).map(([name, value]) => ({ name, value }));
      setData(chartData);
    };
    load();
  }, []);

  return (
    <div className="h-64 mt-6">
      <h2 className="font-semibold text-lg mb-2">Spending by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
