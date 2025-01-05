import {
  defineConfig,
  LoadStrategy,
  Platform,
  TextType,
  Type,
} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { NotFoundException } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import 'dotenv/config';

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  clientUrl: process.env['DATABASE_URL'],
  // dbName: process.env.DB_NAME as string,
  // host: process.env.DB_HOST as string,
  // password: process.env.DB_PASSWORD as string,
  // user: process.env.DB_USERNAME as string,
  // port: Number(process.env.DB_PORT),
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,

  debug: true,
  discovery: {
    warnWhenNoEntities: false,
    getMappedType(type: string, platform: Platform) {
      // override the mapping for string properties only
      if (type === 'string') {
        return Type.getType(TextType);
      }
      return platform.getDefaultMappedType(type);
    },
  },
  // when using locally, comment it ! only it is required when using it in cloud
  driverOptions: {
    connection: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    emit: 'ts',
  },
  findOneOrFailHandler: (entityName) => {
    throw new NotFoundException(`${entityName} not found`);
  },
});
