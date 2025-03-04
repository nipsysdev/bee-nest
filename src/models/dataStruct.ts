export interface DataStruct {
  bees: Bee[];
}

export interface Bee {
  id: number;
  name: string;
  neighborhood: string;
  reserveDoubling: boolean;
}

export const DefaultDatabaseModel: DataStruct = { bees: [] };
