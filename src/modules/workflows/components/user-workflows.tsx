"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  Clock,
  DeleteIcon,
  InboxIcon,
  MoreVerticalIcon,
  ShuffleIcon,
} from "lucide-react";
import CreateWorkFlowDialog from "./create-workflow-dialog";
import React, { useState } from "react";
import { Workflow } from "@/generated/prisma";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkflowStaus } from "../enums";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "@/components/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteWorkflowDialog from "./delete-workflow-dialog";

export function UserWorkflowsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card
          key={i}
          className="border-gray-200 shadow-sm rounded-xl"
        >
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function UserWorkflows() {
  const trpc = useTRPC();
  const workflows = useSuspenseQuery(
    trpc.workflows.listUserWorkflows.queryOptions()
  );

  if (workflows.data.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-gray-100 w-24 h-24 flex items-center justify-center">
          <InboxIcon size={48} className="text-gray-400" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p className="text-lg font-semibold">
            No workflows created yet
          </p>
          <p className="text-sm text-gray-500">
            Get started by creating your first workflow.
          </p>
        </div>
        <CreateWorkFlowDialog text="Create your first workflow" />
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-gray-500">Manage your workflows.</p>
        </div>
        <CreateWorkFlowDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.data.map((workflow) => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>
    </React.Fragment>
  );
}

interface WorkflowCardProps {
  workflow: Workflow;
}
function WorkflowCard({ workflow }: WorkflowCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isDraft = workflow.status === WorkflowStaus.DRAFT;

  console.log(showDeleteDialog);

  return (
    <Card className="border-gray-200 shadow-sm rounded-xl flex flex-col h-full hover:shadow-md transition-shadow duration-200 group relative">
      <div className="absolute top-3 right-3 z-10 space-x-1">
        <TooltipWrapper content={<p>Edit Workflow</p>}>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/workflows/${workflow.id}/editor`}>
              <ShuffleIcon />
            </Link>
          </Button>
        </TooltipWrapper>
        <DeleteWorkflowDialog
          open={showDeleteDialog}
          workflowName={workflow.name}
          setOpen={setShowDeleteDialog}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="px-0">
              <TooltipWrapper content={<p>More Actions...</p>}>
                <div className="w-full h-full flex items-center justify-center px-2 cursor-pointer">
                  <MoreVerticalIcon />
                </div>
              </TooltipWrapper>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog((d) => !d)}
              >
                <DeleteIcon />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent className="flex-grow">
        <CardTitle className="text-lg font-semibold hover:underline">
          <Link href={`/workflows/${workflow.id}`}>
            {workflow.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {workflow.description || "No description provided."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-gray-500">
        <div
          className={cn(
            "flex items-center gap-1.5",
            isDraft ? "text-gray-500" : "text-green-600"
          )}
        >
          {isDraft ? (
            <Clock className="h-3.5 w-3.5" />
          ) : (
            <CheckCircle className="h-3.5 w-3.5" />
          )}
          <span className="font-medium">
            {isDraft ? "Draft" : "Active"}
          </span>
        </div>
        <p>
          {formatDistanceToNow(new Date(workflow.updatedAt), {
            addSuffix: true,
          })}
        </p>
      </CardFooter>
    </Card>
  );
}
