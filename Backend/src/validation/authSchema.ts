import { z } from "zod";

export const emailOnlySchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export type EmailOnlySchemaType = z.infer<typeof emailOnlySchema>;
