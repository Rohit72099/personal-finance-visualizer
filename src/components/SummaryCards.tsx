"use client";

import { useEffect, useState } from "react";

export default function SummaryCards() {
  const [summary, setSummary] = useState({ total: 0, recent: [], categoryMap: {} });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      const total = data.reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
      const recent = data.slice(0, 3);
      const categoryMap = {} as Record<string, number>;
      data.forEach((t: { category: string; amount: number }) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });
      setSummary({ total, recent, categoryMap });
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-blue-100 p-4 rounded">Total Spent: ₹{summary.total}</div>
      <div className="bg-green-100 p-4 rounded">
        <strong>Recent:</strong>
        <ul className="text-sm">
          {summary.recent.map((t: { _id: string; description: string; amount: number }) => (
            <li key={t._id}>{t.description} - ₹{t.amount}</li>
          ))}
        </ul>
      </div>
      <div className="bg-yellow-100 p-4 rounded">
        <strong>By Category:</strong>
        <ul className="text-sm">
          {Object.entries(summary.categoryMap).map(([cat, amt]) => (
            <li key={cat}>{cat}: ₹{amt as number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}