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
    const leads = await this.leadService.getAllLeads(query);
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

  /**
   * APIs related to Restaurant Staffs
   */

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

  @TsRest(leadContractController.getAllStaffs)
  async getAllStaffs(
    @TsRestRequest() { query }: LeadRequestShapes['getAllLeads'],
  ) {
    const staffs = await this.leadService.getAllStaffs(query);
    return {
      status: 200 as const,
      body: staffs,
    };
  }

  @TsRest(leadContractController.updateStaff)
  async updateStaff(
    @TsRestRequest() { body }: LeadRequestShapes['updateStaff'],
  ) {
    await this.leadService.updateStaff(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully updated staff',
      },
    };
  }

  @TsRest(leadContractController.deleteStaff)
  async deleteStaff(
    @TsRestRequest() { body }: LeadRequestShapes['deleteStaff'],
  ) {
    await this.leadService.deleteStaff(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully deleted a staff',
      },
    };
  }

  @TsRest(leadContractController.createInteraction)
  async createInteraction(
    @TsRestRequest() { body }: LeadRequestShapes['createInteraction'],
  ) {
    await this.leadService.createInteraction(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Interaction added.',
      },
    };
  }
}
