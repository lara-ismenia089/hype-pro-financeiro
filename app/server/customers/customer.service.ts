"use server";

import { ObjectId } from "mongodb";

import { getDb } from "@/database/mongo";
import {
	Customer,
	CustomerAddress,
} from "@/lib/types";


type CustomerDocument = {
	_id: ObjectId;

	cnpj: string;

	companyName: string;
	fantasyName: string;

	email: string;
	phone: string;

	contractStatus: string;

	dueDate: Date;
	signedContract: Date | null;
	signedDue: Date | null;

	monthlyFee: number;
	terminationClause: string;

	address: CustomerAddress;
};

function mapCustomerDocument(
	customer: CustomerDocument,
): Customer {
	return {
		id: customer._id.toString(),

		cnpj: customer.cnpj,

		legalName: customer.companyName,
		tradeName: customer.fantasyName,

		email: customer.email,
		phone: customer.phone,

		contractStatus: customer.contractStatus,

		paymentDueDate: customer.dueDate || null,
		contractSignedAt: customer.signedContract || null,
		contractExpiresAt: customer.signedDue || null,

		monthlyFee: customer.monthlyFee || 0,
		terminationClause: customer.terminationClause || null,

		address: {
			street: customer.address.street || null,
			avenue: customer.address.avenue || null,
			city: customer.address.city,
			state: customer.address.state,
			neighborhood: customer.address.neighborhood || null,
			number: customer.address.number || 0,
		},
	};
}

export async function getCustomers(): Promise<Customer[]> {
	const db = await getDb();

	const customers = await db
		.collection<CustomerDocument>("customers")
		.find()
		.toArray();

	return customers.map((customer) => mapCustomerDocument(customer));
}