"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthForm } from "@/hooks/useAuthForm";

import { RegisterForm } from "@/app/components/auth/RegisterForm";

import {
	registerSchema,
	type RegisterSchema,
} from "@/lib/validations/authSchemas";


export default function Register() {
	const { register, isLoading } = useAuthForm();
	
	const formSignUp = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	return ( 
		<RegisterForm
			form={formSignUp}
			onSubmit={register}
			loading={isLoading}
		/>
	);
}