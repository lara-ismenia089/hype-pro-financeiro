"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { useAuthForm } from "@/hooks/useAuthForm";
import {
	type RegisterSchema,
	registerSchema,
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