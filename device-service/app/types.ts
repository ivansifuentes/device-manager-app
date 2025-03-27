import { Knex } from "knex";

export interface Context {
  dbPool: Knex<any, unknown[]>;
};

export type Device = {
  id: string;
  serial_number: string;
  model: string;
}
