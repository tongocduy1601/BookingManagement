import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.databaseHost,
    port: Number(process.env.hostPort),
    username: process.env.usernameDb,
    password: process.env.passwordDb,
    database: process.env.database,
    synchronize: false,
    ssl: false,
    entities: ['./dist/database/entities/*{.ts,.js}'],
    migrations: ['./dist/database/migrations/*.{ts,js}'],
    logger: 'file',
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
