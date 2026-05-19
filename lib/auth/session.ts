import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ROUTER } from "../constants/routes";
import { auth } from "./auth";

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