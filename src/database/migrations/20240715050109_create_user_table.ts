import type { Knex } from "knex";

const TABLE_NAME = "user";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
