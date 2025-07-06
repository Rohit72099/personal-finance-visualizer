"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import { useState } from "react";

export default function Home() {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const refresh = () => setRefreshIndex((prev) => prev + 1);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      <TransactionForm refresh={refresh} />
      <TransactionList key={refreshIndex} refresh={refresh} />
      <MonthlyChart key={refreshIndex + "-chart"} />
    </main>
  );
}
