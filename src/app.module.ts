import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerService } from './docker.service';
import * as Docker from 'dockerode';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DOCKER_SERVICE',
      useFactory: () => {
        return new DockerService(new Docker());
      },
    },
  ],
})
export class AppModule {}
