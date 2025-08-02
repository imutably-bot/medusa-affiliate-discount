import { Migration } from '@mikro-orm/migrations';

export class Migration20250802050427 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "affiliate_discount" ("id" text not null, "customerId" text not null, "customerEmail" text not null, "discountId" text not null, "discountCode" text not null, "commission" real not null, "usageCount" integer not null default 0, "earnings" real not null default 0, "currencyCode" text not null default 'usd', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "affiliate_discount_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_affiliate_discount_deleted_at" ON "affiliate_discount" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "affiliate_discount" cascade;`);
  }

}
