export interface EpicCreature {
  id: string;
  name: string;
  description: string;
  stats: any;
}

export interface EpicHero {
  id: string;
  name: string;
  description: string;
  stats: any;
}

export interface EpicBuilding {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface EpicArtifact {
  id: string;
  name: string;
  description: string;
  power: number;
}
