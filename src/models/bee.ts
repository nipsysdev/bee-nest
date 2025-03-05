import { BeeData } from './dataStruct';
import { formatBeeId } from '../utils';

export class Bee {
  readonly id: number;
  readonly name: string;
  readonly neighborhood: string;
  readonly reserveDoubling: boolean;

  constructor(
    { id, neighborhood, reserveDoubling }: BeeData,
    readonly image: string,
    readonly apiPort: string,
    readonly p2pPort: string,
    readonly dataDir: string,
    readonly passwordPath: string,
  ) {
    this.id = id;
    this.name = `node_${formatBeeId(id)}`;
    this.neighborhood = neighborhood;
    this.reserveDoubling = reserveDoubling;
  }
}
