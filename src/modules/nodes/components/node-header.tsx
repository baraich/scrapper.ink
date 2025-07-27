import { Badge } from "@/components/ui/badge";
import { GripVerticalIcon } from "lucide-react";

interface Props {
  label: string;
  isTrigger: boolean;
}

export default function NodeHeader({ isTrigger, label }: Props) {
  return (
    <div className="w-full bg-background p-4 flex items-center justify-between">
      <div>
        <span className="uppercase text-primary/90">{label}</span>
      </div>
      <div className="flex gap-2">
        {isTrigger && (
          <Badge className="rounded-xs" variant={"default"}>
            Trigger
          </Badge>
        )}
        <div className="bg-muted px-0.5 cursor-grab">
          <GripVerticalIcon className="py-1 text-gray-500 drag-handle__custom" />
        </div>
      </div>
    </div>
  );
}
