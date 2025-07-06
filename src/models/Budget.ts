import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Budget =
  mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);