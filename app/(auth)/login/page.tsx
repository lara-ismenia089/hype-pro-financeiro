"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthForm } from "@/hooks/useAuthForm";

import { LoginForm } from "@/app/components/auth/LoginForm";

import {
	loginSchema,
	type LoginSchema,
} from "@/lib/validations/authSchemas";


export default function Login() {
	const { login, isLoading } = useAuthForm();
	
	const formSignIn = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<LoginForm
			form={formSignIn}
			onSubmit={login}
			loading={isLoading}
		/>
	);
}