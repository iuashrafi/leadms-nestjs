import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { PostSchema } from "./types";

const c = initContract();

export const postContract = c.router({
  createPost: {
    method: "POST",
    path: "/posts",
    responses: {
      201: PostSchema,
    },
    body: z.object({
      title: z.string(),
      body: z.string(),
    }),
    summary: "Create a post",
  },
});
