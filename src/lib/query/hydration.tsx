import {
	dehydrate,
	HydrationBoundary,
	type QueryClient,
} from "@tanstack/react-query";

interface Props {
	children: React.ReactNode;
	client: QueryClient;
}

export const HydrateClient = (props: Props) => {
	return (
		<HydrationBoundary state={dehydrate(props.client)}>
			{props.children}
		</HydrationBoundary>
	);
};
