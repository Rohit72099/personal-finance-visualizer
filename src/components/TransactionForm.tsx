"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function TransactionForm({ refresh }: { refresh: () => void }) {
  const [form, setForm] = useState({ amount: "", description: "", date: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({
        amount: parseFloat(form.amount),
        description: form.description,
        date: form.date,
      }),
    });
    setForm({ amount: "", description: "", date: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Amount</Label>
        <Input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}