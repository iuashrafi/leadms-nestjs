import { Migration } from '@mikro-orm/migrations';

export class Migration20241228084541 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "restaurant_interaction" add column "staff_id" int not null;`);
    this.addSql(`alter table "restaurant_interaction" add constraint "restaurant_interaction_staff_id_foreign" foreign key ("staff_id") references "restaurant_staff" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "restaurant_interaction" drop constraint "restaurant_interaction_staff_id_foreign";`);

    this.addSql(`alter table "restaurant_interaction" drop column "staff_id";`);
  }

}
