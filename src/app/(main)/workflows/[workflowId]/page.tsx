import Editor from "@/modules/workflows/components/editor";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

interface Props {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function WorkflowEditor({ params }: Props) {
  const { workflowId } = await params;
  const queryClient = getQueryClient();

  const { userId } = await auth();
  if (!userId) {
    return <div>Unauthorized!</div>;
  }

  void queryClient.prefetchQuery(
    trpc.workflows.listUsingId.queryOptions({ id: workflowId })
  );

  return <Editor workflowId={workflowId} />;
}
