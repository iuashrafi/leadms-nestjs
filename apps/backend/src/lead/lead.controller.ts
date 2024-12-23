import { contract } from './../../../contract/index';
import { Controller } from '@nestjs/common';
import { LeadService } from './lead.service';
import {
  nestControllerContract,
  NestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';

export const leadContractController: NestControllerContract<
  typeof contract.lead
> = nestControllerContract(contract.lead);
export type LeadRequestShapes = NestRequestShapes<
  typeof leadContractController
>;

@Controller()
export class LeadController
  implements NestControllerInterface<typeof leadContractController>
{
  constructor(private readonly leadService: LeadService) {}

  @TsRest(leadContractController.createLead)
  async createLead(@TsRestRequest() { body }: LeadRequestShapes['createLead']) {
    await this.leadService.createLead(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully created a Lead.',
      },
    };
  }
}
