import { z } from "zod";

const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email é obrigatório")
		.email("Digite um email válido"),

	password: z
		.string()
		.min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = z.object({
	name: z
		.string()
		.min(1, "Nome é obrigatório")
		.lowercase(),

	email: z
		.string()
		.min(1, "Email é obrigatório")
		.email("Digite um email válido"),

	password: z
		.string()
		.min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema };