import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Layers2Icon, Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "../schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  text?: string;
}

export default function CreateWorkFlowDialog({ text }: Props) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: function (data) {
        toast.success("Workflow Created!", {
          id: "create-workflow",
        });
        void queryClient.invalidateQueries(
          trpc.workflows.listUserWorkflows.queryOptions()
        );
        router.push(`/workflows/${data.id}`);
      },
      onError: function () {
        toast.error("Failed to create workflow.", {
          id: "create-workflow",
        });
      },
    })
  );

  useEffect(
    function () {
      if (isPending) {
        toast.loading("Creating Wrokflow...", {
          id: "create-workflow",
        });
      }
    },
    [isPending]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{text ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={() => <Layers2Icon />}
          title="Create workflow"
          subtitle="Start building your workflow"
        />
        <Separator />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit((data) => mutate(data))}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-rose-500">*</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        autoCapitalize="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a breif description of what your
                      workflow does. <br /> This is optional but can
                      help you remember the workflow&apos;s purpose.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full"
              >
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Proceed"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
