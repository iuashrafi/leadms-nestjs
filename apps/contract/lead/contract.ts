import { initContract } from "@ts-rest/core";
import { PaginationQuerySchema, SuccessSchema } from "../common";
import { z } from "zod";
import {
  CreateLeadSchema,
  DashboardResponseSchema,
  RestaurantLeadSchema,
  RestaurantStaffSchema,
} from "./type";
import { RestaurantInteractionType, RestaurantStaffRole } from "../enum";
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

    createRestaurantStaff: {
      method: "POST",
      path: "/createRestaurantStaff",
      body: z.object({
        leadId: z.number(),
        name: z.string(),
        role: z.nativeEnum(RestaurantStaffRole),
        contactNumber: z.string(),
        email: z.string(),
      }),
      responses: {
        201: SuccessSchema,
      },
    },

    getLeadById: {
      method: "GET",
      path: "/getLeadById",
      query: z.object({
        id: z.string().transform(Number),
      }),
      responses: {
        200: RestaurantLeadSchema.extend({
          staffs: z.array(
            z.object({
              staffId: z.number(),
              staffName: z.string(),
              role: z.nativeEnum(RestaurantStaffRole),
              contactNumber: z.string(),
              email: z.string(),
            })
          ),
        }),
      },
    },

    getAllStaffs: {
      method: "GET",
      path: "/getAllStaffs",
      query: PaginationQuerySchema.extend({
        searchText: z.string().optional(),
        roles: z
          .string()
          .transform((val) => val.split(","))
          .optional(),
      }),
      responses: {
        200: createPaginatedResponseSchema(RestaurantStaffSchema),
      },
    },

    updateStaff: {
      method: "PUT",
      path: "/updateStaff",
      body: z.object({
        staffId: z.number(),
        name: z.string(),
        role: z.nativeEnum(RestaurantStaffRole),
        contactNumber: z.string(),
        email: z.string(),
      }),
      responses: {
        200: SuccessSchema,
      },
    },

    deleteStaff: {
      method: "DELETE",
      path: "/deleteStaff",
      body: z.object({
        staffId: z.number(),
        // leadId: z.number(),
      }),
      responses: {
        200: SuccessSchema,
      },
    },

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
    pathPrefix: "/lead",
  }
);
