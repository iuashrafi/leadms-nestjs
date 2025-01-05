import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { LeadRequestShapes } from './lead.controller';
import { Injectable } from '@nestjs/common';
import { RestaurantLead } from './entities/restaurantLead.entity';
import { RestaurantStaff } from '../staff/entities/restaurantStaff.entity';
import { RestaurantInteraction } from 'src/interaction/entities/restaurantInteraction.entity';
import { RestaurantInteractionType } from 'contract/enum';

@Injectable()
export class LeadService {
  constructor(private readonly em: EntityManager) {}

  async getDashboardData() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const [
      restaurantStaffsCount,
      [restaurants, restaurantsCount],
      [interactions, interactionsCount],
      todaysPendingCalls,
    ] = await Promise.all([
      this.em.count(RestaurantStaff, {}),
      this.em.findAndCount(
        RestaurantLead,
        {},
        {
          limit: 5,
          orderBy: { createdAt: QueryOrder.DESC },
        },
      ),
      this.em.findAndCount(
        RestaurantInteraction,
        {},
        {
          limit: 5,
          orderBy: { createdAt: QueryOrder.DESC },
          populate: ['staff'],
        },
      ),
      this.em.find(
        RestaurantInteraction,
        {
          interactionDate: { $gte: startOfDay, $lte: endOfDay },
          interactionType: RestaurantInteractionType.Call,
          followUp: true,
        },
        {
          limit: 5,
          orderBy: { createdAt: QueryOrder.DESC },
          populate: ['staff'],
        },
      ),
    ]);

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
          link: '/logs',
          itemsCount: interactionsCount,
        },
        // {
        //   title: 'Performance',
        //   subTitle: 'Calls, Visits, Orders etc',
        //   link: '/performance',
        //   itemsCount: interactionsCount,
        // },
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

      todaysPendingCalls: todaysPendingCalls.map((interaction) => ({
        id: interaction.id,
        staffName: interaction.staff.name,
        staffContact: interaction.staff.contactNumber,
        staffEmail: interaction.staff.email,
        interactionDate: interaction.interactionDate,
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
    const { searchText, pageNumber, pageSize, roles: leadStatus } = query;

    let sqlQuery = `
      SELECT 
        r.id, 
        r.name, 
        r.address, 
        r.assigned_kam, 
        r.contact_number, 
        r.restaurant_lead_status,
        COALESCE(staff_counts.staff_count, 0) as staffs_count
      FROM 
        restaurant_lead r
      LEFT JOIN (
        SELECT 
          rs.restaurant_lead_id, 
          COUNT(*) as staff_count
        FROM 
          restaurant_staff rs
        GROUP BY 
          rs.restaurant_lead_id
      ) staff_counts
      ON r.id = staff_counts.restaurant_lead_id
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

    if (leadStatus && leadStatus.length > 0) {
      const leadStatusFilters = leadStatus
        .map((r) => `r.restaurant_lead_status = '${r}'`)
        .join(' OR ');

      const leadStatusCondition = ` AND (${leadStatusFilters}) `;
      sqlQuery += leadStatusCondition;
      countQuery += leadStatusCondition;
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
          staffsCount: lead.staffs_count,
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
    const lead = await this.em.findOneOrFail(
      RestaurantLead,
      { id },
      {
        populate: ['staff', 'staff.interactions'],
      },
    );
    await this.em.remove(lead).flush();
  }
}
