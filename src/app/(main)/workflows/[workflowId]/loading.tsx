import { Loader2Icon } from "lucide-react";

export default function WorkflowSkeletion() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2Icon
        size={30}
        className="animate-spin stroke-primary"
      />
    </div>
  );
}
