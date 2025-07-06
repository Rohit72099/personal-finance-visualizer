import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";

// DELETE /api/transactions/[id]
export async function DELETE(
  req: Request,
  context: any // ✅ Avoids build errors
) {
  const { id } = context.params;
  await connectToDatabase();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}

// PUT /api/transactions/[id]
export async function PUT(
  req: Request,
  context: any // ✅ Avoids build errors
) {
  const { id } = context.params;
  const body = await req.json();

  await connectToDatabase();
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json(updated);
}
