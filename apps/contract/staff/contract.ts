import { initContract } from "@ts-rest/core";
import { PaginationQuerySchema, SuccessSchema } from "contract/common";
import { RestaurantStaffRole } from "contract/enum";
import { RestaurantStaffSchema } from "contract/lead/type";
import { createPaginatedResponseSchema } from "contract/utils";
import { z } from "zod";

const c = initContract();

export const staffContract = c.router(
  {
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
  },
  {
    pathPrefix: "/staff",
  }
);
