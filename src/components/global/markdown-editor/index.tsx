"use client";

import { forwardRef, useRef } from "react";

import { MarkdownEditorToolbar } from "@/components/global/markdown-editor/toolbar";
import { Textarea } from "@/components/ui/textarea";

interface MarkdownEditorProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
}

export const MarkdownEditor = forwardRef<
	HTMLTextAreaElement,
	MarkdownEditorProps
>(({ value, onChange, placeholder, disabled }, ref) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleHeading = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			// Selected text - wrap with # for heading 1
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) + "# " + selected + value!.slice(end);
			onChange?.(newText);

			// Set cursor after the inserted text
			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 2 + selected.length;
					textareaRef.current.focus();
				}
			});
		} else {
			// No selection - apply to current line
			const before = value!.slice(0, start);
			const after = value!.slice(start);
			const lineStart = before.lastIndexOf("\n") + 1;
			const lineEnd = after.indexOf("\n");
			const lineEndIndex = lineEnd === -1 ? value!.length : lineStart + lineEnd;
			const line = value!.slice(lineStart, lineEndIndex);

			const match = /^(#{1,6})\s/.exec(line);
			let newLevel = 1;
			if (match) {
				const currentLevel = match[1].length;
				if (currentLevel < 6) {
					newLevel = currentLevel + 1;
				} else {
					newLevel = 1; // Cycle back to 1 if already at 6
				}
			}
			const newHeading = "#".repeat(newLevel) + " ";
			const newLine = line.replace(/^#{0,6}\s*/, newHeading);
			const newText =
				value!.slice(0, lineStart) + newLine + value!.slice(lineEndIndex);
			onChange?.(newText);

			// Set cursor at end of heading
			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = lineStart + newHeading.length;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleBold = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) + "**" + selected + "**" + value!.slice(end);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 2 + selected.length + 2;
					textareaRef.current.focus();
				}
			});
		} else {
			const newText = value!.slice(0, start) + "****" + value!.slice(start);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 2;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleItalic = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) + "*" + selected + "*" + value!.slice(end);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 1 + selected.length + 1;
					textareaRef.current.focus();
				}
			});
		} else {
			const newText = value!.slice(0, start) + "**" + value!.slice(start);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 1;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleStrikethrough = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) + "~~" + selected + "~~" + value!.slice(end);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 2 + selected.length + 2;
					textareaRef.current.focus();
				}
			});
		} else {
			const newText = value!.slice(0, start) + "~~~~" + value!.slice(start);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 2;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleCode = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) + "`" + selected + "`" + value!.slice(end);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 1 + selected.length + 1;
					textareaRef.current.focus();
				}
			});
		} else {
			const newText = value!.slice(0, start) + "``" + value!.slice(start);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 1;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleCodeBlock = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) +
				"```\n" +
				selected +
				"\n```" +
				value!.slice(end);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 4 + selected.length + 4;
					textareaRef.current.focus();
				}
			});
		} else {
			const newText =
				value!.slice(0, start) + "```\n\n```" + value!.slice(start);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart =
						textareaRef.current.selectionEnd = start + 4;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleUnorderedList = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const before = value!.slice(0, start);
		const after = value!.slice(start);
		const lineStart = before.lastIndexOf("\n") + 1;
		const lineEnd = after.indexOf("\n");
		const lineEndIndex = lineEnd === -1 ? value!.length : lineStart + lineEnd;
		const line = value!.slice(lineStart, lineEndIndex);

		const newLine = line.replace(/^(\s*)([-*]\s)?/, "$1- ");
		const newText =
			value!.slice(0, lineStart) + newLine + value!.slice(lineEndIndex);
		onChange?.(newText);

		setTimeout(() => {
			if (textareaRef.current) {
				textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
					lineStart + newLine.length;
				textareaRef.current.focus();
			}
		});
	};

	const handleOrderedList = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const before = value!.slice(0, start);
		const after = value!.slice(start);
		const lineStart = before.lastIndexOf("\n") + 1;
		const lineEnd = after.indexOf("\n");
		const lineEndIndex = lineEnd === -1 ? value!.length : lineStart + lineEnd;
		const line = value!.slice(lineStart, lineEndIndex);

		const newLine = line.replace(/^(\s*)(\d+\.\s)?/, "$11. ");
		const newText =
			value!.slice(0, lineStart) + newLine + value!.slice(lineEndIndex);
		onChange?.(newText);

		setTimeout(() => {
			if (textareaRef.current) {
				textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
					lineStart + newLine.length;
				textareaRef.current.focus();
			}
		});
	};

	const handleLink = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) + "[" + selected + "](url)" + value!.slice(end);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart = start + selected.length + 3;
					textareaRef.current.selectionEnd = start + selected.length + 6;
					textareaRef.current.focus();
				}
			});
		} else {
			const newText =
				value!.slice(0, start) + "[text](url)" + value!.slice(start);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart = start + 1;
					textareaRef.current.selectionEnd = start + 5;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleImage = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;

		if (start !== end) {
			const selected = value!.slice(start, end);
			const newText =
				value!.slice(0, start) + "![" + selected + "](url)" + value!.slice(end);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart = start + selected.length + 4;
					textareaRef.current.selectionEnd = start + selected.length + 7;
					textareaRef.current.focus();
				}
			});
		} else {
			const newText =
				value!.slice(0, start) + "![alt](url)" + value!.slice(start);
			onChange?.(newText);

			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart = start + 2;
					textareaRef.current.selectionEnd = start + 5;
					textareaRef.current.focus();
				}
			});
		}
	};

	const handleBlockquote = () => {
		if (!textareaRef.current) return;

		const start = textareaRef.current.selectionStart;
		const before = value!.slice(0, start);
		const after = value!.slice(start);
		const lineStart = before.lastIndexOf("\n") + 1;
		const lineEnd = after.indexOf("\n");
		const lineEndIndex = lineEnd === -1 ? value!.length : lineStart + lineEnd;
		const line = value!.slice(lineStart, lineEndIndex);

		const newLine = line.replace(/^(\s*)(>\s)?/, "$1> ");
		const newText =
			value!.slice(0, lineStart) + newLine + value!.slice(lineEndIndex);
		onChange?.(newText);

		setTimeout(() => {
			if (textareaRef.current) {
				textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
					lineStart + newLine.length;
				textareaRef.current.focus();
			}
		});
	};

	const renderEditorContent = () => {
		return (
			<>
				<Textarea
					ref={(el) => {
						textareaRef.current = el;
						if (typeof ref === "function") ref(el);
						else if (ref) ref.current = el;
					}}
					value={value}
					onChange={(e) => onChange?.(e.target.value)}
					placeholder={placeholder}
					disabled={disabled}
					rows={10}
					className="rounded-t-none border-none p-2"
				/>
			</>
		);
	};

	return (
		<div className="border-input rounded-md border">
			<MarkdownEditorToolbar
				handleHeading={handleHeading}
				handleBold={handleBold}
				handleItalic={handleItalic}
				handleStrikethrough={handleStrikethrough}
				handleCode={handleCode}
				handleCodeBlock={handleCodeBlock}
				handleUnorderedList={handleUnorderedList}
				handleOrderedList={handleOrderedList}
				handleLink={handleLink}
				handleImage={handleImage}
				handleBlockquote={handleBlockquote}
			/>

			{renderEditorContent()}
		</div>
	);
});

MarkdownEditor.displayName = "MarkdownEditor";
