import { Controller } from '@nestjs/common';
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
import { InteractionService } from './interaction.service';

export const interactionContractController: NestControllerContract<
  typeof contract.interaction
> = nestControllerContract(contract.interaction);
export type InteractionRequestShapes = NestRequestShapes<
  typeof interactionContractController
>;

@Controller('interaction')
export class InteractionController
  implements NestControllerInterface<typeof interactionContractController>
{
  constructor(private readonly interactionService: InteractionService) {}

  @TsRest(interactionContractController.createInteraction)
  async createInteraction(
    @TsRestRequest() { body }: InteractionRequestShapes['createInteraction'],
  ) {
    await this.interactionService.createInteraction(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Interaction added.',
      },
    };
  }

  @TsRest(interactionContractController.updateInteraction)
  async updateInteraction(
    @TsRestRequest() { body }: InteractionRequestShapes['updateInteraction'],
  ) {
    await this.interactionService.updateInteraction(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Interaction updated.',
      },
    };
  }

  @TsRest(interactionContractController.deleteInteraction)
  async deleteInteraction(
    @TsRestRequest() { body }: InteractionRequestShapes['deleteInteraction'],
  ) {
    await this.interactionService.deleteInteraction(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Interaction deleted.',
      },
    };
  }

  @TsRest(interactionContractController.getAllInteractions)
  async getAllInteractions(
    @TsRestRequest() { query }: InteractionRequestShapes['getAllInteractions'],
  ) {
    const { data, total } =
      await this.interactionService.getAllInteractions(query);
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
}
