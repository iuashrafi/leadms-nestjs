import { Controller } from '@nestjs/common';
import { StaffService } from './staff.service';
import { contract } from 'contract';
import {
  nestControllerContract,
  NestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { createPaginatedResponse } from 'contract/utils';

export const staffContractController: NestControllerContract<
  typeof contract.staff
> = nestControllerContract(contract.staff);
export type StaffRequestShapes = NestRequestShapes<
  typeof staffContractController
>;

@Controller()
export class StaffController
  implements NestControllerInterface<typeof staffContractController>
{
  constructor(private readonly staffService: StaffService) {}

  @TsRest(staffContractController.createRestaurantStaff)
  async createRestaurantStaff(
    @TsRestRequest() { body }: StaffRequestShapes['createRestaurantStaff'],
  ) {
    await this.staffService.createRestaurantStaff(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully created a Restaurant Staff.',
      },
    };
  }

  @TsRest(staffContractController.getAllStaffs)
  async getAllStaffs(
    @TsRestRequest() { query }: StaffRequestShapes['getAllStaffs'],
  ) {
    const { data, total } = await this.staffService.getAllStaffs(query);
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

  @TsRest(staffContractController.updateStaff)
  async updateStaff(
    @TsRestRequest() { body }: StaffRequestShapes['updateStaff'],
  ) {
    await this.staffService.updateStaff(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully updated staff',
      },
    };
  }

  @TsRest(staffContractController.deleteStaff)
  async deleteStaff(
    @TsRestRequest() { body }: StaffRequestShapes['deleteStaff'],
  ) {
    await this.staffService.deleteStaff(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Successfully deleted a staff',
      },
    };
  }
}
