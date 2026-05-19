import Image from "next/image";
import {
	UseFormReturn,
} from "react-hook-form";

import { FormField } from "@/app/components/ui/form-field";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldGroup,
} from "@/components/ui/field";
import { type RegisterSchema } from "@/lib/validations/authSchemas";


type RegisterProps = {
  form: UseFormReturn<RegisterSchema>;
  onSubmit: (data: RegisterSchema) => void;
  loading: boolean;
};

const RegisterForm = ({ form, onSubmit, loading }: RegisterProps) => {
	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Card className="w-87.5 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
				<CardHeader className="items-center">
					<div className="w-full flex flex-col justify-center items-center">
						<Image
							src="/hype_logo.svg"
							alt="logo da hype"
							width={120}
							height={40}
							priority
							className="w-auto h-16"
						/>
						<CardTitle className="text-white text-lg font-semibold">Crie seu usuário</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<FieldGroup>
						<FormField
							name="name"
							type="text"
							control={form.control}
							placeholder="Hype Prop"
						/>

						<FormField
							name="email"
							type="email"
							placeholder="email@exemplo.com.br"
							control={form.control}
						/>

						<FormField
							name="password"
							type="password"
							placeholder="**********"
							control={form.control}
						/>
					</FieldGroup>
				</CardContent>
				
				<CardFooter className="flex flex-col gap-3">
					<Field orientation="horizontal">
						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-[#031c3e] hover:bg-[#0a2f66] text-white transition-colors"
						>
							{loading ? "Criando..." : "Criar Conta"}
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</form>
	);
};

export { RegisterForm };