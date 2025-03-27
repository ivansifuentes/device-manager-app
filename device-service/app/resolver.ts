import { UserInputError } from "apollo-server-core";
import { Context } from "./types";
import { randomUUID } from "crypto";
import { Account } from "./model/Account";

type DeviceInput = {
  id: string;
}

type CreateDeviceParams = {
  input: CreateDeviceInput;
  accountId?: string;
}

type CreateDeviceInput = {
  serial_number: string;
  model: string;
}

const Resolvers = {
  Query: {
    device: async (_: any, args: DeviceInput, context: Context) => {
      return await context.dbPool('device').where('id', args.id).first();
    },
  },
  Mutation: {
    createDevice: async(
      _: any,
      params: CreateDeviceParams,
      context: Context
    ) => {
      const { input } = params;

      let res;
      try {
          await context.dbPool.transaction(async (trx) => {
              res = await context
                  .dbPool('device')
                  .insert({
                      id: randomUUID(),
                      serial_number: input.serial_number,
                      model: input.model,
                  })
                  .returning('*')
                  .transacting(trx);
                if (params.accountId) {
                  const id = res[0].id;
                  await context.dbPool('account_device')
                    .insert({
                      id: randomUUID(),
                      account_id: params.accountId,
                      device_id: id,
                    })
                    .transacting(trx);
                }
              // any other op in same trx, ie audit record
          });
      } catch (e: any) {
          console.log(e);
          throw new Error(
              'DB_ERROR Creating device'
          );
      }
      if (!res) {
        console.log('DB_ERROR Creating device');
          throw new Error(
            'DB_ERROR Creating device'
        );
      }
      return res[0];
    },
  },
  Account: {
    async accountDevices(account: Account, _2: any, context: Context) {
      console.log({account});
      return await context.dbPool('device')
        .join('account_device', 'device.id', 'account_device.device_id')
        .where('account_id', account.id);
    },
  }
};

export default Resolvers;
