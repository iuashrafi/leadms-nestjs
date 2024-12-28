import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { RestaurantStaffRole } from 'contract/enum';
import { BaseEntity } from 'src/base.entity';
import { RestaurantLead } from './restaurantLead.entity';
import { RestaurantInteraction } from './restaurantInteraction.entity';

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

  @OneToMany(() => RestaurantInteraction, (interaction) => interaction.staff)
  interactions = new Collection<RestaurantInteraction>(this);

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
