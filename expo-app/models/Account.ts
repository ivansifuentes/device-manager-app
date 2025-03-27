import { Device } from "./Device";

export type Account = {
    id: string;
    name: string;
    accountDevices: Array<Device>;
}
