"use client";

import { useState } from "react";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import {
	useCustomerEventsSummary,
	useCustomersSummary,
} from "@/hooks/useCustomerSummary";
import {
	Customer,
	Event,
} from "@/lib/types";

import { CustomersSummaryCard } from "./customers-summary-card";
import { EventsSummaryCard } from "./events-summary-card";


type DashboardTab =
	| "customers"
	| "events";

type CustomerOverviewTabsProps = {
	customers: Customer[];
	events: Event[];
};

const CustomerOverviewTabs = function ({
	events,
	customers,
}: CustomerOverviewTabsProps) {
	const [activeTab, setActiveTab] =
		useState<DashboardTab>("customers");

	function handleTabChange(value: string) {
		if (value === "customers" || value === "events") {
			setActiveTab(value);
		}
	}

	const eventsSummary =
		useCustomerEventsSummary(events);

	const customersSummary =
		useCustomersSummary(customers);

	return (
		<Tabs
			value={activeTab}
			onValueChange={handleTabChange}
			className="w-full"
		>
			<TabsList className="grid w-full grid-cols-2 sm:w-auto">
				<TabsTrigger value="customers">
					Clientes Mensais
				</TabsTrigger>

				<TabsTrigger value="events">
					Eventos
				</TabsTrigger>
			</TabsList>

			<TabsContent
				value="customers"
				className="space-y-4"
			>
				<CustomersSummaryCard
					summary={customersSummary}
					customerList={customers}
				/>
			</TabsContent>

			<TabsContent
				value="events"
				className="space-y-4"
			>
				<EventsSummaryCard
					summary={eventsSummary}
					eventList={events}
					grossRevenue={customersSummary.grossRevenue}
				/>
			</TabsContent>
		</Tabs>
	);
};

export { CustomerOverviewTabs };