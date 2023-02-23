import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'yaml';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT || 4000;
  const document = await fs.readFile(
    path.join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  );
  SwaggerModule.setup('doc', app, yaml.parse(document));
  await app.listen(PORT);
}
bootstrap();
