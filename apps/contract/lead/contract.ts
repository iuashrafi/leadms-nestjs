import { initContract } from "@ts-rest/core";
import { SuccessSchema } from "contract/common";
import { z } from "zod";

const c = initContract();

export const leadContract = c.router({
  createLead: {
    method: "POST",
    path: "/createLead",
    body: z.object({
      name: z.string(),
      body: z.string(),
    }),
    responses: {
      201: SuccessSchema,
    },
  },
});
