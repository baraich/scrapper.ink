import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}
export default function TooltipWrapper({
  children,
  content,
  side,
}: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className="bg-primary text-primary-foreground border rounded-md p-2 text-xs capitalize"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
