import prismaClient from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../init";
import { createWorkflowSchema } from "@/modules/workflows/schemas";
import { WorkflowStaus } from "@/modules/workflows/enums";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { AppNode, TaskClassification } from "@/modules/nodes/types";
import { Edge } from "@xyflow/react";
import { makeNode } from "@/modules/nodes/lib/make-node";

export const workflowsRouter = createTRPCRouter({
  listUserWorkflows: protectedProcedure.query(async ({ ctx }) => {
    const workflows = prismaClient.workflow.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return workflows ?? [];
  }),
  create: protectedProcedure
    .input(createWorkflowSchema)
    .mutation(async ({ ctx, input }) => {
      const initialWorkflow: { nodes: AppNode[]; edges: Edge[] } = {
        nodes: [makeNode(TaskClassification.LAUNCH_BROWSER)],
        edges: [],
      };

      const result = await prismaClient.workflow.create({
        data: {
          name: input.name,
          userId: ctx.auth.userId,
          status: WorkflowStaus.DRAFT,
          definition: JSON.stringify(initialWorkflow),
          description: input.description,
        },
      });

      return result;
    }),
  delete: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await prismaClient.workflow.delete({
        where: {
          name_userId: {
            name: input.name,
            userId: ctx.auth.userId,
          },
        },
      });
    }),
  listUsingId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const workflow = await prismaClient.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });

      if (!workflow) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Workflow not found!",
        });
      }

      return workflow;
    }),
  updateWorkflowdefinition: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        definition: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prismaClient.workflow.update({
        data: {
          definition: input.definition,
        },
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });
    }),
});
