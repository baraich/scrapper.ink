import {
  UserWorkflows,
  UserWorkflowsSkeleton,
} from "@/modules/workflows/components/user-workflows";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

export default function Workflows() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.workflows.listUserWorkflows.queryOptions()
  );

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}
