import { NextResponse } from "next/server";
import { Budget } from "@/models/Budget";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const budget = await Budget.create(body);
  return NextResponse.json(budget);
}