import { contract } from 'contract';
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
import { createPaginatedResponse } from 'contract/utils';

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

  @TsRest(leadContractController.getDashboardData)
  async getDashboardData() {
    const results = await this.leadService.getDashboardData();
    return {
      status: 200 as const,
      body: results,
    };
  }

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
  async getAllLeads(
    @TsRestRequest() { query }: LeadRequestShapes['getAllLeads'],
  ) {
    const { data, total } = await this.leadService.getAllLeads(query);
    return {
      status: 200 as const,
      body: createPaginatedResponse({
        results: data,
        totalCount: total,
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
      }),
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

  @TsRest(leadContractController.deleteLead)
  async deleteLead(@TsRestRequest() { body }: LeadRequestShapes['deleteLead']) {
    await this.leadService.deleteLead(body.id);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Lead deleted successfully',
      },
    };
  }
}
