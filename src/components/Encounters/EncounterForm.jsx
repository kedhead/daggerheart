import { useState } from 'react';
import { Save, X, ExternalLink } from 'lucide-react';
import './EncountersView.css';

export default function EncounterForm({ encounter, onSave, onCancel }) {
  const [formData, setFormData] = useState(encounter || {
    name: '',
    difficulty: 'medium',
    partyLevel: '',
    description: '',
    enemies: '',
    environment: '',
    tactics: '',
    rewards: '',
    freshcutgrassLink: ''
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="encounter-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Encounter Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., Goblin Ambush, Dragon's Lair"
          required
        />
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Difficulty *</label>
          <select
            value={formData.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="deadly">Deadly</option>
          </select>
        </div>

        <div className="input-group">
          <label>Party Level</label>
          <input
            type="number"
            value={formData.partyLevel}
            onChange={(e) => handleChange('partyLevel', e.target.value)}
            placeholder="e.g., 3"
            min="1"
            max="20"
          />
        </div>
      </div>

      <div className="input-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows="3"
          placeholder="Brief description of the encounter setup..."
        />
      </div>

      <div className="input-group">
        <label>Enemies</label>
        <textarea
          value={formData.enemies}
          onChange={(e) => handleChange('enemies', e.target.value)}
          rows="4"
          placeholder="List enemies and their quantities, e.g., '3x Goblin Warriors, 1x Goblin Shaman'"
        />
      </div>

      <div className="input-group">
        <label>Environment</label>
        <input
          type="text"
          value={formData.environment}
          onChange={(e) => handleChange('environment', e.target.value)}
          placeholder="e.g., Forest clearing, Cave entrance, Ruined castle"
        />
      </div>

      <div className="input-group">
        <label>Tactics</label>
        <textarea
          value={formData.tactics}
          onChange={(e) => handleChange('tactics', e.target.value)}
          rows="3"
          placeholder="How enemies behave in combat, special strategies..."
        />
      </div>

      <div className="input-group">
        <label>Rewards</label>
        <textarea
          value={formData.rewards}
          onChange={(e) => handleChange('rewards', e.target.value)}
          rows="2"
          placeholder="Loot, experience, story rewards..."
        />
      </div>

      <div className="input-group">
        <label>
          <ExternalLink size={16} />
          FreshCutGrass Link
        </label>
        <input
          type="url"
          value={formData.freshcutgrassLink}
          onChange={(e) => handleChange('freshcutgrassLink', e.target.value)}
          placeholder="https://freshcutgrass.app/encounter/..."
        />
        <small className="input-hint">
          Link to the full encounter on FreshCutGrass for detailed stats
        </small>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={16} />
          Save Encounter
        </button>
      </div>
    </form>
  );
}
