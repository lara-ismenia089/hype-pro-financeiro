import { useState } from "react";
import { toast } from "sonner";

import {
	signIn,
	signUp,
} from "@/lib/auth/auth-client";
import { ROUTER } from "@/lib/constants/routes";
import {
	loginSchema,
	registerSchema,
} from "@/lib/validations/authSchemas";


export function useAuthForm() {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const login = async (values: { email: string, password: string }) => {
		const parsed = loginSchema.safeParse(values);
		if (!parsed.success) {
			setError(parsed.error.message);
			return;
		}

		signIn.email({
			email: parsed.data.email,
			password: parsed.data.password,
			callbackURL: ROUTER.dashboard,
			rememberMe: false,
		}, {
			onRequest() {
				setIsLoading(true);
			},
			onSuccess() {
				setError(null);
				setIsLoading(false);
			},
			onError(context) {
				toast.error("E-mail ou senha incorretos");
				setError(context.error.message);
				setIsLoading(false);
			},
		});
	};

	const register = async (values: { name: string, email: string, password: string }) => {
		const parsed = registerSchema.safeParse(values);
		if (!parsed.success) {
			setError(parsed.error.message);
			return;
		}

		signUp.email({
			name: parsed.data.name,
			email: parsed.data.email,
			password: parsed.data.password,
			callbackURL: ROUTER.login,
			
		}, {
			onRequest() {
				setIsLoading(true);
			},
			onSuccess() {
				setError(null);
				setIsLoading(false);
			},
			onError(context) {
				toast.error("Informe dados válidos.");
				setError(context.error.message);
				setIsLoading(false);
			},
		});
	};

	return { login, register, error, isLoading };
}