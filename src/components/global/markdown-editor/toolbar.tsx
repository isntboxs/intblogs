import {
	Bold,
	Code,
	Code2,
	EyeIcon,
	FileTextIcon,
	Heading,
	ImageIcon,
	InfoIcon,
	Italic,
	Link,
	List,
	ListOrdered,
	Quote,
	SplitIcon,
	Strikethrough,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarkdownEditorToolbarProps {
	handleHeading: () => void;
	handleBold: () => void;
	handleItalic: () => void;
	handleStrikethrough: () => void;
	handleCode: () => void;
	handleCodeBlock: () => void;
	handleUnorderedList: () => void;
	handleOrderedList: () => void;
	handleLink: () => void;
	handleImage: () => void;
	handleBlockquote: () => void;
	viewMode?: "editor" | "preview" | "split";
	onViewModeChange?: (mode: "editor" | "preview" | "split") => void;
}

export const MarkdownEditorToolbar = ({
	handleHeading,
	handleBold,
	handleItalic,
	handleStrikethrough,
	handleCode,
	handleCodeBlock,
	handleUnorderedList,
	handleOrderedList,
	handleLink,
	handleImage,
	handleBlockquote,
	viewMode = "editor",
	onViewModeChange,
}: MarkdownEditorToolbarProps) => {
	return (
		<div className="flex items-center gap-1 rounded-md rounded-b-none border-b p-2">
			<div className="hidden items-center gap-1 sm:flex">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleBold}
							onMouseDown={(e) => e.preventDefault()}
							className="h-8 w-8"
							type="button"
						>
							<Bold className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Bold</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleItalic}
							className="h-8 w-8"
							type="button"
						>
							<Italic className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Italic</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleStrikethrough}
							className="h-8 w-8"
							type="button"
						>
							<Strikethrough className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Strikethrough</p>
					</TooltipContent>
				</Tooltip>

				<Separator
					orientation="vertical"
					className="data-[orientation=vertical]:h-6"
				/>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleHeading}
							className="h-8 w-8"
							type="button"
						>
							<Heading className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Heading</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleUnorderedList}
							className="h-8 w-8"
							type="button"
						>
							<List className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Unordered List</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleOrderedList}
							className="h-8 w-8"
							type="button"
						>
							<ListOrdered className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Ordered List</p>
					</TooltipContent>
				</Tooltip>

				<Separator
					orientation="vertical"
					className="data-[orientation=vertical]:h-6"
				/>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleCode}
							className="h-8 w-8"
							type="button"
						>
							<Code className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Inline Code</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleCodeBlock}
							className="h-8 w-8"
							type="button"
						>
							<Code2 className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Code Block</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleBlockquote}
							className="h-8 w-8"
							type="button"
						>
							<Quote className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Blockquote</p>
					</TooltipContent>
				</Tooltip>

				<Separator
					orientation="vertical"
					className="data-[orientation=vertical]:h-6"
				/>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleLink}
							className="h-8 w-8"
							type="button"
						>
							<Link className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Link</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleImage}
							className="h-8 w-8"
							type="button"
						>
							<ImageIcon className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Image</p>
					</TooltipContent>
				</Tooltip>
			</div>

			<div className="flex w-full items-center gap-2 sm:ml-auto sm:w-fit">
				<span className="text-muted-foreground not-sr-only text-sm font-medium sm:sr-only">
					Markdown Editor
				</span>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onMouseDown={(e) => e.preventDefault()}
							className="h-8 w-8"
							type="button"
						>
							<InfoIcon className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Markdown Help</p>
					</TooltipContent>
				</Tooltip>

				<Separator
					orientation="vertical"
					className="hidden data-[orientation=vertical]:h-6 sm:block"
				/>

				{/* View Mode Buttons */}
				{onViewModeChange && (
					<div className="ml-auto flex items-center gap-1 sm:ml-0">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant={viewMode === "editor" ? "default" : "ghost"}
									size="sm"
									onClick={() => onViewModeChange("editor")}
									aria-label="Editor Mode"
								>
									<FileTextIcon className="size-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Editor</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant={viewMode === "preview" ? "default" : "ghost"}
									size="sm"
									onClick={() => onViewModeChange("preview")}
									aria-label="Preview Mode"
								>
									<EyeIcon className="size-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Preview</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant={viewMode === "split" ? "default" : "ghost"}
									size="sm"
									onClick={() => onViewModeChange("split")}
									aria-label="Split Mode"
									className="hidden sm:block"
								>
									<SplitIcon className="size-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Split View</p>
							</TooltipContent>
						</Tooltip>
					</div>
				)}
			</div>
		</div>
	);
};
