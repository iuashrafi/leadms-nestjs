import { initContract } from "@ts-rest/core";
import { postContract } from "./post/contract";

const c = initContract();

export const contract = c.router({
  post: postContract,
});
