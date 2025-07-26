import z from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().min(1, "Name is required!").max(32),
  description: z.string().max(128).optional(),
});
export type createWorkflowSchemaType = z.infer<
  typeof createWorkflowSchema
>;
