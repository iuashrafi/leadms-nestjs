import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { LeadRequestShapes } from './lead.controller';
import { Injectable } from '@nestjs/common';
import { RestaurantLead } from './entities/restaurantLead.entity';
import { RestaurantStaff } from './entities/restaurantStaff.entity';
import { RestaurantInteraction } from './entities/restaurantInteraction.entity';
import { title } from 'process';

@Injectable()
export class LeadService {
  constructor(private readonly em: EntityManager) {}

  async getDashboardData() {
    const [restaurantStaffsCount] = await Promise.all([
      this.em.count(RestaurantStaff, {}),
    ]);

    const [restaurants, restaurantsCount] = await this.em.findAndCount(
      RestaurantLead,
      {},
      {
        limit: 5,
        orderBy: { createdAt: QueryOrder.DESC },
      },
    );

    const [interactions, interactionsCount] = await this.em.findAndCount(
      RestaurantInteraction,
      {},
      {
        limit: 5,
        orderBy: { createdAt: QueryOrder.DESC },
        populate: ['staff'],
      },
    );

    return {
      dashboardCards: [
        {
          title: 'Total Restaurants',
          subTitle: 'Leads',
          link: '/leads',
          itemsCount: restaurantsCount,
        },
        {
          title: 'Total Staffs',
          subTitle: 'Owners, Managers, Chef, etc',
          link: '/staffs',
          itemsCount: restaurantStaffsCount,
        },
        {
          title: 'Total Interactions',
          subTitle: 'Calls, Visits, Orders etc',
          link: '/',
          itemsCount: interactionsCount,
        },
      ],

      recentRestaurants: restaurants,
      recentInteractions: interactions.map((interaction) => ({
        id: interaction.id,
        staffName: interaction.staff.name,
        staffEmail: interaction.staff.email,
        interactionType: interaction.interactionType,
        interactionDate: interaction.interactionDate,
        notes: interaction.notes,
      })),
    };
  }

  async createLead(body: LeadRequestShapes['createLead']['body']) {
    const {
      restaurantName,
      address,
      contactNumber,
      currentStatus,
      assignedKAM,
    } = body;
    const lead = new RestaurantLead({
      name: restaurantName,
      address,
      contactNumber,
      restaurantLeadStatus: currentStatus,
      assignedKAM,
    });
    await this.em.persistAndFlush(lead);
  }

  async updateLead(body: LeadRequestShapes['updateLead']['body']) {
    const {
      id,
      restaurantName,
      address,
      contactNumber,
      currentStatus,
      assignedKAM,
    } = body;
    const lead = await this.em.findOneOrFail(RestaurantLead, id);
    wrap(lead).assign({
      name: restaurantName,
      address,
      contactNumber,
      restaurantLeadStatus: currentStatus,
      assignedKAM,
    });
    await this.em.flush();
  }

