import {
  Cascade,
  Collection,
  Entity,
  Enum,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/base.entity';
import { RestaurantLeadStatus } from 'contract/enum';
import { RestaurantStaff } from '../../staff/entities/restaurantStaff.entity';

// Given in Doc
// Restaurant name
// ○ Address
// ○ Contact number
// ○ Current status (New, Active, Inactive)
// ○ Assigned KAM

@Entity()
export class RestaurantLead extends BaseEntity {
  @Property()
  name: string;

  @Property()
  address: string;

  @Property()
  contactNumber: string;

  @Enum({
    items: () => RestaurantLeadStatus,
  })
  restaurantLeadStatus: RestaurantLeadStatus;

  @Property()
  assignedKAM: string;

  @OneToMany(() => RestaurantStaff, (staff) => staff.restaurantLead, {
    cascade: [Cascade.REMOVE],
  })
  staff = new Collection<RestaurantStaff>(this);

  constructor({
    name,
    address,
    contactNumber,
    restaurantLeadStatus,
    assignedKAM,
  }: {
    name: string;
    address: string;
    contactNumber: string;
    restaurantLeadStatus: RestaurantLeadStatus;
    assignedKAM: string;
  }) {
    super();
    this.name = name;
    this.address = address;
    this.contactNumber = contactNumber;
    this.restaurantLeadStatus = restaurantLeadStatus;
    this.assignedKAM = assignedKAM;
  }
}
