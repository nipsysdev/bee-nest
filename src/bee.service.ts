import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { BeeCreationPayload } from './models/payloads';
import { ConfigService } from './config.service';

@Injectable()
export class BeeService implements OnModuleDestroy {
  readonly #dataGbSize = 10;

  constructor(
    private readonly configService: ConfigService,
    private readonly dbService: DatabaseService,
  ) {}

  createBee(payload: BeeCreationPayload) {}

  createDataDir(id: number) {}

  onModuleDestroy() {}
}
