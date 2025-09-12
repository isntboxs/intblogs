// remark-code-block-meta.ts
import { isValidElement, type ReactNode } from "react";

import type { Node } from "unist";
import { visit } from "unist-util-visit";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface CodeNode extends Node {
	type: "code";
	lang?: string;
	meta?: string;
	value: string;
	data?: {
		hProperties?: Record<string, unknown>;
		[key: string]: unknown;
	};
}

interface ExtractedCodeInfo {
	title?: string;
	filename?: string;
	language?: string;
}

// Remark plugin untuk extract code block metadata
export function remarkCodeBlockMeta() {
	return (tree: Node) => {
		visit(tree, "code", (node: CodeNode) => {
			if (!node.meta) return;

			const extracted = extractCodeBlockInfo(node.meta);

			if (Object.keys(extracted).length > 0) {
				node.data = node.data ?? {};
				node.data.hProperties = node.data.hProperties ?? {};

				if (extracted.title) {
					node.data.hProperties["data-title"] = extracted.title;
				}
				if (extracted.filename) {
					node.data.hProperties["data-filename"] = extracted.filename;
				}
				if (extracted.language && !node.lang) {
					node.lang = extracted.language;
				}
			}
		});
	};
}

function extractCodeBlockInfo(meta: string): ExtractedCodeInfo {
	const info: ExtractedCodeInfo = {};

	// Extract title: title="filename.ts"
	const titleMatch = /title=["']([^"']+)["']/.exec(meta);
	if (titleMatch) {
		info.title = titleMatch[1];
		info.filename = titleMatch[1];

		// Auto-detect language from filename extension
		const ext = getFileExtension(titleMatch[1]);
		if (ext) {
			info.language = getLanguageFromExtension(ext);
		}
	}

	return info;
}

function getFileExtension(filename: string): string | null {
	const match = /\.([^.]+)$/.exec(filename);
	return match ? match[1].toLowerCase() : null;
}

function getLanguageFromExtension(ext: string): string | undefined {
	const langMap: Record<string, string> = {
		ts: "typescript",
		tsx: "tsx",
		js: "javascript",
		jsx: "jsx",
		py: "python",
		rb: "ruby",
		php: "php",
		java: "java",
		go: "go",
		rs: "rust",
		html: "html",
		css: "css",
		json: "json",
		md: "markdown",
		sql: "sql",
		// tambah sesuai kebutuhan
	};

	return langMap[ext];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const codeBlockMetaCustomPlugin = () => (tree: any) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const visit = (node: any, callback: (node: any) => void) => {
		callback(node);
		if (node.children) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			node.children.forEach((child: any) => visit(child, callback));
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	visit(tree, (node: any) => {
		if (node.type === "code" && node.meta) {
			// Extract title from meta string like 'title="auth.ts"'
			const titleMatch = node.meta.match(/title="([^"]*)"/);
			if (titleMatch) {
				node.data = node.data ?? {};
				node.data.hProperties = node.data.hProperties ?? {};
				node.data.hProperties.title = titleMatch[1];
			}
		}
	});
};

export const extractTextContent = (node: ReactNode): string => {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}
	if (isValidElement(node)) {
		const props = node.props as { children?: React.ReactNode };
		return props.children ? extractTextContent(props.children) : "";
	}
	if (Array.isArray(node)) {
		return node.map(extractTextContent).join("");
	}
	return "";
};

export const makeStableId = (s: string) =>
	"code-" +
	Math.abs(
		Array.from(s).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)
	).toString(36);
