import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = params;
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const body = await req.json();
  const { id } = params;
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
