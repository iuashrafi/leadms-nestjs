import { initContract } from "@ts-rest/core";
import { SuccessSchema, SearchQuerySchema } from "../common";
import { z } from "zod";
import {
  CreateLeadSchema,
  DashboardResponseSchema,
  ReastaurantLeadListSchema,
  RestaurantLeadSchema,
} from "./type";
import { createPaginatedResponseSchema } from "contract/utils";

const c = initContract();

export const leadContract = c.router(
  {
    getDashboardData: {
      method: "GET",
      path: "/getDashboardData",
      responses: {
        200: DashboardResponseSchema,
      },
    },

    createLead: {
      method: "POST",
      path: "/createLead",
      body: CreateLeadSchema,
      responses: {
        201: SuccessSchema,
      },
    },

    getAllLeads: {
      method: "GET",
      path: "/getAllLeads",
      query: SearchQuerySchema,
      responses: {
        200: createPaginatedResponseSchema(RestaurantLeadSchema),
      },
    },

    getLeadById: {
      method: "GET",
      path: "/getLeadById",
      query: z.object({
        id: z.string().transform(Number),
      }),
      responses: {
        200: ReastaurantLeadListSchema,
      },
    },

    updateLead: {
      method: "PUT",
      path: "/updateLead",
      body: RestaurantLeadSchema.omit({
        staffsCount: true,
      }),
      responses: {
        200: SuccessSchema,
      },
    },

    deleteLead: {
      method: "DELETE",
      path: "/deleteLead",
      body: z.object({
        id: z.number(),
      }),
      responses: {
        200: SuccessSchema,
      },
    },
  },
  {
    pathPrefix: "/lead",
  }
);
