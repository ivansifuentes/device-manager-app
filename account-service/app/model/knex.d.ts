import { Account } from './Account';

declare module 'knex/types/tables' {
    interface Tables {
        account: Account;
    }
}
