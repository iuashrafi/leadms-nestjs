import { initContract } from "@ts-rest/core";
import { SuccessSchema } from "contract/common";
import { z } from "zod";
import { CreateLeadSchema, RestaurantLeadSchema } from "./type";
import { RestaurantStaffRole } from "contract/enum";

const c = initContract();

export const leadContract = c.router(
  {
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
  },
  {
    pathPrefix: "/lead",
  }
);
