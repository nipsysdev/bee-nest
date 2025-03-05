import { Module } from '@nestjs/common';
import { DatabaseService } from './core/database.service';
import { BeeService } from './bee.service';
import { BeeController } from './bee.controller';
import { ConfigService } from './core/config.service';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [BeeController],
  providers: [
    {
      provide: BeeService,
      inject: [ConfigService, DatabaseService],
      useFactory: (
        configService: ConfigService,
        dbService: DatabaseService,
      ) => {
        return new BeeService(configService, dbService);
      },
    },
  ],
})
export class AppModule {}
