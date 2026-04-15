"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";


const ButtonLogout = () => {
	const { logout } = useAuth();
	return (
		<Button onClick={() => logout()}>
			<LogOut className="mr-2 h-4 w-4" /> Sair
		</Button>
	);
};

export { ButtonLogout };