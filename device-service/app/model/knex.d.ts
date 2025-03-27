import { Device } from '../types';
import { AccountDevice } from './AccountDevice';

declare module 'knex/types/tables' {
    interface Tables {
        device: Device;
        account_device: AccountDevice;
    }
}
