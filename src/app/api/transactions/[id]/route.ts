import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";

// PUT
export async function PUT(
  req: Request,
  context: { params: any } 
) {
  await connectToDatabase();
  const body = await req.json();
  const { id } = context.params;
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(
  req: Request,
  context: { params: any } 
) {
  await connectToDatabase();
  const { id } = context.params;
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
