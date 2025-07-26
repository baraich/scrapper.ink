import { JSX } from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface Props {
  icon?: () => JSX.Element;
  title?: string;
  subtitle?: string;

  titleClassName?: string;
  subtitleClassName?: string;
}

export default function CustomDialogHeader({
  icon: Icon,
  subtitle,
  title,
  subtitleClassName,
  titleClassName,
}: Props) {
  return (
    <DialogHeader className="pt-3">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && <Icon />}
          {title && (
            <p className={cn("text-xl text-primary", titleClassName)}>
              {title}
            </p>
          )}
          {subtitle && (
            <p
              className={cn(
                "text-sm text-muted-foreground",
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </DialogTitle>
    </DialogHeader>
  );
}
