"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import BudgetForm from "@/components/BudgetForm";
import BudgetChart from "@/components/BudgetChart";
import { useState } from "react";

export default function Home() {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const refresh = () => setRefreshIndex((prev) => prev + 1);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      <TransactionForm refresh={refresh} />
      <BudgetForm refresh={refresh} />
      <SummaryCards key={"summary-" + refreshIndex} />
      <TransactionList key={refreshIndex} refresh={refresh} />
      <CategoryPieChart key={"pie-" + refreshIndex} />
      <MonthlyChart key={"chart-" + refreshIndex} />
      <BudgetChart key={"budget-" + refreshIndex} />
    </main>
  );
}
