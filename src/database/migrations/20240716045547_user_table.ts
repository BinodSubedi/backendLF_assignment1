import { Knex } from "knex";

const TABLE_NAME = "user";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id").primary();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.string("username", 25).notNullable();
    table.string("email", 30).notNullable();
    table.string("password", 100).notNullable();
    table.string("refreshToken", 100).notNullable();
    table.string("accessLevel", 100).notNullable();
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
