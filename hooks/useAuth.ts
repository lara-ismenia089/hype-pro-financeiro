import { useRouter } from "next/navigation";

import {
	signOut,
	useSession,
} from "@/lib/auth/auth-client";

import { ROUTER } from "@/lib/constants/routes";


export function useAuth() {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	const logout = async () => {
		await signOut();
		router.replace(ROUTER.login);
	};

	return {
		user: session?.user ?? null,
		session: session?.session ?? null,
		isLoading: isPending,
		isAuthenticated: !!session,
		logout,
	};
}