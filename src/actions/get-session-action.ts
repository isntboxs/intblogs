"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const getSessionAction = async () => {
	return auth.api.getSession({
		headers: await headers(),
	});
};
