import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { RestaurantStaffRole } from 'contract/enum';
import { BaseEntity } from 'src/base.entity';
import { RestaurantLead } from './restaurantLead.entity';

@Entity()
export class RestaurantStaff extends BaseEntity {
  @Property()
  name: string;

  @Enum({ items: () => RestaurantStaffRole })
  role: RestaurantStaffRole;

  @Property()
  contactNumber: string;

  @Property()
  email: string;

  @ManyToOne(() => RestaurantLead)
  restaurantLead: RestaurantLead;

  constructor({
    name,
    role,
    contactNumber,
    email,
    restaurantLead,
  }: {
    name: string;
    role: RestaurantStaffRole;
    contactNumber: string;
    email: string;
    restaurantLead: RestaurantLead;
  }) {
    super();
    this.name = name;
    this.role = role;
    this.contactNumber = contactNumber;
    this.email = email;
    this.restaurantLead = restaurantLead;
  }
}
