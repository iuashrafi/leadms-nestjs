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

  @TsRest(leadContractController.updateLead)
  async updateLead(@TsRestRequest() { body }: LeadRequestShapes['updateLead']) {
    await this.leadService.updateLead(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully updated a Lead.',
      },
    };
  }

  @TsRest(leadContractController.getAllLeads)
  async getAllLeads() {
    const leads = await this.leadService.getAllLeads();
    return {
      status: 200 as const,
      body: leads,
    };
  }

  @TsRest(leadContractController.getLeadById)
  async getLeadById(
    @TsRestRequest() { query }: LeadRequestShapes['getLeadById'],
  ) {
    const lead = await this.leadService.getLeadById(query.id);
    return {
      status: 200 as const,
      body: lead,
    };
  }

  @TsRest(leadContractController.createRestaurantStaff)
  async createRestaurantStaff(
    @TsRestRequest() { body }: LeadRequestShapes['createRestaurantStaff'],
  ) {
    await this.leadService.createRestaurantStaff(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully created a Restaurant Staff.',
      },
    };
  }
}
