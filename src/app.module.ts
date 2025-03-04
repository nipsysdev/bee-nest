import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerService } from './docker.service';
import * as Docker from 'dockerode';
import { DatabaseService } from './database.service';
import { JSONFilePreset } from 'lowdb/node';
import { DataStruct, DefaultDatabaseModel } from './models/dataStruct';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DatabaseService.name,
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
      provide: DockerService.name,
      useFactory: () => {
        return new DockerService(new Docker());
      },
    },
  ],
})
export class AppModule {}
