export const sinnersData = [
  { id: 'yi_sang', name: 'Yi Sang', code: 1 },
  { id: 'faust', name: 'Faust', code: 2 },
  { id: 'don_quixote', name: 'Don Quixote', code: 3 },
  { id: 'ryoshu', name: 'Ryōshū', code: 4 },
  { id: 'meursault', name: 'Meursault', code: 5 },
  { id: 'hong_lu', name: 'Hong Lu', code: 6 },
  { id: 'heathcliff', name: 'Heathcliff', code: 7 },
  { id: 'ishmael', name: 'Ishmael', code: 8 },
  { id: 'rodion', name: 'Rodion', code: 9 },
  { id: 'sinclair', name: 'Sinclair', code: 10 },
  { id: 'outis', name: 'Outis', code: 11 },
  { id: 'gregor', name: 'Gregor', code: 12 }
];

export const identitiesData = [
  // --- Yi Sang ---
  {
    sinnerId: 'yi_sang',
    name: 'LCB Sinner Yi Sang',
    rarity: 1,
    speedRange: '3-7',
    hp: 148,
    defense: 35,
    resistances: { slash: 'Normal', pierce: 'Ineffective', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Fickle Play', affinity: 'Gloom', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Crow\'s Eye View', affinity: 'Sloth', damageType: 'Pierce', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Ennui', affinity: 'Pride', damageType: 'Slash', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Evade', affinity: 'Defense', damageType: 'Defense', basePower: 4, coinCount: 1, coinPower: 10 }
    }
  },
  {
    sinnerId: 'yi_sang',
    name: 'W Corp. L3 Cleanup Agent',
    rarity: 3,
    speedRange: '4-8',
    hp: 165,
    defense: 38,
    resistances: { slash: 'Ineffective', pierce: 'Fatal', blunt: 'Normal' },
    skills: {
      s1: { name: 'Rip', affinity: 'Gloom', damageType: 'Slash', basePower: 4, coinCount: 2, coinPower: 3 },
      s2: { name: 'Overcharge', affinity: 'Envy', damageType: 'Slash', basePower: 6, coinCount: 2, coinPower: 5 },
      s3: { name: 'Dimensional Rip', affinity: 'Pride', damageType: 'Slash', basePower: 7, coinCount: 3, coinPower: 4 },
      defense: { name: 'Energy Shield', affinity: 'Defense', damageType: 'Defense', basePower: 10, coinCount: 1, coinPower: 6 }
    }
  },
  {
    sinnerId: 'yi_sang',
    name: 'Spicebush Yi Sang',
    rarity: 3,
    speedRange: '3-7',
    hp: 155,
    defense: 34,
    resistances: { slash: 'Fatal', pierce: 'Ineffective', blunt: 'Normal' },
    skills: {
      s1: { name: 'Rustle', affinity: 'Sloth', damageType: 'Blunt', basePower: 3, coinCount: 3, coinPower: 2 },
      s2: { name: 'Flowering Sprout', affinity: 'Gluttony', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 6 },
      s3: { name: 'Fragrance Spreader', affinity: 'Gloom', damageType: 'Slash', basePower: 6, coinCount: 3, coinPower: 4 },
      defense: { name: 'Shed Petals', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 8 }
    }
  },

  // --- Faust ---
  {
    sinnerId: 'faust',
    name: 'LCB Sinner Faust',
    rarity: 1,
    speedRange: '2-6',
    hp: 186,
    defense: 41,
    resistances: { slash: 'Ineffective', pierce: 'Fatal', blunt: 'Normal' },
    skills: {
      s1: { name: 'Downward Cleave', affinity: 'Pride', damageType: 'Slash', basePower: 5, coinCount: 1, coinPower: 6 },
      s2: { name: 'Glance Midpoint', affinity: 'Gloom', damageType: 'Slash', basePower: 6, coinCount: 2, coinPower: 4 },
      s3: { name: 'Upward Slash', affinity: 'Lust', damageType: 'Slash', basePower: 7, coinCount: 1, coinPower: 11 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 5 }
    }
  },
  {
    sinnerId: 'faust',
    name: 'The One Who Grips Faust',
    rarity: 3,
    speedRange: '3-7',
    hp: 172,
    defense: 36,
    resistances: { slash: 'Fatal', pierce: 'Ineffective', blunt: 'Normal' },
    skills: {
      s1: { name: 'Execution', affinity: 'Lust', damageType: 'Pierce', basePower: 4, coinCount: 2, coinPower: 4 },
      s2: { name: 'Gaze of the Inquisitor', affinity: 'Gloom', damageType: 'Blunt', basePower: 5, coinCount: 3, coinPower: 3 },
      s3: { name: 'Purifying Flame', affinity: 'Wrath', damageType: 'Pierce', basePower: 6, coinCount: 2, coinPower: 8 },
      defense: { name: 'Self-Righteousness', affinity: 'Defense', damageType: 'Defense', basePower: 9, coinCount: 1, coinPower: 7 }
    }
  },
  {
    sinnerId: 'faust',
    name: 'W Corp. L2 Cleanup Agent',
    rarity: 2,
    speedRange: '3-6',
    hp: 154,
    defense: 39,
    resistances: { slash: 'Ineffective', pierce: 'Normal', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Cut', affinity: 'Pride', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Leap', affinity: 'Envy', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 5 },
      s3: { name: 'Overcharge', affinity: 'Gloom', damageType: 'Slash', basePower: 6, coinCount: 3, coinPower: 3 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 7, coinCount: 1, coinPower: 5 }
    }
  },

  // --- Don Quixote ---
  {
    sinnerId: 'don_quixote',
    name: 'LCB Sinner Don Quixote',
    rarity: 1,
    speedRange: '3-7',
    hp: 145,
    defense: 33,
    resistances: { slash: 'Fatal', pierce: 'Normal', blunt: 'Ineffective' },
    skills: {
      s1: { name: 'Gallop Charge', affinity: 'Lust', damageType: 'Pierce', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'For Justice!', affinity: 'Pride', damageType: 'Pierce', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Joust', affinity: 'Wrath', damageType: 'Pierce', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Evade', affinity: 'Defense', damageType: 'Defense', basePower: 3, coinCount: 1, coinPower: 10 }
    }
  },
  {
    sinnerId: 'don_quixote',
    name: 'W Corp. L3 Cleanup Agent',
    rarity: 3,
    speedRange: '4-8',
    hp: 158,
    defense: 35,
    resistances: { slash: 'Ineffective', pierce: 'Normal', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Rip', affinity: 'Gloom', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Leap', affinity: 'Envy', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 5 },
      s3: { name: 'Rip Space', affinity: 'Envy', damageType: 'Slash', basePower: 7, coinCount: 5, coinPower: 2 },
      defense: { name: 'Evade', affinity: 'Defense', damageType: 'Defense', basePower: 4, coinCount: 1, coinPower: 10 }
    }
  },

  // --- Ryōshū ---
  {
    sinnerId: 'ryoshu',
    name: 'LCB Sinner Ryōshū',
    rarity: 1,
    speedRange: '3-6',
    hp: 135,
    defense: 32,
    resistances: { slash: 'Ineffective', pierce: 'Fatal', blunt: 'Normal' },
    skills: {
      s1: { name: 'H.P. (High Pitch)', affinity: 'Wrath', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'P.S. (Paint Stroke)', affinity: 'Lust', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'F.O.D. (Flurry of Death)', affinity: 'Pride', damageType: 'Slash', basePower: 6, coinCount: 3, coinPower: 3 },
      defense: { name: 'Evade', affinity: 'Defense', damageType: 'Defense', basePower: 4, coinCount: 1, coinPower: 10 }
    }
  },
  {
    sinnerId: 'ryoshu',
    name: 'Kurokumo Clan Wakashu Ryōshū',
    rarity: 3,
    speedRange: '3-7',
    hp: 146,
    defense: 34,
    resistances: { slash: 'Ineffective', pierce: 'Fatal', blunt: 'Normal' },
    skills: {
      s1: { name: 'Focus', affinity: 'Lust', damageType: 'Slash', basePower: 5, coinCount: 1, coinPower: 6 },
      s2: { name: 'Cleanse', affinity: 'Pride', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 5 },
      s3: { name: 'Lenticular Swirl', affinity: 'Gluttony', damageType: 'Slash', basePower: 6, coinCount: 3, coinPower: 4 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 9, coinCount: 1, coinPower: 6 }
    }
  },

  // --- Meursault ---
  {
    sinnerId: 'meursault',
    name: 'LCB Sinner Meursault',
    rarity: 1,
    speedRange: '2-5',
    hp: 198,
    defense: 44,
    resistances: { slash: 'Normal', pierce: 'Ineffective', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Punch', affinity: 'Sloth', damageType: 'Blunt', basePower: 4, coinCount: 1, coinPower: 6 },
      s2: { name: 'Resolve', affinity: 'Gluttony', damageType: 'Blunt', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Execute', affinity: 'Pride', damageType: 'Blunt', basePower: 6, coinCount: 1, coinPower: 11 },
      defense: { name: 'Counter', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 5 }
    }
  },
  {
    sinnerId: 'meursault',
    name: 'R Corp. 4th Pack Rhino Meursault',
    rarity: 3,
    speedRange: '3-6',
    hp: 212,
    defense: 48,
    resistances: { slash: 'Normal', pierce: 'Fatal', blunt: 'Ineffective' },
    skills: {
      s1: { name: 'Rhino Charge', affinity: 'Gloom', damageType: 'Blunt', basePower: 4, coinCount: 2, coinPower: 3 },
      s2: { name: 'Concentrated Fire', affinity: 'Sloth', damageType: 'Pierce', basePower: 5, coinCount: 3, coinPower: 3 },
      s3: { name: 'Ram', affinity: 'Envy', damageType: 'Blunt', basePower: 6, coinCount: 2, coinPower: 9 },
      defense: { name: 'Heavy Counter', affinity: 'Defense', damageType: 'Defense', basePower: 10, coinCount: 1, coinPower: 6 }
    }
  },

  // --- Hong Lu ---
  {
    sinnerId: 'hong_lu',
    name: 'LCB Sinner Hong Lu',
    rarity: 1,
    speedRange: '3-6',
    hp: 154,
    defense: 35,
    resistances: { slash: 'Fatal', pierce: 'Ineffective', blunt: 'Normal' },
    skills: {
      s1: { name: 'Strike Down', affinity: 'Gluttony', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Whirlwind', affinity: 'Sloth', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Approach', affinity: 'Gloom', damageType: 'Slash', basePower: 6, coinCount: 3, coinPower: 3 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 5 }
    }
  },
  {
    sinnerId: 'hong_lu',
    name: 'Dieci South Section 4 Hong Lu',
    rarity: 3,
    speedRange: '4-7',
    hp: 168,
    defense: 39,
    resistances: { slash: 'Normal', pierce: 'Ineffective', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Key Logic', affinity: 'Gloom', damageType: 'Blunt', basePower: 4, coinCount: 2, coinPower: 4 },
      s2: { name: 'Weight of Knowledge', affinity: 'Sloth', damageType: 'Blunt', basePower: 5, coinCount: 3, coinPower: 4 },
      s3: { name: 'Enlightenment', affinity: 'Pride', damageType: 'Blunt', basePower: 6, coinCount: 4, coinPower: 3 },
      defense: { name: 'Shield of Truth', affinity: 'Defense', damageType: 'Defense', basePower: 12, coinCount: 1, coinPower: 5 }
    }
  },

  // --- Heathcliff ---
  {
    sinnerId: 'heathcliff',
    name: 'LCB Sinner Heathcliff',
    rarity: 1,
    speedRange: '2-5',
    hp: 174,
    defense: 38,
    resistances: { slash: 'Fatal', pierce: 'Normal', blunt: 'Ineffective' },
    skills: {
      s1: { name: 'Bonk', affinity: 'Wrath', damageType: 'Blunt', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Smash', affinity: 'Envy', damageType: 'Blunt', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Upheaval', affinity: 'Lust', damageType: 'Blunt', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Counter', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 6 }
    }
  },
  {
    sinnerId: 'heathcliff',
    name: 'R Corp. 4th Pack Rabbit Heathcliff',
    rarity: 3,
    speedRange: '3-7',
    hp: 142,
    defense: 30,
    resistances: { slash: 'Fatal', pierce: 'Ineffective', blunt: 'Normal' },
    skills: {
      s1: { name: 'Graze', affinity: 'Wrath', damageType: 'Pierce', basePower: 3, coinCount: 3, coinPower: 2 },
      s2: { name: 'Quick Suppression', affinity: 'Envy', damageType: 'Pierce', basePower: 4, coinCount: 5, coinPower: 3 },
      s3: { name: 'Bodysack', affinity: 'Lust', damageType: 'Blunt', basePower: 5, coinCount: 3, coinPower: 5 },
      defense: { name: 'Evade', affinity: 'Defense', damageType: 'Defense', basePower: 4, coinCount: 1, coinPower: 10 }
    }
  },

  // --- Ishmael ---
  {
    sinnerId: 'ishmael',
    name: 'LCB Sinner Ishmael',
    rarity: 1,
    speedRange: '3-6',
    hp: 165,
    defense: 37,
    resistances: { slash: 'Normal', pierce: 'Fatal', blunt: 'Ineffective' },
    skills: {
      s1: { name: 'Paddle Beat', affinity: 'Wrath', damageType: 'Blunt', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Snap Back', affinity: 'Gloom', damageType: 'Blunt', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Pry Out', affinity: 'Sloth', damageType: 'Blunt', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 5 }
    }
  },
  {
    sinnerId: 'ishmael',
    name: 'Pequod Captain Ishmael',
    rarity: 3,
    speedRange: '3-7',
    hp: 178,
    defense: 39,
    resistances: { slash: 'Normal', pierce: 'Ineffective', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Harpoon Pierce', affinity: 'Pride', damageType: 'Pierce', basePower: 4, coinCount: 2, coinPower: 3 },
      s2: { name: 'Catch Breath', affinity: 'Wrath', damageType: 'Pierce', basePower: 5, coinCount: 3, coinPower: 4 },
      s3: { name: 'To Me!', affinity: 'Lust', damageType: 'Pierce', basePower: 6, coinCount: 4, coinPower: 3 },
      defense: { name: 'Command Counter', affinity: 'Defense', damageType: 'Defense', basePower: 9, coinCount: 1, coinPower: 6 }
    }
  },

  // --- Rodion ---
  {
    sinnerId: 'rodion',
    name: 'LCB Sinner Rodion',
    rarity: 1,
    speedRange: '2-5',
    hp: 182,
    defense: 39,
    resistances: { slash: 'Ineffective', pierce: 'Normal', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Axe Chop', affinity: 'Wrath', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Slay', affinity: 'Sloth', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Gamble', affinity: 'Lust', damageType: 'Slash', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 5 }
    }
  },
  {
    sinnerId: 'rodion',
    name: 'Dieci South Section 4 Rodion',
    rarity: 3,
    speedRange: '3-6',
    hp: 194,
    defense: 43,
    resistances: { slash: 'Fatal', pierce: 'Normal', blunt: 'Ineffective' },
    skills: {
      s1: { name: 'Key Logic', affinity: 'Gloom', damageType: 'Blunt', basePower: 4, coinCount: 2, coinPower: 4 },
      s2: { name: 'Study and Discuss', affinity: 'Sloth', damageType: 'Blunt', basePower: 5, coinCount: 3, coinPower: 4 },
      s3: { name: 'Enlightenment', affinity: 'Gluttony', damageType: 'Blunt', basePower: 6, coinCount: 4, coinPower: 3 },
      defense: { name: 'Defend Knowledge', affinity: 'Defense', damageType: 'Defense', basePower: 12, coinCount: 1, coinPower: 5 }
    }
  },

  // --- Sinclair ---
  {
    sinnerId: 'sinclair',
    name: 'LCB Sinner Sinclair',
    rarity: 1,
    speedRange: '3-7',
    hp: 152,
    defense: 34,
    resistances: { slash: 'Fatal', pierce: 'Ineffective', blunt: 'Normal' },
    skills: {
      s1: { name: 'Halberd Strike', affinity: 'Wrath', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Avert Eyes', affinity: 'Gluttony', damageType: 'Slash', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Venting', affinity: 'Lust', damageType: 'Slash', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 5 }
    }
  },
  {
    sinnerId: 'sinclair',
    name: 'The One Who Shall Grip Sinclair',
    rarity: 3,
    speedRange: '3-6',
    hp: 184,
    defense: 39,
    resistances: { slash: 'Normal', pierce: 'Fatal', blunt: 'Ineffective' },
    skills: {
      s1: { name: 'Self-Harm', affinity: 'Wrath', damageType: 'Blunt', basePower: 8, coinCount: 2, coinPower: -2 },
      s2: { name: 'Amputate', affinity: 'Lust', damageType: 'Blunt', basePower: 16, coinCount: 2, coinPower: -4 },
      s3: { name: 'Purifying Judgement', affinity: 'Wrath', damageType: 'Slash', basePower: 18, coinCount: 3, coinPower: -4 },
      defense: { name: 'Guilt', affinity: 'Defense', damageType: 'Defense', basePower: 12, coinCount: 1, coinPower: -3 }
    }
  },

  // --- Outis ---
  {
    sinnerId: 'outis',
    name: 'LCB Sinner Outis',
    rarity: 1,
    speedRange: '3-7',
    hp: 145,
    defense: 34,
    resistances: { slash: 'Ineffective', pierce: 'Normal', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Tactical Strike', affinity: 'Sloth', damageType: 'Pierce', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Cover Fire', affinity: 'Gluttony', damageType: 'Pierce', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Execute', affinity: 'Pride', damageType: 'Pierce', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Evade', affinity: 'Defense', damageType: 'Defense', basePower: 4, coinCount: 1, coinPower: 10 }
    }
  },
  {
    sinnerId: 'outis',
    name: 'W Corp. L3 Cleanup Agent Outis',
    rarity: 3,
    speedRange: '4-7',
    hp: 159,
    defense: 36,
    resistances: { slash: 'Normal', pierce: 'Ineffective', blunt: 'Fatal' },
    skills: {
      s1: { name: 'Charge Cut', affinity: 'Gloom', damageType: 'Slash', basePower: 4, coinCount: 2, coinPower: 3 },
      s2: { name: 'Rip', affinity: 'Envy', damageType: 'Slash', basePower: 5, coinCount: 3, coinPower: 4 },
      s3: { name: 'Energy Charge', affinity: 'Pride', damageType: 'Pierce', basePower: 6, coinCount: 4, coinPower: 3 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 9, coinCount: 1, coinPower: 6 }
    }
  },

  // --- Gregor ---
  {
    sinnerId: 'gregor',
    name: 'LCB Sinner Gregor',
    rarity: 1,
    speedRange: '3-6',
    hp: 165,
    defense: 36,
    resistances: { slash: 'Fatal', pierce: 'Ineffective', blunt: 'Normal' },
    skills: {
      s1: { name: 'Flesh Slice', affinity: 'Wrath', damageType: 'Slash', basePower: 4, coinCount: 1, coinPower: 7 },
      s2: { name: 'Gore', affinity: 'Gluttony', damageType: 'Pierce', basePower: 5, coinCount: 2, coinPower: 4 },
      s3: { name: 'Amputate', affinity: 'Sloth', damageType: 'Slash', basePower: 6, coinCount: 1, coinPower: 12 },
      defense: { name: 'Guard', affinity: 'Defense', damageType: 'Defense', basePower: 8, coinCount: 1, coinPower: 5 }
    }
  },
  {
    sinnerId: 'gregor',
    name: 'Twinhook Pirates Gregor',
    rarity: 3,
    speedRange: '3-7',
    hp: 172,
    defense: 38,
    resistances: { slash: 'Fatal', pierce: 'Normal', blunt: 'Ineffective' },
    skills: {
      s1: { name: 'Harpoon Hack', affinity: 'Wrath', damageType: 'Slash', basePower: 4, coinCount: 2, coinPower: 3 },
      s2: { name: 'Pillage', affinity: 'Pride', damageType: 'Pierce', basePower: 5, coinCount: 3, coinPower: 4 },
      s3: { name: 'Prey Sighting', affinity: 'Gloom', damageType: 'Pierce', basePower: 6, coinCount: 3, coinPower: 5 },
      defense: { name: 'Evade', affinity: 'Defense', damageType: 'Defense', basePower: 4, coinCount: 1, coinPower: 10 }
    }
  }
];

