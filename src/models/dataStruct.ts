export interface DataStruct {
  bees: BeeData[];
}

export interface BeeData {
  id: number;
  name: string;
  neighborhood: string;
  reserveDoubling: boolean;
}

export const DefaultDatabaseModel: DataStruct = { bees: [] };
