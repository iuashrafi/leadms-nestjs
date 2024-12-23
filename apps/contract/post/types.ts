import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});
