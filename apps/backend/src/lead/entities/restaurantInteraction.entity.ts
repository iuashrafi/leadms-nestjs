import { Entity, Enum, Property } from '@mikro-orm/core';
import { RestaurantInteractionType } from 'contract/enum';
import { BaseEntity } from 'src/base.entity';

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

  constructor({
    interactionType,
    notes,
    followUp,
  }: {
    interactionType: RestaurantInteractionType;
    notes: string | null;
    followUp: boolean;
  }) {
    super();
    this.interactionType = interactionType;
    this.notes = notes;
    this.followUp = followUp;
  }
}
