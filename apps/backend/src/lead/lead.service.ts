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

  async getAllLeads() {
    const leads = await this.em.find(RestaurantLead, {});

    return leads;
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

  async getAllStaffs() {
    const staffs = await this.em.find(
      RestaurantStaff,
      {},
      {
        populate: ['restaurantLead'],
        fields: [
          'id',
          'name',
          'role',
          'contactNumber',
          'email',
          'restaurantLead.name',
        ],
      },
    );
    return staffs.map((staff) => ({
      id: staff.id,
      name: staff.name,
      role: staff.role,
      contactNumber: staff.contactNumber,
      email: staff.email,
      lead: staff.restaurantLead,
    }));
  }
}
