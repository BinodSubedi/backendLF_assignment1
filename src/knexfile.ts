import { Knex } from "knex";
import config from "./config";

const knexBaseConfig: Knex.Config = {
  client: "pg",
  connection: {
    port: 5432,
    host: "localhost",
    database: "test_db",
    user: "postgres",
    password: config.pg_password,
  },
};

const knexConfig: Knex.Config = {
  ...knexBaseConfig,
  migrations: {
    directory: "database/migrations",
    tableName: "knex_migrations",
    extension: "ts",
    stub: "./stubs/migration.stub",
  },
  seeds: {
    directory: "./seed",
    extension: "ts",
  },
};

export default knexConfig;
