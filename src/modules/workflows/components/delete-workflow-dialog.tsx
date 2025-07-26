"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  workflowName: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteWorkflowDialog({
  open,
  workflowName,
  setOpen,
}: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    trpc.workflows.delete.mutationOptions({
      onSuccess: () => {
        toast.success(
          `'${workflowName.substring(0, 9)}...' deleted!`,
          { id: workflowName }
        );
        void queryClient.invalidateQueries(
          trpc.workflows.listUserWorkflows.queryOptions()
        );
        setOpen(false);
      },
      onError: () => {
        toast.error(`Failed to delete workflow`, {
          id: workflowName,
        });
        void queryClient.invalidateQueries(
          trpc.workflows.listUserWorkflows.queryOptions()
        );
      },
    })
  );

  const [confirmText, setConfirmText] = useState("");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              If you delete this workflow, you will not be able to
              recover it.
            </span>
            <span className="flex-col w-full inline-flex gap-4">
              <span>
                If your are sure, enter <b>{workflowName}</b> to
                continue:
              </span>
              <Input
                value={confirmText}
                className="text-sm w-full"
                placeholder={workflowName}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              toast.loading("Deleting workflow...", {
                id: workflowName,
              });
              mutate({ name: workflowName });
              setConfirmText("");
            }}
            className="bg-destructive hover:bg-destructive/90"
            disabled={confirmText !== workflowName}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
