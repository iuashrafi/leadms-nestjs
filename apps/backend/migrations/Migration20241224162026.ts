import { Migration } from '@mikro-orm/migrations';

export class Migration20241224162026 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "restaurant_staff" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text not null, "role" text check ("role" in ('Owner', 'Manager', 'Chef', 'Others')) not null, "contact_number" text not null, "email" text not null, "restaurant_lead_id" int not null);`);

    this.addSql(`alter table "restaurant_staff" add constraint "restaurant_staff_restaurant_lead_id_foreign" foreign key ("restaurant_lead_id") references "restaurant_lead" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "restaurant_staff" cascade;`);
  }

}
