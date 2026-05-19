"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";


const ButtonLogout = () => {
	const { logout } = useAuth();
	return (
		<Button variant="destructive" onClick={() => logout()}>
			<LogOut className="mr-2 h-4 w-4" /> Sair
		</Button>
	);
};

export { ButtonLogout };