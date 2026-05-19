import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { getDb } from "@/database/mongo";


const db = await getDb();

export const auth = betterAuth({
	database: mongodbAdapter(db),
	experimental: {
		joins: true,
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;