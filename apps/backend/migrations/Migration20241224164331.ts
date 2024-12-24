import { Migration } from '@mikro-orm/migrations';

export class Migration20241224164331 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "restaurant_interaction" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "interaction_date" timestamptz not null, "interaction_type" text check ("interaction_type" in ('Call', 'Visit', 'Order')) not null, "notes" text null, "follow_up" boolean not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "restaurant_interaction" cascade;`);
  }

}
