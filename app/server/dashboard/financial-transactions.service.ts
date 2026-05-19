"use server";

import { getDb } from "@/database/mongo";
import { FinancialTransaction } from "@/lib/types";


function parseLocalDate(dateValue: Date | string) {
	const date = new Date(dateValue);

	return new Date(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate()
	);
}

export async function getFinancialTransactions(): Promise<FinancialTransaction[]> {
	const db = await getDb();
	
	const transactions = await db
		.collection("transactions")
		.find()
		.toArray();

	return transactions.map((transaction) => ({
		id: transaction._id.toString(),

		bankName: transaction.bank,

		transactionDate: parseLocalDate(transaction.date),
		transactionType: transaction.type === "credito" ? "credit" : "debit",
		transactionTypeId: transaction.typeId,

		amount: transaction.amount,

		historyDescription: transaction.history,
		description: transaction.description,

		customerName: transaction.customer,
		customerId: transaction.customerId,

		accountId: transaction.accountId,
	}));
}