import { Injectable } from '@nestjs/common';
import { InteractionRequestShapes } from './interaction.controller';
import { wrap, EntityManager } from '@mikro-orm/postgresql';
import { RestaurantStaff } from '../staff/entities/restaurantStaff.entity';
import { RestaurantInteraction } from './entities/restaurantInteraction.entity';

@Injectable()
export class InteractionService {
  constructor(private readonly em: EntityManager) {}

  async createInteraction(
    body: InteractionRequestShapes['createInteraction']['body'],
  ) {
    const { staffId, interactionDate, followUp, type, notes } = body;
    const staff = await this.em.findOneOrFail(RestaurantStaff, {
      id: staffId,
    });

    const interaction = new RestaurantInteraction({
      interactionDate,
      interactionType: type,
      followUp,
      notes: notes ?? null,
      staff,
    });

    await this.em.persistAndFlush(interaction);
  }

  async updateInteraction(
    body: InteractionRequestShapes['updateInteraction']['body'],
  ) {
    const { interactionId, interactionDate, interactionType, notes, followUp } =
      body;
    const interaction = await this.em.findOneOrFail(RestaurantInteraction, {
      id: interactionId,
    });
    wrap(interaction).assign({
      interactionDate,
      interactionType,
      notes,
      followUp,
    });
    await this.em.flush();
  }

  async deleteInteraction(
    body: InteractionRequestShapes['deleteInteraction']['body'],
  ) {
    const { interactionId } = body;
    const interaction = await this.em.findOneOrFail(RestaurantInteraction, {
      id: interactionId,
    });
    await this.em.removeAndFlush(interaction);
  }

  async getAllInteractions(
    query: InteractionRequestShapes['getAllInteractions']['query'],
  ) {
    const {
      pageNumber,
      pageSize,
      searchText,
      roles: interactionTypes,
      staffId,
      leadId,
    } = query;

    let sqlQuery = `select ri.id, rs.name, ri.created_at, ri.follow_up, ri.notes, rs.id as staff_id, rl.id as lead_id, rl.name as lead_name,
                               ri.interaction_type, ri.interaction_date 
            from restaurant_interaction ri
            join restaurant_staff rs on ri.staff_id = rs.id
            join restaurant_lead rl on rs.restaurant_lead_id = rl.id
            where 1=1
          `;

    let countQuery = `select count(*) as total 
            from restaurant_interaction ri
            join restaurant_staff rs on ri.staff_id = rs.id
            join restaurant_lead rl on rs.restaurant_lead_id = rl.id
            where 1=1`;

    if (searchText?.trim().length > 0) {
      const filter = `
          and(
            rs.name ILIKE '%${searchText}%' OR
            ri.notes ILIKE '%${searchText}%' OR
            rl.name ILIKE '%${searchText}%'
          )
          `;
      sqlQuery += filter;
      countQuery += filter;
    }

    if (interactionTypes && interactionTypes.length > 0) {
      const interactionTypesFilters = interactionTypes
        .map((r) => `ri.interaction_type = '${r}'`)
        .join(' OR ');

      const interactionTypesCondition = ` and (${interactionTypesFilters}) `;
      sqlQuery += interactionTypesCondition;
      countQuery += interactionTypesCondition;
    }

    if (staffId) {
      const staffFilter = ` and ri.staff_id = ${staffId}`;
      sqlQuery += staffFilter;
      countQuery += staffFilter;
    }

    if (leadId) {
      console.log('filter by leadid =  ', leadId);
      const leadFilter = ` and rl.id = ${leadId}`;
      sqlQuery += leadFilter;
      countQuery += leadFilter;
    }

    const offset = (pageNumber - 1) * pageSize;
    sqlQuery += ` order by ri.created_at desc
                      limit ${pageSize}
                      offset ${offset}
                    `;

    try {
      const [interactionsResult, countResult] = await Promise.all([
        this.em.getKnex().raw(sqlQuery),
        this.em.getKnex().raw(countQuery),
      ]);
      const interactions = interactionsResult.rows;
      const total = parseInt(countResult.rows[0].total, 10);

      return {
        data: interactions.map((interaction) => ({
          id: interaction.id,
          staffName: interaction.name,
          notes: interaction.notes,
          leadId: interaction.lead_id,
          leadName: interaction.lead_name,
          staffId: interaction.staff_id,
          followUp: interaction.follow_up,
          interactionType: interaction.interaction_type,
          interactionDate: interaction.interaction_date,
        })),
        total,
      };
    } catch (error) {
      console.log(
        '[Interactions] Error while searching in interactions: ',
        error,
      );
      return {
        data: [],
        total: 0,
      };
    }
  }
}
