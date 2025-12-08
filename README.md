# Daggerheart Campaign Manager

A comprehensive web-based campaign management tool for the **Daggerheart TTRPG** system. This application helps Dungeon Masters and players organize their campaigns with character tracking, lore management, session logging, and an integrated dice roller.

![Daggerheart Campaign Manager](https://img.shields.io/badge/Daggerheart-Campaign%20Manager-8b5cf6)

## Features

### 🎭 Dual-Mode Interface
- **Player Mode**: View public content with a gold (Hope) theme
- **DM Mode**: Full control with purple (Fear) theme, access to hidden content and edit controls

### 👥 Character Management
- Complete Daggerheart character stat tracking
- Traits: Agility, Strength, Finesse, Instinct, Presence, Knowledge
- Visual HP and Stress slot tracking
- Evasion, Armor, and Primary Domain
- Experiences list with +2 modifiers
- Demiplane character sheet integration
- Backstory and DM-only private notes
- Expandable character cards with full details

### 📖 Lore & World Building
- Categorized entries: Location, NPC, Faction, Item, History, Quest, Other
- Tag system for easy filtering
- Hidden entries (DM-only visibility)
- Search functionality
- Type filtering

### 📜 Session Logging
- Auto-incrementing session numbers
- Session summaries and highlights
- Date tracking
- Private DM notes
- Reverse chronological display
- Recent sessions preview on dashboard

### 🎲 Duality Dice Roller
- Roll 2d12 (Hope die + Fear die)
- Higher die determines Hope or Fear outcome
- Modifier support
- Animated dice rolling
- Roll history (last 10 rolls)
- Visual gold/purple theme

### 🔗 External Tool Integration
- FreshCutGrass.app (Encounter Builder & Homebrew)
- Demiplane NEXUS (Character Builder)
- Official Daggerheart website
- Quick access links throughout the app

### 📊 Dashboard
- Campaign overview with editable name/description
- Statistics: Character count, Lore entries, Sessions logged
- Quick action grid with external tool links
- Integrated dice roller
- Recent sessions preview

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **LocalStorage** - Data persistence
- **CSS3** - Styling with custom properties

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd daggerheart-campaign-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### First Time Setup

1. The app comes with a default campaign name and description
2. Click the **DM mode** toggle to access editing features
3. Start by adding your first character from the Characters view
4. Build your world in the Lore section
5. Log your first session after playing

### Player Mode vs DM Mode

**Player Mode (Gold Theme):**
- View all public content
- See character stats and backstories
- Read visible lore entries
- Review session recaps
- Roll dice

**DM Mode (Purple Theme):**
- All Player Mode features
- Create, edit, and delete content
- View hidden lore entries
- Access DM-only notes on characters and sessions
- Edit campaign details

### Data Persistence

All data is stored in your browser's localStorage:
- `dh_campaign` - Campaign information
- `dh_characters` - Character list
- `dh_lore` - Lore entries
- `dh_sessions` - Session log

**Note:** Clearing browser data will delete your campaign. Consider exporting data regularly (feature coming in Phase 2).

## Daggerheart System Data

### Classes (9)
Bard, Druid, Guardian, Ranger, Rogue, Seraph, Sorcerer, Warrior, Wizard

### Domains (9)
Arcana, Blade, Bone, Codex, Grace, Midnight, Sage, Splendor, Valor

### Ancestries (19)
Clank, Daemon, Drakona, Dwarf, Elf, Faerie, Faun, Firbolg, Fungril, Galapa, Giant, Goblin, Halfling, Human, Inferis, Katari, Orc, Ribbet, Simiah

### Communities (9)
Highborne, Loreborne, Orderborne, Ridgeborne, Seaborne, Slyborne, Wanderborne, Wildborne, Underborne

## Project Structure

```
daggerheart-campaign-manager/
├── src/
│   ├── components/
│   │   ├── Characters/        # Character management
│   │   ├── Lore/              # Lore system
│   │   ├── Sessions/          # Session logging
│   │   ├── Dashboard/         # Dashboard view
│   │   ├── Tools/             # Tools & reference
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Modal.jsx          # Reusable modal
│   │   └── DiceRoller.jsx     # Dice roller component
│   ├── hooks/
│   │   ├── useLocalStorage.js # LocalStorage hook
│   │   └── useCampaign.js     # Campaign data hook
│   ├── data/
│   │   └── daggerheart.js     # System data
│   ├── styles/
│   │   └── globals.css        # Global styles
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Customization

### Color Scheme

Edit CSS variables in `src/styles/globals.css`:

```css
:root {
  --hope-color: #eab308;      /* Gold for Player mode */
  --fear-color: #8b5cf6;      /* Purple for DM mode */
  --bg-primary: #0f0f1a;      /* Dark background */
  /* ... more variables */
}
```

### Fonts

The app uses:
- **Cinzel** (serif) for headers
- **Crimson Pro** (serif) for body text

Fonts are loaded from Google Fonts in `index.html`.

## Future Enhancements

### Phase 2
- [ ] Image upload for avatars and lore
- [ ] Markdown support
- [ ] Export/Import campaign data (JSON)
- [ ] Print-friendly session recaps
- [ ] Dark/light theme toggle

### Phase 3
- [ ] Multiple campaigns support
- [ ] Combat tracker with initiative
- [ ] Inventory management
- [ ] Relationship mapping
- [ ] Campaign timeline/calendar
- [ ] Random generators

### Phase 4
- [ ] User authentication
- [ ] Cloud sync
- [ ] Real-time collaboration
- [ ] Shareable campaign links
- [ ] API integrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Resources

- **Daggerheart Official**: [daggerheart.com](https://www.daggerheart.com)
- **Daggerheart SRD**: [Download PDF](https://www.daggerheart.com/wp-content/uploads/2025/05/DH-SRD-May202025.pdf)
- **FreshCutGrass.app**: [freshcutgrass.app](https://freshcutgrass.app)
- **Demiplane NEXUS**: [app.demiplane.com/nexus/daggerheart](https://app.demiplane.com/nexus/daggerheart)

## License

This project is not affiliated with Darrington Press or Critical Role. Daggerheart is a trademark of Darrington Press LLC.

## Credits

Built with love for the Daggerheart community.

Special thanks to:
- FreshCutGrass.app for encounter management tools
- Demiplane for the official character builder
- Darrington Press for creating Daggerheart
