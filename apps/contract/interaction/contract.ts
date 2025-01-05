import { initContract } from "@ts-rest/core";
import { PaginationQuerySchema, SuccessSchema } from "contract/common";
import { RestaurantInteractionType } from "contract/enum";
import { createPaginatedResponseSchema } from "contract/utils";
import { z } from "zod";

const c = initContract();

export const interactionContract = c.router(
  {
    createInteraction: {
      method: "POST",
      path: "/createInteraction",
      body: z.object({
        staffId: z.number(),
        interactionDate: z.string().transform((val) => new Date(val)),
        type: z.nativeEnum(RestaurantInteractionType),
        notes: z.string().nullable(),
        followUp: z.boolean(),
      }),
      responses: {
        200: SuccessSchema,
      },
    },

    updateInteraction: {
      method: "PUT",
      path: "/updateInteraction",
      body: z.object({
        interactionId: z.number(),
        interactionDate: z.string().transform((val) => new Date(val)),
        interactionType: z.nativeEnum(RestaurantInteractionType),
        notes: z.string().nullable(),
        followUp: z.boolean(),
      }),
      responses: {
        200: SuccessSchema,
      },
    },

    deleteInteraction: {
      method: "DELETE",
      path: "/deleteInteraction",
      body: z.object({
        interactionId: z.number(),
      }),
      responses: {
        200: SuccessSchema,
      },
    },

    getAllInteractions: {
      method: "GET",
      path: "/getAllInteractions",
      query: PaginationQuerySchema.extend({
        searchText: z.string().optional(),
        roles: z
          .string()
          .transform((val) => val.split(","))
          .optional(),
      }),
      responses: {
        200: createPaginatedResponseSchema(
          z.object({
            id: z.number(),
            staffName: z.string(),
            leadId: z.number(),
            leadName: z.string(),
            staffId: z.number(),
            interactionType: z.nativeEnum(RestaurantInteractionType),
            notes: z.string(),
            interactionDate: z.date(),
            followUp: z.boolean(),
          })
        ),
      },
    },
  },
  {
    pathPrefix: "/interaction",
  }
);
