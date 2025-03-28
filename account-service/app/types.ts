import { Knex } from "knex";

export interface Context {
  dbPool: Knex<any, unknown[]>;
};

export type AccountInfo = {
  variableValues?: VariableValues;
};

type VariableValues = {
  pagination?: Pagination;
};

type Pagination = {
  offset?: number;
  limit?: number;
};
