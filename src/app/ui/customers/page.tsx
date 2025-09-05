"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Mail, Phone, CalendarDays, DollarSign } from "lucide-react";
import { mockCustomers } from "@/lib/mock";
import { Header } from "@/app/_components/header/Header";
import { MainContainer } from "@/app/_components/container/MainContainer";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter((customer) => {
      const matchesName =
        customer.fantasyName.toLowerCase().includes(search.toLowerCase()) ||
        customer.companyName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "todos" || customer.contractStatus === statusFilter;

      return matchesName && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <MainContainer>
      <Header
        title="Hype Pro Financeiro"
        subtitle="Monitoramento da carteira de clientes"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 ml-auto">
          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-[320px]"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Status do contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="vencido">Vencido</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em análise">Em análise</SelectItem>
              <SelectItem value="rescindido">Rescindido</SelectItem>
              <SelectItem value="em renovação">Em renovação</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <Card
              key={customer.cnpj}
              className="rounded-2xl shadow-md border hover:shadow-lg transition"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  {customer.fantasyName}
                </CardTitle>
                <Badge
                  variant={
                    customer.contractStatus === "ativo"
                      ? "default"
                      : customer.contractStatus === "vencido"
                      ? "destructive"
                      : "secondary"
                  }
                  className="capitalize"
                >
                  {customer.contractStatus}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">{customer.companyName}</p>
                  <p className="text-xs text-muted-foreground">
                    CNPJ: <span className="font-medium">{customer.cnpj}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  {customer.signedDate && (
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      Início:{" "}
                      <span className="font-medium">
                        {new Date(customer.signedDate).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                  {customer.dueDate && (
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      Vencimento:{" "}
                      <span className="font-medium">
                        {new Date(customer.dueDate).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold">
                    {customer.monthlyFee > 0
                      ? `R$ ${customer.monthlyFee.toFixed(2)}`
                      : "A definir"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">Nenhum cliente encontrado.</p>
        )}
      </div>
    </MainContainer>
  );
}
