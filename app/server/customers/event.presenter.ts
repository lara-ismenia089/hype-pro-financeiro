import { getEvents } from "@/app/server/customers/event.service";


export async function listCustomerEvents() {
	const events = await getEvents();

	return {
		events,
	};
}