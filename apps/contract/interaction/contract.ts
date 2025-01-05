import { initContract } from "@ts-rest/core";
import { SearchQuerySchema, SuccessSchema } from "contract/common";
import { createPaginatedResponseSchema } from "contract/utils";
import { z } from "zod";
import {
  CreateInteractionSchema,
  InteractionSchema,
  UpdateInteractionSchema,
} from "./type";

const c = initContract();

export const interactionContract = c.router(
  {
    createInteraction: {
      method: "POST",
      path: "/createInteraction",
      body: CreateInteractionSchema,
      responses: {
        200: SuccessSchema,
      },
    },

    updateInteraction: {
      method: "PUT",
      path: "/updateInteraction",
      body: UpdateInteractionSchema,
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
      query: SearchQuerySchema.extend({
        staffId: z.string().transform(Number).optional(),
      }),
      responses: {
        200: createPaginatedResponseSchema(InteractionSchema),
      },
    },
  },
  {
    pathPrefix: "/interaction",
  }
);
