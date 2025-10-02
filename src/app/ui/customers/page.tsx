"use client";

import Image from "next/image";
import { 
  useMemo,
  useState,
} from "react";
import { 
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { 
  User,
  Mail,
  Phone,
  Building2,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import { 
  mockCustomers,
  mockCustomersVariables,
} from "@/lib/mock";
import { Header } from "@/app/_components/header/Header";
import { MainContainer } from "@/app/_components/container/MainContainer";
import { 
  formatDate,
  currencyBRL,
} from "@/lib/utils";
import { FooterContainer } from "@/app/_components/footer/FooterContainer";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tab, setTab] = useState("customerMonthly");

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

  const totalizers = useMemo(() => {
    const totalCustomers = filteredCustomers.length;

    const grossRevenue = filteredCustomers.reduce(
      (acc, c) => acc + (c.monthlyFee || 0),
      0
    );

    const activeCustomers = filteredCustomers.filter((c) =>
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
  }, [filteredCustomers]);

  const totalizersEvent = useMemo(() => {
    const totalCustomers = mockCustomersVariables.length;

    const total = mockCustomersVariables.reduce(
      (acc, c) => acc + (c.total || 0),
      0
    );

    // const activeCustomers = filteredCustomers.filter((c) =>
    //   ["ativo", "em renovação", "pendente"].includes(c.contractStatus.toLocaleLowerCase())
    // );

    const paid = mockCustomersVariables.reduce(
      (acc, c) => acc + (c.paid || 0),
      0
    );

    const open = mockCustomersVariables.reduce(
      (acc, c) => acc + (c.open || 0),
      0
    );

    return {
      totalCustomers,
      total,
      paid,
      open,
    };
  }, [mockCustomersVariables]);

  return (
    <MainContainer>
      <Header
        title="Hype Pro Financeiro"
        subtitle="Monitoramento da carteira de clientes"
      />
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto">
          <TabsTrigger value="customerMonthly">Clientes Mensais</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
        </TabsList>
      
      
        <TabsContent value="customerMonthly" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
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
                <SelectItem value="suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="mb-8 rounded-2xl shadow-md border">
            <CardHeader>
              <CardTitle className="text-xl">Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="rounded-xl shadow border">
                  <CardHeader>
                    <CardTitle>Total de Clientes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold">
                    {totalizers.totalCustomers}
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow border">
                  <CardHeader>
                    <CardTitle>Mensalidades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {currencyBRL(totalizers.activeRevenue)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bruto: {currencyBRL(totalizers.grossRevenue)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow border">
                  <CardHeader>
                    <CardTitle>Média de Mensalidade</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-blue-600">
                    {currencyBRL(totalizers.averageMonthlyFee)}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border">
            <CardHeader>
              <CardTitle className="text-xl">Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <Card
                      key={customer.cnpj}
                      className="rounded-2xl shadow-sm border hover:shadow-lg transition"
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
                          <p className="text-muted-foreground">
                            {customer.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            CNPJ:{" "}
                            <span className="font-medium">{customer.cnpj}</span>
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
                                {formatDate(customer.signedDate)}
                              </span>
                            </p>
                          )}
                          {customer.dueDate && (
                            <p className="flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-muted-foreground" />
                              Vencimento:{" "}
                              <span className="font-medium">
                                {formatDate(customer.dueDate)}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold">
                            {customer.monthlyFee > 0
                              ? currencyBRL(customer.monthlyFee)
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card className="mb-8 rounded-2xl shadow-md border">
            <CardHeader>
              <CardTitle className="text-xl">Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="rounded-xl shadow border">
                  <CardHeader>
                    <CardTitle>Total</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold">
                    {currencyBRL(totalizersEvent.total)}
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow border">
                  <CardHeader>
                    <CardTitle>Recebido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {currencyBRL(totalizersEvent.paid)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bruto: {currencyBRL(totalizers.grossRevenue)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow border">
                  <CardHeader>
                    <CardTitle>Em aberto</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-blue-600">
                    {currencyBRL(totalizersEvent.open)}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Eventos</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockCustomersVariables.length > 0 ? (
                  mockCustomersVariables.map((customer) => (
                    <Card
                      key={customer.customer + customer.date + customer.event}
                      className="rounded-2xl border shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                    >
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-xs md:text-lg font-semibold">
                          <User className="w-5 h-5 text-blue-600" />
                          {customer.customer}
                        </CardTitle>
                        <Badge className="capitalize text-xs px-2 py-1">
                          {formatDate(customer.date)}
                        </Badge>
                      </CardHeader>

                      <CardContent className="space-y-4 text-sm">
                        <p className="font-medium text-muted-foreground">
                          Tipo do evento: {customer.event}
                        </p>

                        <div className="flex flex-col gap-2 pt-3 border-t">
                          {customer.paid ? (
                            <span className="flex justify-between">
                              <span className="text-muted-foreground">Pago</span>
                              <span className="font-semibold">
                                {currencyBRL(customer.paid)}
                              </span>
                            </span>
                          ): <></>}
                          {customer.open ? (
                            <span className="flex justify-between">
                              <span className="text-muted-foreground">Em aberto</span>
                              <span className="font-semibold">
                                {currencyBRL(customer.open)}
                              </span>
                            </span>
                          ): <></>}
                          {customer.total ? (
                            <span className="flex justify-between border-t pt-2">
                              <span className="text-muted-foreground">Total</span>
                              <span className="font-bold">
                                {currencyBRL(customer.total)}
                              </span>
                            </span>
                          ): <></>}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">Nenhum cliente encontrado.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <FooterContainer>
        <div className="flex flex-col text-xs text-muted-foreground">
          <p className="flex gap-2 py-1 font-semibold text-[14px]"><Building2 width={20} height={20} /> IF Consult LTDA</p>
          <span className="flex gap-2"><Phone width={20} height={20} /> (88) 9205-8544</span>
          <span className="flex gap-2"><Mail width={20} height={20} /> financeiro01@israelfrota.com.br</span>
        </div>
        <Image src={"/imagem.jpeg"} alt="Logo" width={50} height={50} />
      </FooterContainer>
    </MainContainer>
  );
}
