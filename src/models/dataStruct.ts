export interface DataStruct {
  bees: BeeData[];
}

export interface BeeData {
  id: number;
  neighborhood: string;
  reserveDoubling: boolean;
}

export const DefaultDatabaseModel: DataStruct = { bees: [] };
