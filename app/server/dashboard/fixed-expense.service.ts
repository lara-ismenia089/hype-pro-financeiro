"use server";

import { getDb } from "@/database/mongo";
import { FixedExpense } from "@/lib/types";


export async function getFixedExpenses(): Promise<FixedExpense[]> {
	const db = await getDb();

	const expenses = await db
		.collection('expenses')
		.find()
		.toArray();

	return expenses.map((expense) => ({
		id: expense._id.toString(),

		notes: expense.observation?.trim() || null,
		category: expense.type?.trim() || null,
		description: expense.description?.trim() || null,

		amount: expense.amount,
		dueDate: expense.dueDate?.trim() || null,

		paymentMethod: expense.paymentMethod?.trim() || null,
	}));
}