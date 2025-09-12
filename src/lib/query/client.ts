import { StandardRPCJsonSerializer } from "@orpc/client/standard";
import {
	defaultShouldDehydrateQuery,
	QueryCache,
	QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const serializer = new StandardRPCJsonSerializer({
	customJsonSerializers: [],
});

export const createQueryClient = () => {
	// eslint-disable-next-line prefer-const
	let client: QueryClient;

	const queryCache = new QueryCache({
		onError: (error) => {
			toast.error(`Oops! Something went wrong`, {
				action: {
					label: "retry",
					onClick: () => {
						void client.invalidateQueries();
					},
				},

				description: error.message,
			});
		},
	});

	client = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn(queryKey) {
					const [json, meta] = serializer.serialize(queryKey);
					return JSON.stringify({ json, meta });
				},
				staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount
			},

			dehydrate: {
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
				serializeData(data) {
					const [json, meta] = serializer.serialize(data);
					return { json, meta };
				},
			},

			hydrate: {
				deserializeData(data) {
					return serializer.deserialize(data.json, data.meta);
				},
			},
		},

		queryCache,
	});

	return client;
};
