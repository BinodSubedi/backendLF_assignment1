import { Knex } from "knex";

const TABLE_NAME = "TODO";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id").primary();

    table.integer("userId").unsigned().notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .foreign("userId")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");

    table.string("title", 30).notNullable();
    table.string("description", 50).notNullable();
    table.boolean("finished").notNullable();
    table.timestamp("finished_at").nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
