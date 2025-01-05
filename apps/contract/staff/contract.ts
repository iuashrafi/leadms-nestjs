import { initContract } from "@ts-rest/core";
import { SearchQuerySchema, SuccessSchema } from "contract/common";
import { RestaurantStaffSchema } from "contract/lead/type";
import { createPaginatedResponseSchema } from "contract/utils";
import { z } from "zod";
import {
  CreateRestaurantStaffSchema,
  UpdateRestaurantStaffSchema,
} from "./type";

const c = initContract();

export const staffContract = c.router(
  {
    createRestaurantStaff: {
      method: "POST",
      path: "/createRestaurantStaff",
      body: CreateRestaurantStaffSchema,
      responses: {
        201: SuccessSchema,
      },
    },

    getAllStaffs: {
      method: "GET",
      path: "/getAllStaffs",
      query: SearchQuerySchema,
      responses: {
        200: createPaginatedResponseSchema(RestaurantStaffSchema),
      },
    },

    updateStaff: {
      method: "PUT",
      path: "/updateStaff",
      body: UpdateRestaurantStaffSchema,
      responses: {
        200: SuccessSchema,
      },
    },

    deleteStaff: {
      method: "DELETE",
      path: "/deleteStaff",
      body: z.object({
        staffId: z.number(),
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
