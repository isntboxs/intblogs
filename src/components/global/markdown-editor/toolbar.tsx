import {
	Bold,
	Code,
	Code2,
	Heading,
	ImageIcon,
	InfoIcon,
	Italic,
	Link,
	List,
	ListOrdered,
	Quote,
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

			<div className="flex items-center gap-2 sm:ml-auto">
				<span className="text-muted-foreground not-sr-only text-sm font-medium sm:sr-only">
					Markdown Editor
				</span>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
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
			</div>
		</div>
	);
};
