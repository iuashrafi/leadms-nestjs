import { EntityManager } from '@mikro-orm/postgresql';
import { LeadRequestShapes } from './lead.controller';
import { Injectable } from '@nestjs/common';
import { RestaurantLead } from './entities/restaurantLead.entity';

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

  async getAllLeads() {
    const leads = await this.em.find(RestaurantLead, {});

    return leads;
  }
}
