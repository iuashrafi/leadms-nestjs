import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { RestaurantStaffRole } from 'contract/enum';
import { BaseEntity } from 'src/base.entity';
import { RestaurantLead } from '../../lead/entities/restaurantLead.entity';
import { RestaurantInteraction } from 'src/interaction/entities/restaurantInteraction.entity';

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

  @OneToMany(() => RestaurantInteraction, (interaction) => interaction.staff, {
    cascade: [Cascade.REMOVE],
  })
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
