"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const CATEGORIES = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];

export default function BudgetForm({ refresh }: { refresh: () => void }) {
  const [form, setForm] = useState({ category: "Food", amount: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify({
        category: form.category,
        amount: parseFloat(form.amount),
      }),
    });
    setForm({ category: "Food", amount: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-lg font-bold">Set Category Budget</h2>
      <div>
        <Label>Category</Label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Budget Amount</Label>
        <Input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Set Budget</Button>
    </form>
  );
}
