import { Knex } from "knex";

export interface Context {
  dbPool: Knex<any, unknown[]>;
};

export type Account = {
  id: string;
  name: string;
}

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
