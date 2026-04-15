"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";


const ButtonLogout = () => {
	const { logout } = useAuth();
	return <Button onClick={() => logout()}>Encerrar sessão</Button>;
};

export { ButtonLogout };