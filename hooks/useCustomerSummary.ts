"use client";

import { useMemo } from "react";

import {
  Customer,
  Event,
} from "@/lib/types";


export function useCustomersSummary(customers: Customer[]) {
	return useMemo(() => {
    const totalCustomers = customers.length;

    const grossRevenue = customers.reduce(
      (acc, c) => acc + (c.monthlyFee || 0),
      0
    );

    const activeCustomers = customers.filter((c) =>
      ["ativo", "em renovação", "pendente"].includes(c.contractStatus.toLocaleLowerCase())
    );

    const activeRevenue = activeCustomers.reduce(
      (acc, c) => acc + (c.monthlyFee || 0),
      0
    );

    const averageMonthlyFee =
      activeCustomers.length > 0 ? activeRevenue / activeCustomers.length : 0;

    return {
      totalCustomers,
      grossRevenue,
      activeRevenue,
      averageMonthlyFee,
    };
  }, [customers]);
}

export function useCustomerEventsSummary(events: Event[]) {
	return useMemo(() => {
    const totalCustomers = events.length;

    const totalAmount = events.reduce(
      (acc, c) => acc + (c.totalAmount || 0),
      0
    );

    const paidAmount = events.reduce(
      (acc, c) => acc + (c.paidAmount || 0),
      0
    );

    const openAmount = events.reduce(
      (acc, c) => acc + (c.openAmount || 0),
      0
    );

    return {
      totalCustomers,
      totalAmount,
      paidAmount,
      openAmount,
    };
  }, [events]);
}