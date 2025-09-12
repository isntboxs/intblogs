import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { orpc } from "@/lib/orpc/client";
import { getQueryClient } from "@/lib/orpc/server";
import { HydrateClient } from "@/lib/query/hydration";
import { PostHomeView } from "@/modules/post/ui/views/post-home-view";

export default async function HomePage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(orpc.privateData.queryOptions());

	return (
		<HydrateClient client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>
				<ErrorBoundary fallback={<div>Something went wrong</div>}>
					<PostHomeView />
				</ErrorBoundary>
			</Suspense>
		</HydrateClient>
	);
}
