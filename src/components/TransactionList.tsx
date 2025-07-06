"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


type Transaction = {
  _id: string;
  amount: number;
  description: string;
  date: string;
};

export default function TransactionList({ refresh }: { refresh: () => void }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ amount: "", description: "", date: "" });

  const fetchData = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    refresh();
  };

  const startEdit = (t: Transaction) => {
    setEditingId(t._id);
    setEditForm({
      amount: t.amount.toString(),
      description: t.description,
      date: new Date(t.date).toISOString().split("T")[0],
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ amount: "", description: "", date: "" });
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`/api/transactions/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({
        amount: parseFloat(editForm.amount),
        description: editForm.description,
        date: editForm.date,
      }),
    });
    cancelEdit();
    refresh();
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="space-y-3 mt-6">
      <h2 className="font-semibold text-lg">Transactions</h2>
      {transactions.map((t: Transaction) =>
        editingId === t._id ? (
          <form
            key={t._id}
            onSubmit={handleEditSubmit}
            className="flex flex-col md:flex-row items-center gap-2 border p-3 rounded"
          >
            <Input
              type="number"
              value={editForm.amount}
              onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
              required
            />
            <Input
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              required
            />
            <Input
              type="date"
              value={editForm.date}
              onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
              required
            />
            <Button type="submit" className="bg-green-600">Save</Button>
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          </form>
        ) : (
          <div key={t._id} className="flex justify-between border p-2 rounded items-center">
            <div>
              ₹{t.amount} - {t.description}
              <br />
              <small>{t.date.slice(0, 10)}</small>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => startEdit(t)} variant="secondary">
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(t._id)}>
                Delete
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
