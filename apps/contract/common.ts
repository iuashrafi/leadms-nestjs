import { z } from "zod";

export const SuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
