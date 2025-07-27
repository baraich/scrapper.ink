"use client";
import TooltipWrapper from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { SaveIcon } from "lucide-react";
import { toast } from "sonner";

interface Props {
  workflowId: string;
}

export default function BottomBar({ workflowId }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const workflow = useSuspenseQuery(
    trpc.workflows.listUsingId.queryOptions({ id: workflowId })
  );
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation(
    trpc.workflows.updateWorkflowdefinition.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow saved!", { id: "save-workflow" });
        void queryClient.invalidateQueries(
          trpc.workflows.listUsingId.queryOptions({ id: workflowId })
        );
      },
      onError: () => {
        toast.error("Failed to save workflow!", {
          id: "save-workflow",
        });
      },
    })
  );

  const saveWorkflow = function () {
    toast.loading("Saving workflow", { id: "save-workflow" });
    mutate({
      id: workflowId,
      definition: JSON.stringify(toObject()),
    });
  };

  return (
    <div className="w-full border-t flex items-center justify-between p-4 px-4 gap-6">
      <div className="flex">
        <div className="w-full">
          <h3>{workflow.data.name}</h3>
          <span className="line-clamp-1">
            {workflow.data.description}
          </span>
        </div>
      </div>
      <div>
        <Button
          disabled={isPending}
          onClick={saveWorkflow}
          variant={"outline"}
          className="px-0"
        >
          <TooltipWrapper content={<p>Save workflow</p>}>
            <div className="flex items-center justify-center w-full h-full px-3">
              <SaveIcon />
            </div>
          </TooltipWrapper>
        </Button>
      </div>
    </div>
  );
}
