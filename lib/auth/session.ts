import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "./auth";
import { ROUTER } from "../constants/routes";

export async function getSession() {
	return auth.api.getSession({
		headers: await headers()
	});
}

export async function requireSession() {
	const session = await getSession();
	if (!session) redirect(ROUTER.login);
	return session;
}