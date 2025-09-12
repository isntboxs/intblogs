"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc/client";

export const PostHomeView = () => {
	const { data } = useSuspenseQuery(orpc.privateData.queryOptions());

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
