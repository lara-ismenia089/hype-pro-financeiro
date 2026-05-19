import { CustomerOverviewTabs } from "@/app/components/ui/customer-tabs";
import { Header } from "@/app/components/ui/header";
import { listCustomers } from "@/app/server/customers/customer.presenter";
import { listCustomerEvents } from "@/app/server/customers/event.presenter";


export default async function CustomerPage() {
	const [customerEvents, customers] = await Promise.all([
		listCustomerEvents(),
		listCustomers(),
	]);

	return (
		<>
			<Header
				title="Hype Pro Financeiro"
				subtitle="Monitoramento da carteira de clientes"
			/>

			<CustomerOverviewTabs
				events={customerEvents.events}
				customers={customers.customers}
			/>
		</>
	);
}