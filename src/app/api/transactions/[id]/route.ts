import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, context: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = await context.params; // Await params
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  const { id } = await context.params; // Await params
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}