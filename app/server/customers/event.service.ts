"use server";

import { ObjectId } from "mongodb";

import { getDb } from "@/database/mongo";
import { Event } from "@/lib/types";


type EventDocument = {
	_id: ObjectId,

	date: Date,
	customer: string,

	event: number,
	total: number,
	paid: number,
	open: number,
};

function mapEventDocument(
	event: EventDocument,
): Event {
	return {
		id: event._id.toString(),

		date: event.date,
		customer: event.customer,

		eventAmount: event.event,

		totalAmount: event.total,
		paidAmount: event.paid,
		openAmount: event.open,
	};
}

export async function getEvents(): Promise<Event[]> {
	const db = await getDb();

	const events = await db
		.collection<EventDocument>("revenues")
		.find()
		.toArray();
	
	return events.map((event) => mapEventDocument(event));
}