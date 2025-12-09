import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit3, Trash2, ExternalLink, Swords } from 'lucide-react';
import './EncountersView.css';

export default function EncounterCard({ encounter, onEdit, onDelete, isDM }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      case 'deadly':
        return 'difficulty-deadly';
      default:
        return 'difficulty-medium';
    }
  };

  return (
    <div className="encounter-card card">
      <div className="encounter-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="encounter-icon">
          <Swords size={24} />
        </div>
        <div className="encounter-info">
          <h3>{encounter.name}</h3>
          <span className={`difficulty-badge ${getDifficultyColor(encounter.difficulty)}`}>
            {encounter.difficulty || 'medium'}
          </span>
          {encounter.partyLevel && (
            <p className="encounter-level">Recommended for Level {encounter.partyLevel}</p>
          )}
        </div>
        <button className="btn btn-icon expand-btn">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="encounter-details">
          {encounter.description && (
            <div className="encounter-section">
              <h4>Description</h4>
              <p>{encounter.description}</p>
            </div>
          )}

          {encounter.enemies && (
            <div className="encounter-section">
              <h4>Enemies</h4>
              <p>{encounter.enemies}</p>
            </div>
          )}

          {encounter.environment && (
            <div className="encounter-section">
              <h4>Environment</h4>
              <p>{encounter.environment}</p>
            </div>
          )}

          {encounter.tactics && (
            <div className="encounter-section">
              <h4>Tactics</h4>
              <p>{encounter.tactics}</p>
            </div>
          )}

          {encounter.rewards && (
            <div className="encounter-section">
              <h4>Rewards</h4>
              <p>{encounter.rewards}</p>
            </div>
          )}

          {encounter.freshcutgrassLink && (
            <div className="encounter-section">
              <a
                href={encounter.freshcutgrassLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary full-width"
              >
                <ExternalLink size={16} />
                Open in FreshCutGrass
              </a>
            </div>
          )}

          {isDM && (
            <div className="encounter-actions">
              <button className="btn btn-secondary" onClick={onEdit}>
                <Edit3 size={16} />
                Edit
              </button>
              <button className="btn btn-danger" onClick={onDelete}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
