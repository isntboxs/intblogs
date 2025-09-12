"use client";

import { cn } from "@/lib/utils";

interface Props {
	content: string;
	className?: string;
}

export const MarkdownRenderer = ({ content, className }: Props) => {
	return <div className={cn("max-w-none", className)}>{content}</div>;
};
