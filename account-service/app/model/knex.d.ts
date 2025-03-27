import { Account } from '../types';

declare module 'knex/types/tables' {
    interface Tables {
        account: Account;
    }
}
