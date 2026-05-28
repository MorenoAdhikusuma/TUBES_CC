export interface Sinner {
  _id?: string;
  id: string;
  name: string;
  code: number;
}

export interface Skill {
  name: string;
  affinity: string; // Wrath, Lust, Sloth, Gluttony, Gloom, Pride, Envy, Defense
  damageType: string; // Slash, Pierce, Blunt, Defense
  basePower: number;
  coinCount: number;
  coinPower: number;
}

export interface IdentityResistances {
  slash: 'Fatal' | 'Normal' | 'Ineffective';
  pierce: 'Fatal' | 'Normal' | 'Ineffective';
  blunt: 'Fatal' | 'Normal' | 'Ineffective';
}

export interface Identity {
  _id: string;
  sinnerId: string;
  name: string;
  rarity: number; // 1, 2, 3
  speedRange: string;
  hp: number;
  defense: number;
  resistances: IdentityResistances;
  skills: {
    s1: Skill;
    s2: Skill;
    s3: Skill;
    defense: Skill;
  };
}

export interface EgoCost {
  Wrath: number;
  Lust: number;
  Sloth: number;
  Gluttony: number;
  Gloom: number;
  Pride: number;
  Envy: number;
  [key: string]: number; // indexer to make dynamic counting easier
}

export interface Ego {
  _id: string;
  sinnerId: string;
  name: string;
  riskLevel: 'ZAYIN' | 'TETH' | 'HE' | 'WAW' | 'ALEPH';
  cost: EgoCost;
  sanityCost: number;
  damageType: 'Slash' | 'Pierce' | 'Blunt';
  affinity: string;
}

export interface TeamSlotRaw {
  sinnerId: string;
  identityId: string | null;
  egoIds: string[];
}

export interface TeamSlotPopulated {
  sinnerId: string;
  identityId: Identity | null;
  egoIds: Ego[];
}

export interface Team<SlotType = TeamSlotPopulated> {
  _id?: string;
  name: string;
  description?: string;
  slots: SlotType[];
  updatedAt?: string;
}
