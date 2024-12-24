import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { LeadRequestShapes } from './lead.controller';
import { Injectable } from '@nestjs/common';
import { RestaurantLead } from './entities/restaurantLead.entity';
import { RestaurantStaff } from './entities/restaurantStaff.entity';

@Injectable()
export class LeadService {
  constructor(private readonly em: EntityManager) {}
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

  async getAllLeads() {
    const leads = await this.em.find(RestaurantLead, {});

    return leads;
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
}
