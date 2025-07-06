

import { connectToDatabase } from "@/lib/db";
import { Budget } from "@/models/Budget";
import { NextResponse } from "next/server";

export async function DELETE() {
  await connectToDatabase();
  await Budget.deleteMany({});
  return NextResponse.json({ message: "Budgets reset" });
}
