// Daggerheart System Data

export const CLASSES = {
  'Bard': { domains: ['Codex', 'Grace', 'Midnight', 'Splendor'] },
  'Druid': { domains: ['Arcana', 'Sage', 'Blade', 'Bone'] },
  'Guardian': { domains: ['Blade', 'Bone', 'Grace', 'Valor'] },
  'Ranger': { domains: ['Sage', 'Blade', 'Grace', 'Midnight'] },
  'Rogue': { domains: ['Midnight', 'Blade', 'Grace', 'Splendor'] },
  'Seraph': { domains: ['Codex', 'Grace', 'Splendor', 'Valor'] },
  'Sorcerer': { domains: ['Arcana', 'Midnight', 'Bone', 'Codex'] },
  'Warrior': { domains: ['Blade', 'Bone', 'Grace', 'Valor'] },
  'Wizard': { domains: ['Arcana', 'Codex', 'Sage', 'Splendor'] }
};

export const DOMAINS = [
  'Arcana',
  'Blade',
  'Bone',
  'Codex',
  'Grace',
  'Midnight',
  'Sage',
  'Splendor',
  'Valor'
];

export const ANCESTRIES = [
  'Clank',
  'Daemon',
  'Drakona',
  'Dwarf',
  'Elf',
  'Faerie',
  'Faun',
  'Firbolg',
  'Fungril',
  'Galapa',
  'Giant',
  'Goblin',
  'Halfling',
  'Human',
  'Inferis',
  'Katari',
  'Orc',
  'Ribbet',
  'Simiah'
];

export const COMMUNITIES = [
  'Highborne',
  'Loreborne',
  'Orderborne',
  'Ridgeborne',
  'Seaborne',
  'Slyborne',
  'Wanderborne',
  'Wildborne',
  'Underborne'
];

export const LORE_TYPES = [
  'location',
  'npc',
  'faction',
  'item',
  'history',
  'quest',
  'other'
];

export const TRAIT_RANGE = [-1, 0, 1, 2, 3];

export const EXTERNAL_TOOLS = [
  {
    name: 'FreshCutGrass Encounter Manager',
    url: 'https://freshcutgrass.app/encounter',
    description: 'Build and manage encounters',
    icon: 'sword'
  },
  {
    name: 'FreshCutGrass Homebrew',
    url: 'https://freshcutgrass.app/homebrew',
    description: 'Create custom content',
    icon: 'sparkles'
  },
  {
    name: 'Demiplane Character Builder',
    url: 'https://app.demiplane.com/nexus/daggerheart',
    description: 'Official character builder',
    icon: 'user-circle'
  },
  {
    name: 'Daggerheart Official Site',
    url: 'https://www.daggerheart.com',
    description: 'Official website',
    icon: 'home'
  },
  {
    name: 'Daggerheart SRD',
    url: 'https://www.daggerheart.com/wp-content/uploads/2025/05/DH-SRD-May202025.pdf',
    description: 'System Reference Document',
    icon: 'book-open'
  }
];
