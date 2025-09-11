"use client";

import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";

import { MarkdownEditorToolbar } from "./toolbar";

interface MarkdownEditorProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
}

export const MarkdownEditor = ({
	value,
	onChange,
	placeholder,
	disabled,
}: MarkdownEditorProps) => {
	const isMobile = useIsMobile();
	return (
		<div className="border-input rounded-md border">
			<MarkdownEditorToolbar />

			<Textarea
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				rows={isMobile ? 3 : 6}
				className="rounded-t-none border-none p-2"
			/>
		</div>
	);
};
