import { UserInputError } from "apollo-server-core";
import { AccountInfo, Context } from "./types";
import { randomUUID } from "crypto";

type AccountInput = {
  id: string;
}

type CreateAccountParams = {
  input: CreateAccountInput;
}

type CreateAccountInput = {
  name: string;
}

const Resolvers = {
  Query: {
    account: async (_: any, args: AccountInput, context: Context) => {
      return await context.dbPool('account').where('id', args.id).first();
    },
    // placeholder for real resolver on AccountPage object
    accounts() {
      return {};
    },
  },
  Mutation: {
    createAccount: async(
      _: any,
      params: CreateAccountParams,
      context: Context
    ) => {
      const { input } = params;
      let res;
      try {
          await context.dbPool.transaction(async (trx) => {
              res = await context
                  .dbPool('account')
                  .insert({
                      id: randomUUID(),
                      name: input.name,
                  })
                  .returning('*')
                  .transacting(trx);
              // any other op in same trx, ie audit record
          });
      } catch (e: any) {
          console.log(e);
          throw new Error(
              'DB_ERROR Creating account'
          );
      }
      if (!res) {
        console.log('DB_ERROR Creating account');
        throw new Error(
          'DB_ERROR Creating account'
      );
    }
    return res[0];
    },
  },
  AccountPage: {
    async count(_1: any, _2: any, context: Context) {
      const query = context.dbPool('account').count('* as id');
      const count = await query.first();
      if (!count) return 0;
      return count.id;
    },
    async items(_1: any, _2: any, context: Context, info: AccountInfo) {
      let query = context.dbPool('account');
      // pagination
      if (info.variableValues?.pagination?.offset) {
          query = query.offset(info.variableValues?.pagination?.offset);
      }
      if (info.variableValues?.pagination?.limit) {
          query = query.limit(info.variableValues?.pagination?.limit);
      }
      query = query.orderBy('name', 'asc');
      return await query;
    },
  },
};

export default Resolvers;
