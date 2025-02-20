import { z } from "zod";

export const SuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const PaginationQuerySchema = z.object({
  pageNumber: z.string().transform(Number),
  pageSize: z.string().transform(Number),
});

export const SearchQuerySchema = PaginationQuerySchema.extend({
  searchText: z.string().optional(),
  roles: z
    .string()
    .transform((val) => val.split(","))
    .optional(),
});
