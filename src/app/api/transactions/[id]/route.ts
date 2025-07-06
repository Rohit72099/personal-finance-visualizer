import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

// DELETE handler
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // get the [id] from the URL

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  await connectToDatabase();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}

// PUT handler
export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // get the [id] from the URL

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const body = await request.json();

  await connectToDatabase();
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
