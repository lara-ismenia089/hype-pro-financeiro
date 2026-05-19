import { getCustomers } from "@/app/server/customers/customer.service";


export async function listCustomers() {
	const customers = await getCustomers();

	return {
		customers,
	};
}