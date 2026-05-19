"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Home,
	UserRound,
} from "lucide-react";

import { ButtonLogout } from "@/app/components/ui/sign-out";
import { Button } from "@/components/ui/button";
import { ROUTER } from "@/lib/constants/routes";


type HeaderProps = {
	title: string;
	subtitle: string;
};

const Header = ({ title, subtitle }: HeaderProps) => {
	const pathname = usePathname();
	const isCustomerPage = pathname.startsWith(ROUTER.customer);
	const isDashboardPage = pathname.startsWith(ROUTER.dashboard);

	return (
		<header
			className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
			role="banner"
		>
			<div className="flex items-center gap-3 py-3">
				<Image
					src="/hype_logo.png"
					alt="logo"
					width={40}
					height={40}
					priority
					className="rounded-md"
				/>
				<div>
					<h1 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h1>
					<span className="text-xs text-muted-foreground sm:text-sm">{subtitle}</span>
				</div>
			</div>

			<nav className="flex gap-2 justify-end">
				<Button variant={isDashboardPage ? "default" : "outline"} asChild>
					<Link href={ROUTER.dashboard}>
						<Home className="mr-2 h-4 w-4" /> Dashboard
					</Link>
				</Button>

				<Button variant={isCustomerPage ? "default" : "outline"} asChild>
					<Link href={ROUTER.customer}>
						<UserRound className="mr-2 h-4 w-4" /> Parcerias
					</Link>
				</Button>
				
				<ButtonLogout />
			</nav>
		</header>
	);
};

export { Header };