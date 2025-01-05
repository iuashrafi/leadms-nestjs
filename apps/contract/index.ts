import { initContract } from "@ts-rest/core";
import { leadContract } from "./lead/contract";
import { staffContract } from "./staff/contract";
import { interactionContract } from "./interaction/contract";

const c = initContract();

export const contract = c.router({
  lead: leadContract,
  staff: staffContract,
  interaction: interactionContract,
});
