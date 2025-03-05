import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { BeeData, DataStruct } from './models/dataStruct';
import { Low } from 'lowdb';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  public static readonly dbFile = './db.json';
  readonly #logger = new Logger(DatabaseService.name);

  constructor(private readonly db: Low<DataStruct>) {}

  get bees() {
    return this.db.data.bees;
  }

  addBee(data: BeeData) {
    this.db.data.bees.push(data);
  }

  removeBee(data: BeeData) {
    this.db.data.bees = this.db.data.bees.filter((bee) => bee.id !== data.id);
  }

  async onModuleDestroy() {
    this.#logger.log(`Saving database..`);
    await this.db.write();
    this.#logger.log(`Database persisted to ${DatabaseService.dbFile}`);
  }
}
