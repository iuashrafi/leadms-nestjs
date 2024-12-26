import { z } from "zod";

export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) {
  return z.object({
    currentPageNumber: z.number(),
    currentPageSize: z.number(),
    totalItems: z.number(),
    totalPages: z.number(),
    results: z.array(itemSchema),
  });
}

export function createPaginatedResponse<T>({
  results,
  pageNumber,
  totalCount,
  pageSize,
}: {
  results: T[];
  pageNumber: number;
  totalCount: number;
  pageSize: number;
}) {
  return {
    currentPageNumber: pageNumber,
    currentPageSize: results.length,
    totalItems: totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    results,
  };
}
