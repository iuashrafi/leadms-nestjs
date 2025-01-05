import { initContract } from "@ts-rest/core";
import { PaginationQuerySchema, SuccessSchema } from "../common";
import { z } from "zod";
import {
  CreateLeadSchema,
  DashboardResponseSchema,
  ReastaurantLeadListSchema,
  RestaurantLeadSchema,
  // RestaurantStaffSchema,
} from "./type";
import {} from // RestaurantInteractionType,
// RestaurantStaffRole,
"../enum";
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
      query: PaginationQuerySchema.extend({
        searchText: z.string().optional(),
        pageNumber: z.string().transform(Number),
        pageSize: z.string().transform(Number),
        roles: z
          .string()
          .transform((val) => val.split(","))
          .optional(),
      }),
      responses: {
        200: createPaginatedResponseSchema(RestaurantLeadSchema),
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
  },
  {
    pathPrefix: "/lead",
  }
);
