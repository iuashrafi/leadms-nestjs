import { initContract } from "@ts-rest/core";
import { leadContract } from "./lead/contract";

const c = initContract();

export const contract = c.router({
  lead: leadContract,
});
