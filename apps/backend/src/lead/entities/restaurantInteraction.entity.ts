import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { RestaurantInteractionType } from 'contract/enum';
import { BaseEntity } from 'src/base.entity';
import { RestaurantStaff } from './restaurantStaff.entity';

// Record basic details about each interaction:
// ○ Date of interaction
// ○ Type (Call, Visit, Order)
// ○ Notes
// ○ Follow-up required (Yes/No)

@Entity()
export class RestaurantInteraction extends BaseEntity {
  @Property({ type: 'date' })
  interactionDate: Date;

  @Enum({ items: () => RestaurantInteractionType })
  interactionType: RestaurantInteractionType;

  @Property({ nullable: true })
  notes: string | null;

  @Property({ type: 'boolean' })
  followUp: boolean;

  @ManyToOne(() => RestaurantStaff)
  staff: RestaurantStaff;

  constructor({
    interactionDate,
    interactionType,
    notes,
    followUp,
    staff,
  }: {
    interactionDate: Date;
    interactionType: RestaurantInteractionType;
    notes: string | null;
    followUp: boolean;
    staff: RestaurantStaff;
  }) {
    super();
    this.interactionDate = interactionDate;
    this.interactionType = interactionType;
    this.notes = notes;
    this.followUp = followUp;
    this.staff = staff;
  }
}
