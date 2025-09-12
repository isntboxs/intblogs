"use client";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import {
	codeBlockMetaCustomPlugin,
	remarkCodeBlockMeta,
} from "@/components/global/markdown-renderer/markdown-helpers";
import { cn } from "@/lib/utils";

import { CodeBlockComponent } from "./markdown-renderer-componen";

interface Props {
	content: string;
	className?: string;
}

export const MarkdownRenderer = ({ content, className }: Props) => {
	return (
		<div className={cn("max-w-none", className)}>
			<ReactMarkdown
				remarkPlugins={[
					remarkGfm,
					remarkBreaks,
					remarkMath,
					remarkCodeBlockMeta,
					codeBlockMetaCustomPlugin,
				]}
				rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]}
				components={{
					code: CodeBlockComponent,

					h1: ({ ...props }) => (
						<h1
							className="text-foreground mt-8 mb-4 text-3xl font-bold"
							{...props}
						/>
					),

					h2: ({ ...props }) => (
						<h2
							className="text-foreground mt-6 mb-3 text-2xl font-semibold"
							{...props}
						/>
					),

					h3: ({ ...props }) => (
						<h3
							className="text-foreground mt-4 mb-2 text-xl font-medium"
							{...props}
						/>
					),

					p: ({ children, ...props }) => (
						<p className="text-foreground mb-4 leading-relaxed" {...props}>
							{children}
						</p>
					),

					ul: ({ children, ...props }) => (
						<ul className="text-foreground mb-4 ml-6 list-disc" {...props}>
							{children}
						</ul>
					),

					ol: ({ children, ...props }) => (
						<ol className="text-foreground mb-4 ml-6 list-decimal" {...props}>
							{children}
						</ol>
					),

					li: ({ children, ...props }) => (
						<li className="mb-1" {...props}>
							{children}
						</li>
					),

					blockquote: ({ children, ...props }) => (
						<blockquote
							className="border-muted-foreground/30 text-muted-foreground my-4 border-l-4 pl-4 italic"
							{...props}
						>
							{children}
						</blockquote>
					),

					strong: ({ children, ...props }) => (
						<strong className="text-foreground font-semibold" {...props}>
							{children}
						</strong>
					),

					em: ({ children, ...props }) => (
						<em className="text-foreground italic" {...props}>
							{children}
						</em>
					),

					hr: (props) => <hr className="border-border my-8" {...props} />,
					// Table components for GFM support

					table: ({ children, ...props }) => (
						<div className="mb-4 overflow-x-auto">
							<table
								className="border-border border-collapse border"
								{...props}
							>
								{children}
							</table>
						</div>
					),

					thead: ({ children, ...props }) => (
						<thead className="bg-muted/50" {...props}>
							{children}
						</thead>
					),

					tbody: ({ children, ...props }) => (
						<tbody {...props}>{children}</tbody>
					),

					tr: ({ children, ...props }) => (
						<tr className="border-border border-b" {...props}>
							{children}
						</tr>
					),

					th: ({ children, ...props }) => (
						<th
							className="border-border border px-4 py-2 text-left font-semibold"
							{...props}
						>
							{children}
						</th>
					),

					td: ({ children, ...props }) => (
						<td className="border-border border px-4 py-2" {...props}>
							{children}
						</td>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};
