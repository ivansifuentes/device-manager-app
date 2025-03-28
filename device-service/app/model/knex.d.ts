import { Device } from './Device';
import { AccountDevice } from './AccountDevice';

declare module 'knex/types/tables' {
    interface Tables {
        device: Device;
        account_device: AccountDevice;
    }
}
