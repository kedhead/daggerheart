# Quick Start Guide

## Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production (Optional)
```bash
npm run build
npm run preview
```

## First Steps

### 1. Toggle to DM Mode
- Click the **DM** button in the sidebar (purple Crown icon)
- This unlocks all editing features

### 2. Customize Your Campaign
- Click the edit icon on the Dashboard
- Update campaign name and description

### 3. Add Your First Character
- Navigate to **Characters** in the sidebar
- Click **Add Character**
- Fill in character details:
  - Name, Class, Subclass, Level
  - Ancestry & Community
  - Traits (Agility, Strength, Finesse, Instinct, Presence, Knowledge)
  - HP/Stress slots (click to toggle filled/empty)
  - Evasion, Armor, Primary Domain
  - Experiences (optional)
  - Demiplane sheet link (optional)
  - Backstory (optional)
  - DM Notes (DM-only, optional)

### 4. Build Your World
- Navigate to **Lore** in the sidebar
- Click **Add Lore**
- Choose entry type (Location, NPC, Faction, Item, History, Quest, Other)
- Add tags for easy filtering
- Toggle "Hidden" to make it DM-only

### 5. Log Your First Session
- Navigate to **Sessions** in the sidebar
- Click **Log Session**
- Add title, date, summary, and highlights
- Session numbers auto-increment
- Add private DM notes if needed

### 6. Roll Some Dice!
- Access the dice roller from the Dashboard
- Set your modifier (+/- value)
- Click **Roll Dice**
- See Hope vs Fear outcome
- View roll history

## Tips & Tricks

### Player Mode
- Switch to Player Mode to see what your players see
- Hidden lore and DM notes are automatically hidden
- Characters and sessions still visible

### Data Management
- All data is stored in browser localStorage
- Data persists across sessions
- Clearing browser data will delete everything
- **Future update**: Export/import JSON backups

### Character Tracking
- HP/Stress slots: Click to toggle filled/empty state
- Use Demiplane links to quickly access full character sheets
- DM Notes are perfect for tracking character secrets

### Lore Organization
- Use tags liberally for cross-referencing
- Mark sensitive information as "Hidden"
- Search works across titles, content, and tags

### Session Planning
- Log sessions immediately after playing while memories are fresh
- Use highlights to capture key moments
- DM notes can track unresolved plot threads

## Keyboard Shortcuts

Currently none implemented, but great addition for Phase 2!

## Troubleshooting

### Data Not Saving
- Check browser localStorage is enabled
- Try a different browser if issues persist
- Data is browser-specific (won't sync across devices yet)

### Styling Issues
- Clear browser cache and hard refresh (Ctrl+F5)
- Ensure fonts are loading from Google Fonts

### Build Errors
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 16 or higher

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the [Daggerheart SRD](https://www.daggerheart.com/wp-content/uploads/2025/05/DH-SRD-May202025.pdf)
- Visit external tools:
  - [FreshCutGrass.app](https://freshcutgrass.app)
  - [Demiplane NEXUS](https://app.demiplane.com/nexus/daggerheart)

Happy adventuring! 🗡️✨
