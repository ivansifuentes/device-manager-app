import { Knex } from "knex";

export interface Context {
  dbPool: Knex<any, unknown[]>;
};
