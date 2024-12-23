import { Migration } from '@mikro-orm/migrations';

export class Migration20241223192345 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "restaurant_lead" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text not null, "address" text not null, "contact_number" text not null, "restaurant_lead_status" text check ("restaurant_lead_status" in ('New', 'Active', 'Inactive')) not null, "assigned_kam" text not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "restaurant_lead" cascade;`);
  }

}