  async getAllLeads(query: LeadRequestShapes['getAllLeads']['query']) {
    const { searchText, pageNumber, pageSize } = query;

    let sqlQuery = `
      SELECT r.id, r.name, r.address, r.assigned_kam, r.contact_number, r.restaurant_lead_status
      FROM restaurant_lead r
      WHERE 1=1
    `;

    let countQuery = `
      SELECT COUNT(*) as total
      FROM restaurant_lead r
      WHERE 1=1
    `;

    if (searchText?.trim().length > 0) {
      const filter = `
        AND (
          r.name ILIKE '%${searchText}%' OR
          r.address ILIKE '%${searchText}%' OR
          r.assigned_kam ILIKE '%${searchText}%' OR
          r.contact_number ILIKE '%${searchText}%' OR
          r.restaurant_lead_status ILIKE '%${searchText}%'
        )
      `;
      sqlQuery += filter;
      countQuery += filter;
    }

    const offset = (pageNumber - 1) * pageSize;
    sqlQuery += `
      ORDER BY r.created_at
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;

    try {
      const leadsPromise = this.em.getKnex().raw(sqlQuery);
      const countPromise = this.em.getKnex().raw(countQuery);

      const [leadsResult, countResult] = await Promise.all([
        leadsPromise,
        countPromise,
      ]);

      const leads = leadsResult.rows;
      const total = parseInt(countResult.rows[0].total, 10);

      return {
        data: leads.map((lead) => ({
          id: lead.id,
          restaurantName: lead.name,
          address: lead.address,
          contactNumber: lead.contact_number,
          restaurantLeadStatus: lead.restaurant_lead_status,
          assignedKAM: lead.assigned_kam,
        })),
        total,
      };
    } catch (error) {
      console.error('[Search Error] Error while searching: ', error);
      return {
        data: [],
        total: 0,
      };
    }
  }

  async getLeadById(id: number) {
    const lead = await this.em.findOneOrFail(
      RestaurantLead,
      { id },
      {
        populate: ['staff'],
      },
    );
    return {
      restaurantName: lead.name,
      address: lead.address,
      contactNumber: lead.contactNumber,
      currentStatus: lead.restaurantLeadStatus,
      assignedKAM: lead.assignedKAM,
      staffs: lead.staff.getItems().map((eachStaff) => ({
        staffId: eachStaff.id,
        staffName: eachStaff.name,
        role: eachStaff.role,
        contactNumber: eachStaff.contactNumber,
        email: eachStaff.email,
      })),
    };
  }

  async deleteLead(id: number) {
    const lead = await this.em.findOneOrFail(RestaurantLead, { id });
    await this.em.remove(lead).flush();
  }

  async createRestaurantStaff(
    body: LeadRequestShapes['createRestaurantStaff']['body'],
  ) {
    const { leadId, name, role, contactNumber, email } = body;

    const restaurantLead = await this.em.findOneOrFail(RestaurantLead, {
      id: leadId,
    });

    const staff = new RestaurantStaff({
      name,
      role,
      contactNumber,
      email,
      restaurantLead,
    });

    await this.em.persistAndFlush(staff);
  }

  async getAllStaffs(query: LeadRequestShapes['getAllStaffs']['query']) {
    const { searchText, roles, pageNumber, pageSize } = query;

    let sqlQuery = `select  s.id, s.name, s.contact_number, s.email, s.role, s.restaurant_lead_id, rl.name from restaurant_staff s
              join restaurant_lead rl on s.restaurant_lead_id = rl.id
                    where 1=1`;

    let countQuery = `
                    SELECT 
                      COUNT(*) as total
                    FROM 
                      restaurant_staff s
                    JOIN 
                      restaurant_lead rl 
                    ON 
                      s.restaurant_lead_id = rl.id
                    WHERE 1=1
                  `;

    if (searchText?.trim().length > 0) {
      const filter = `
                          AND (
                            s.name ILIKE '%${searchText}%' OR
                            rl.name ILIKE '%${searchText}%'
                          )
                        `;
      sqlQuery += filter;
      countQuery += filter;
    }

    if (roles && roles.length > 0) {
      const rolesFilters = roles
        .map((r) => `s.role ILIKE '%${r}%'`)
        .join(' OR ');

      const roleCondition = ` AND (${rolesFilters}) `;
      sqlQuery += roleCondition;
      countQuery += roleCondition;
    }

    const offset = (pageNumber - 1) * pageSize;
    sqlQuery += `
      ORDER BY s.created_at
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;

    try {
      const staffsPromise = this.em.getKnex().raw(sqlQuery);
      const countPromise = this.em.getKnex().raw(countQuery);

      const [staffsResult, countResult] = await Promise.all([
        staffsPromise,
        countPromise,
      ]);

      const staffs = staffsResult.rows;
      const total = parseInt(countResult.rows[0].total, 10);

      return {
        data: staffs.map((staff) => ({
          id: staff.id,
          name: staff.name,
          role: staff.role,
          contactNumber: staff.contact_number,
          email: staff.email,
        })),
        total,
      };
    } catch (error) {
      console.error('[Search Error] Error while fetching staffs: ', error);
      return {
        data: [],
        total: 0,
      };
    }

    // const staffs = await this.em.getKnex().raw(sqlQuery);
    // return staffs.rows.map((staff) => ({
    //   id: staff.id,
    //   name: staff.name,
    //   role: staff.role,
    //   contactNumber: staff.contact_number,
    //   email: staff.email,
    //   // lead: staff.restaurantLead,
    // }));
  }

  async updateStaff(body: LeadRequestShapes['updateStaff']['body']) {
    const { staffId, email, name, role, contactNumber } = body;
    // const restaurantLead = await this.em.findOneOrFail(RestaurantLead, {
    //   id: leadId,
    // });

    const staff = await this.em.findOneOrFail(RestaurantStaff, {
      id: staffId,
      // restaurantLead,
    });

    wrap(staff).assign({
      email,
      name,
      role,
      contactNumber,
    });

    await this.em.flush();
  }

  async deleteStaff(body: LeadRequestShapes['deleteStaff']['body']) {
    const { staffId } = body;
    // const restaurantLead = await this.em.findOneOrFail(RestaurantLead, {
    //   id: leadId,
    // });
    const staff = await this.em.findOneOrFail(RestaurantStaff, {
      id: staffId,
      // restaurantLead,
    });

    // Cascading - Before deleting staff, lets delete all the Interactions with the current staff
    await this.em.nativeDelete(RestaurantInteraction, { staff: staff.id });

    await this.em.removeAndFlush(staff);
  }

  async createInteraction(
    body: LeadRequestShapes['createInteraction']['body'],
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

  async getAllInteractions(
    query: LeadRequestShapes['getAllInteractions']['query'],
  ) {
    const { pageNumber, pageSize } = query;
    const [interactions, total] = await this.em.findAndCount(
      RestaurantInteraction,
      {},
      {
        limit: pageNumber,
        offset: (pageNumber - 1) * pageSize,
      },
    );

    return { data: interactions, total };
  }
}