export const egosData = [
  // --- ZAYIN (Base EGOs) ---
  { sinnerId: 'yi_sang', name: 'Crow\'s Eye View', riskLevel: 'ZAYIN', damageType: 'Pierce', affinity: 'Gloom', cost: { Gloom: 2, Pride: 2, Envy: 1 }, sanityCost: 20 },
  { sinnerId: 'faust', name: 'Representation', riskLevel: 'ZAYIN', damageType: 'Blunt', affinity: 'Pride', cost: { Pride: 3, Lust: 1, Gloom: 1 }, sanityCost: 20 },
  { sinnerId: 'don_quixote', name: 'La Sangre de Sancho', riskLevel: 'ZAYIN', damageType: 'Pierce', affinity: 'Lust', cost: { Lust: 3, Pride: 2 }, sanityCost: 20 },
  { sinnerId: 'ryoshu', name: 'Forest for the Flames', riskLevel: 'ZAYIN', damageType: 'Slash', affinity: 'Wrath', cost: { Wrath: 3, Lust: 2 }, sanityCost: 20 },
  { sinnerId: 'meursault', name: 'Chains of Others', riskLevel: 'ZAYIN', damageType: 'Blunt', affinity: 'Sloth', cost: { Sloth: 2, Gloom: 2, Envy: 1 }, sanityCost: 20 },
  { sinnerId: 'hong_lu', name: 'Land of Illusion', riskLevel: 'ZAYIN', damageType: 'Blunt', affinity: 'Sloth', cost: { Sloth: 3, Gluttony: 2 }, sanityCost: 20 },
  { sinnerId: 'heathcliff', name: 'Bodhisattva of Bodily Existence', riskLevel: 'ZAYIN', damageType: 'Blunt', affinity: 'Envy', cost: { Envy: 3, Wrath: 2 }, sanityCost: 20 },
  { sinnerId: 'ishmael', name: 'Snagharpoon', riskLevel: 'ZAYIN', damageType: 'Pierce', affinity: 'Gloom', cost: { Gloom: 3, Wrath: 1, Sloth: 1 }, sanityCost: 20 },
  { sinnerId: 'rodion', name: 'What is Cast', riskLevel: 'ZAYIN', damageType: 'Slash', affinity: 'Sloth', cost: { Sloth: 3, Gloom: 2 }, sanityCost: 20 },
  { sinnerId: 'sinclair', name: 'Branch of Light', riskLevel: 'ZAYIN', damageType: 'Blunt', affinity: 'Wrath', cost: { Wrath: 3, Gluttony: 2 }, sanityCost: 20 },
  { sinnerId: 'outis', name: 'To Pathos Mathos', riskLevel: 'ZAYIN', damageType: 'Slash', affinity: 'Pride', cost: { Pride: 3, Sloth: 2 }, sanityCost: 20 },
  { sinnerId: 'gregor', name: 'Sudden Gastric Acid', riskLevel: 'ZAYIN', damageType: 'Slash', affinity: 'Gluttony', cost: { Gluttony: 3, Sloth: 2 }, sanityCost: 20 },

  // --- Premium EGOs (TETH / HE / WAW / ALEPH) ---
  { sinnerId: 'yi_sang', name: 'Sunshower', riskLevel: 'WAW', damageType: 'Blunt', affinity: 'Sloth', cost: { Sloth: 4, Gluttony: 3, Gloom: 2, Envy: 1 }, sanityCost: 35 },
  { sinnerId: 'faust', name: 'Fluid Sac', riskLevel: 'HE', damageType: 'Blunt', affinity: 'Gloom', cost: { Gloom: 3, Sloth: 2, Envy: 2 }, sanityCost: 25 },
  { sinnerId: 'don_quixote', name: 'Fluid Sac', riskLevel: 'HE', damageType: 'Blunt', affinity: 'Gloom', cost: { Gloom: 3, Lust: 2, Sloth: 1 }, sanityCost: 25 },
  { sinnerId: 'don_quixote', name: 'Telepole', riskLevel: 'HE', damageType: 'Pierce', affinity: 'Envy', cost: { Envy: 4, Gloom: 2 }, sanityCost: 25 },
  { sinnerId: 'ryoshu', name: 'Red Eyes', riskLevel: 'TETH', damageType: 'Slash', affinity: 'Lust', cost: { Lust: 3, Wrath: 1 }, sanityCost: 15 },
  { sinnerId: 'ishmael', name: 'Ardor Blossom Star', riskLevel: 'HE', damageType: 'Slash', affinity: 'Wrath', cost: { Wrath: 4, Lust: 3, Pride: 1 }, sanityCost: 30 },
  { sinnerId: 'heathcliff', name: 'Telepole', riskLevel: 'HE', damageType: 'Blunt', affinity: 'Envy', cost: { Envy: 4, Sloth: 2 }, sanityCost: 25 },
  { sinnerId: 'sinclair', name: 'Lifetime Stew', riskLevel: 'TETH', damageType: 'Blunt', affinity: 'Lust', cost: { Lust: 3, Wrath: 2 }, sanityCost: 15 },
  { sinnerId: 'outis', name: 'Ebony Stem', riskLevel: 'HE', damageType: 'Slash', affinity: 'Gluttony', cost: { Gluttony: 4, Lust: 2, Pride: 1 }, sanityCost: 25 }
];
