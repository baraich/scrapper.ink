import NodesListing from "@/modules/nodes/components/nodes-listing";
import BottomBar from "@/modules/workflows/components/bottom-bar";
import Editor from "@/modules/workflows/components/editor";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { ReactFlowProvider } from "@xyflow/react";

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

  return (
    <ReactFlowProvider>
      <div className="flex-col w-full h-full items-center flex justify-between">
        <div className="w-full h-full flex">
          <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r border-separate p-2 px-4 overflow-auto">
            <NodesListing />
          </aside>
          <Editor workflowId={workflowId} />
        </div>
        <BottomBar workflowId={workflowId} />
      </div>
    </ReactFlowProvider>
  );
}
