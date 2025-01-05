import { wrap, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { StaffRequestShapes } from './staff.controller';
import { RestaurantLead } from 'src/lead/entities/restaurantLead.entity';
import { RestaurantStaff } from 'src/staff/entities/restaurantStaff.entity';
import { RestaurantInteraction } from 'src/interaction/entities/restaurantInteraction.entity';

@Injectable()
export class StaffService {
  constructor(private readonly em: EntityManager) {}

  async createRestaurantStaff(
    body: StaffRequestShapes['createRestaurantStaff']['body'],
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

  async getAllStaffs(query: StaffRequestShapes['getAllStaffs']['query']) {
    const { searchText, roles, pageNumber, pageSize } = query;

    let sqlQuery = `select  s.id, s.name as staff_name, s.contact_number, s.email, s.role, s.restaurant_lead_id,
                            rl.name as lead_name  from restaurant_staff s
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
          name: staff.staff_name,
          leadName: staff.lead_name,
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

  async updateStaff(body: StaffRequestShapes['updateStaff']['body']) {
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

  async deleteStaff(body: StaffRequestShapes['deleteStaff']['body']) {
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
}
