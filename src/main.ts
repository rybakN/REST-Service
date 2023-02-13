import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'yaml';
import { DataSource } from 'typeorm';
import { UserEntity } from './routes/user/entities/user.entity';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  const document = await fs.readFile(
    path.join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  );
  SwaggerModule.setup('doc', app, yaml.parse(document));
  await app.listen(PORT);
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'secret',
    entities: [UserEntity],
    synchronize: true,
  });
  AppDataSource.initialize()
    .then()
    .catch((err) => console.log(err));
}
bootstrap();
