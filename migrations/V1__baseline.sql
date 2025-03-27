create table account
(
    id        uuid not null primary key,
    name        text not null,
    email        text null
);

create table device
(
    id        uuid not null primary key,
    serial_number        text not null,
    model       text not null
);

create table account_device
(
    id          uuid not null primary key,
    account_id   uuid not null,
    device_id   uuid not null
);

