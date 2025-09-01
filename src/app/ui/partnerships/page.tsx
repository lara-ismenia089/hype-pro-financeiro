"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone } from "lucide-react";
import { mockPartnerships } from "@/lib/mock";

export default function Partnerships() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Parcerias</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPartnerships.map((partner) => (
          <Card key={partner.cnpj} className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                {partner.fantasyName}
              </CardTitle>
              <Badge
                variant={
                  partner.contractStatus === "ativo"
                    ? "default"
                    : partner.contractStatus === "vencido"
                    ? "destructive"
                    : "secondary"
                }
              >
                {partner.contractStatus}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">{partner.companyName}</p>
              <p>CNPJ: {partner.cnpj}</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {partner.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {partner.phone}
              </p>
              {partner.signedDate && (
                <p>Início: {new Date(partner.signedDate).toLocaleDateString()}</p>
              )}
              {partner.dueDate && (
                <p>Vencimento: {new Date(partner.dueDate).toLocaleDateString()}</p>
              )}
              <p>
                Mensalidade:{" "}
                {partner.monthlyFee > 0
                  ? `R$ ${partner.monthlyFee.toFixed(2)}`
                  : "A definir"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
