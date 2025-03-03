import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { DatabaseModel } from './models/DatabaseModel';
import { Low } from 'lowdb';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  public static readonly dbFile = './db.json';
  private logger = new Logger(DatabaseService.name);

  constructor(private readonly db: Low<DatabaseModel>) {}

  get bees() {
    return this.db.data.bees;
  }

  getBee(beeName: string) {
    return this.db.data.bees.find((bee) => bee.name === beeName);
  }

  async onModuleDestroy() {
    this.logger.log(`Saving database..`);
    await this.db.write();
    this.logger.log(`Database persisted to ${DatabaseService.dbFile}`);
  }
}
