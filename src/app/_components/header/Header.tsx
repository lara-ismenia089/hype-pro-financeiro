'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  Home, 
  UserRound, 
} from "lucide-react";

import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  subtitle: string;
};

function ButtonContainer({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      className="gap-2 bg-[#202020] text-white hover:cursor-pointer"
    >
      { children }
    </Button>
  );
}

export function Header({ title, subtitle }: HeaderProps) {
  const pathname = usePathname();
  const isCustomersPage = pathname.startsWith('/ui/customers');
  
  return (
    <header className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-3">
      <div className="flex items-center gap-3">
        <Image
          src="/hype_logo.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <div>
          <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="flex justify-end">
        {isCustomersPage ? (
          <Link href="/">
            <ButtonContainer>
              <Home className="mr-2 h-4 w-4" />
              Página inicial
            </ButtonContainer>
          </Link>
        ) : (
          <Link href="/ui/customers">
            <ButtonContainer>
              <UserRound className="mr-2 h-4 w-4" />
              Parcerias
            </ButtonContainer>
          </Link>
        )}
      </div>
    </header>
  );
}
