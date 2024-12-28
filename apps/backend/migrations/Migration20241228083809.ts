import { Migration } from '@mikro-orm/migrations';

export class Migration20241228083809 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "restaurant_interaction" alter column "interaction_date" type date using ("interaction_date"::date);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "restaurant_interaction" alter column "interaction_date" type timestamptz using ("interaction_date"::timestamptz);`);
  }

}
