import { EntityManager, wrap } from '@mikro-orm/postgresql';
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
    const [restaurantsCount, restaurantStaffsCount, restaurantInteractions] =
      await Promise.all([
        this.em.count(RestaurantLead, {}),
        this.em.count(RestaurantStaff, {}),
        this.em.count(RestaurantInteraction, {}),
      ]);

    return [
      {
        title: 'Restaurants',
        link: '/leads',
        itemsCount: restaurantsCount,
      },
      {
        title: 'Staffs',
        link: '/staffs',
        itemsCount: restaurantStaffsCount,
      },
      {
        title: 'Interaction',
        link: '/',
        itemsCount: restaurantInteractions,
      },
    ];
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
    const { searchText } = query;

    let sqlQuery = `select r.id, r.name, r.address, r.assigned_kam, r.contact_number, r.restaurant_lead_status
                    from restaurant_lead r
                    where 1=1`;

    if (searchText?.trim().length > 0) {
      sqlQuery += ` and ( r.name ilike '%${searchText}%' or
                          r.address ilike '%${searchText}%' or 
                          r.assigned_kam ilike '%${searchText}%' or
                          r.contact_number ilike '%${searchText}%' or 
                          r.restaurant_lead_status ilike '%${searchText}%' ) `;
    }

    sqlQuery += ` order by r.created_at `;

    try {
      const leads = await this.em.getKnex().raw(sqlQuery);
      // console.log('leads rows= ', leads.rows);

      return leads.rows.map((lead) => ({
        id: lead.id,
        restaurantName: lead.name,
        address: lead.address,
        contactNumber: lead.contact_number,
        restaurantLeadStatus: lead.restaurant_lead_status,
        assignedKAM: lead.assigned_kam,
      }));
    } catch (error) {
      console.error('[Search Error] Error while searching, ', error);
      return [];
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
    const { searchText, roles } = query;

    let sqlQuery = `select  s.id, s.name, s.contact_number, s.email, s.role, s.restaurant_lead_id, rl.name from restaurant_staff s
              join restaurant_lead rl on s.restaurant_lead_id = rl.id
                    where 1=1`;

    if (searchText?.trim().length > 0) {
      sqlQuery += ` and ( s.name ilike '%${searchText}%' or
                          rl.name ilike '%${searchText}%' ) `;
    }

    if (roles && roles.length > 0) {
      const rolesFilters = roles
        .map((r) => ` s.role ilike '%${r}%' `)
        .join(' or ');

      sqlQuery += ` and (${rolesFilters})`;
    }

    sqlQuery += ` order by s.created_at `;

    // const staffs = await this.em.find(
    //   RestaurantStaff,
    //   {},
    //   {
    //     populate: ['restaurantLead'],
    //     fields: [
    //       'id',
    //       'name',
    //       'role',
    //       'contactNumber',
    //       'email',
    //       'restaurantLead.name',
    //     ],
    //   },
    // );

    const staffs = await this.em.getKnex().raw(sqlQuery);
    return staffs.rows.map((staff) => ({
      id: staff.id,
      name: staff.name,
      role: staff.role,
      contactNumber: staff.contact_number,
      email: staff.email,
      // lead: staff.restaurantLead,
    }));
  }
}
