import { NextResponse, type NextRequest } from "next/server";

import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

import { createORPCContext } from "@/lib/orpc";
import { appRouter } from "@/lib/orpc/routers";

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

const createContext = async (req: NextRequest) => {
	return createORPCContext({
		headers: req.headers,
	});
};

async function handleRequest(req: NextRequest) {
	const rpcResult = await rpcHandler.handle(req, {
		prefix: "/rpc",
		context: await createContext(req),
	});

	if (rpcResult.response) return rpcResult.response;

	const apiResult = await apiHandler.handle(req, {
		prefix: "/rpc/api",
		context: await createContext(req),
	});

	if (apiResult.response) return apiResult.response;

	return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
