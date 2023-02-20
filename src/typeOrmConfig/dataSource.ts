import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './typeOrmConfig';
import { gen1676897616728 } from './1676897616728-gen';

export const dataSource = new DataSource({
  ...TypeOrmConfig,
  migrations: [gen1676897616728],
  migrationsTableName: 'migrations',
});
