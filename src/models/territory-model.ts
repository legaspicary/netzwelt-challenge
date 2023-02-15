export interface TreeTerritoryModel {
  id: string | null;
  name: string;
  children: Record<string, TreeTerritoryModel>;
}

export interface FlatTerritoryModel {
  id: string;
  name: string;
  parent: string | null;
}
