import { initContract } from "@ts-rest/core";
import { SuccessSchema } from "../common";
import { z } from "zod";
import {
  CreateLeadSchema,
  DashboardResponseSchema,
  RestaurantLeadSchema,
  RestaurantStaffSchema,
} from "./type";
import { RestaurantInteractionType, RestaurantStaffRole } from "../enum";

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
      query: z.object({
        searchText: z.string().optional(),
      }),
      responses: {
        200: z.array(RestaurantLeadSchema),
      },
    },

    updateLead: {
      method: "PUT",
      path: "/updateLead",
      body: RestaurantLeadSchema,
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
      query: z.object({
        searchText: z.string().optional(),
        roles: z
          .string()
          .transform((val) => val.split(","))
          .optional(),
      }),
      responses: {
        200: RestaurantStaffSchema.array(),
      },
    },

    updateStaff: {
      method: "PUT",
      path: "/updateStaff",
      body: z.object({
        leadId: z.number(),
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
        leadId: z.number(),
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
        leadId: z.number(),
        dateOfInteraction: z.date(),
        type: z.nativeEnum(RestaurantInteractionType),
        notes: z.string().nullable(),
        followUp: z.boolean(),
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
