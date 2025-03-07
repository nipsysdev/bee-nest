import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import { DockerService } from './docker.service';
import * as Docker from 'dockerode';
import { DatabaseService } from './database.service';
import { JSONFilePreset } from 'lowdb/node';
import { DataStruct, DefaultDatabaseModel } from '../models/dataStruct';
import { ConfigService } from './config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: DatabaseService,
      useFactory: async () => {
        const db = await JSONFilePreset<DataStruct>(
          DatabaseService.dbFile,
          DefaultDatabaseModel,
        );
        await db.read();
        return new DatabaseService(db);
      },
    },
    {
      provide: DockerService,
      useFactory: () => {
        return new DockerService(new Docker());
      },
    },
    {
      provide: ConfigService,
      inject: [NestConfigService],
      useFactory: (envConfig: NestConfigService) =>
        new ConfigService(envConfig),
    },
  ],
  exports: [DatabaseService, DockerService, ConfigService],
})
export class CoreModule {}
