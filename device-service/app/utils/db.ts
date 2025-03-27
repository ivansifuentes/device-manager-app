import config from './config';
import knex from 'knex';

export const dbPool = knex({
    client: 'postgres',
    connection: {
        host: config.get('pgHost'),
        port: 5432,
        user: config.get('pgUsername'),
        password: config.get('pgPassword'),
        database: config.get('pgDatabase'),
    },
    pool: {
        min: 0,
        max: 10,
    },
});
