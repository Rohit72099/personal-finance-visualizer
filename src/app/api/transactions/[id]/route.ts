import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";

// DELETE
export async function DELETE(
  req: Request,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise;
  const { id } = params; // <-- use params directly, no await!
  await connectToDatabase();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}

// PUT
export async function PUT(
  req: Request,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise;
  const { id } = params; // <-- use params directly, no await!
  const body = await req.json();
  await connectToDatabase();
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
