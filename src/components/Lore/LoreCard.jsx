import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit3, Trash2, MapPin, UserCircle, Users, Package, BookOpen, Target, MoreHorizontal, EyeOff } from 'lucide-react';
import './LoreCard.css';

const TYPE_ICONS = {
  location: MapPin,
  npc: UserCircle,
  faction: Users,
  item: Package,
  history: BookOpen,
  quest: Target,
  other: MoreHorizontal
};

export default function LoreCard({ lore, onEdit, onDelete, isDM }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = TYPE_ICONS[lore.type];

  return (
    <div className={`lore-card card ${lore.hidden ? 'hidden-entry' : ''}`}>
      <div className="lore-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="lore-type-icon">
          <Icon size={20} />
        </div>
        <div className="lore-info">
          <div className="lore-title-row">
            <h3>{lore.title}</h3>
            {lore.hidden && isDM && (
              <span className="badge badge-fear">
                <EyeOff size={12} />
                Hidden
              </span>
            )}
          </div>
          <p className="lore-type">{lore.type.charAt(0).toUpperCase() + lore.type.slice(1)}</p>
        </div>
        <button className="btn btn-icon expand-btn">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="lore-details">
          <div className="lore-content">
            {lore.content}
          </div>

          {lore.tags && lore.tags.length > 0 && (
            <div className="lore-tags">
              {lore.tags.map((tag, index) => (
                <span key={index} className="badge">{tag}</span>
              ))}
            </div>
          )}

          {isDM && (
            <div className="lore-actions">
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
