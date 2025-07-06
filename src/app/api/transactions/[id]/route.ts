import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";


type TransactionUpdate = {
  amount?: number;
  description?: string;
  date?: string;
  category?: string;
};


export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = context.params;
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}


export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  await connectToDatabase();
  const body: TransactionUpdate = await req.json();
  const { id } = context.params;
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
