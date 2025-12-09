import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { CLASSES, ANCESTRIES, COMMUNITIES, DOMAINS, TRAIT_RANGE } from '../../data/daggerheart';
import './CharacterForm.css';

export default function CharacterForm({ character, onSave, onCancel, isDM, currentUserId }) {
  const [formData, setFormData] = useState(character || {
    name: '',
    playerName: '',
    avatarUrl: '',
    class: 'Bard',
    subclass: '',
    level: 1,
    ancestry: 'Human',
    community: 'Wanderborne',
    traits: {
      agility: 0,
      strength: 0,
      finesse: 0,
      instinct: 0,
      presence: 0,
      knowledge: 0
    },
    hpSlots: [true, true, true, true, true, true],
    stressSlots: [false, false, false, false, false, false],
    evasion: 10,
    armor: 0,
    primaryDomain: 'Codex',
    experiences: [],
    demiplaneLink: '',
    backstory: '',
    dmNotes: ''
  });

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [experienceInput, setExperienceInput] = useState('');

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleSlotToggle = (type, index) => {
    const slots = [...formData[type]];
    slots[index] = !slots[index];
    setFormData({ ...formData, [type]: slots });
  };

  const addExperience = () => {
    if (experienceInput.trim()) {
      setFormData({
        ...formData,
        experiences: [...formData.experiences, experienceInput.trim()]
      });
      setExperienceInput('');
    }
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter((_, i) => i !== index)
    });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 1MB for avatars)
      if (file.size > 1 * 1024 * 1024) {
        alert('Avatar size must be less than 1MB');
        return;
      }

      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setUploadingAvatar(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          avatarUrl: e.target.result
        });
        setUploadingAvatar(false);
      };
      reader.onerror = () => {
        alert('Failed to upload avatar');
        setUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const availableDomains = CLASSES[formData.class]?.domains || DOMAINS;

  return (
    <form className="character-form" onSubmit={handleSubmit}>
      {/* Avatar Section */}
      <div className="avatar-section">
        <div className="avatar-preview">
          {formData.avatarUrl ? (
            <img src={formData.avatarUrl} alt="Character avatar" />
          ) : (
            <div className="avatar-placeholder">
              <span>No Avatar</span>
            </div>
          )}
        </div>
        <div className="avatar-upload">
          <label className="btn btn-secondary">
            {uploadingAvatar ? 'Uploading...' : 'Upload Avatar'}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploadingAvatar}
              style={{ display: 'none' }}
            />
          </label>
          {formData.avatarUrl && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleChange('avatarUrl', '')}
            >
              Remove
            </button>
          )}
          <small className="form-hint">Max 1MB, square images work best</small>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Character Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., Aria Stormblade"
            required
          />
        </div>

        <div className="input-group">
          <label>Player Name</label>
          <input
            type="text"
            value={formData.playerName}
            onChange={(e) => handleChange('playerName', e.target.value)}
            placeholder="Your real name"
          />
        </div>

        <div className="input-group">
          <label>Class *</label>
          <select
            value={formData.class}
            onChange={(e) => handleChange('class', e.target.value)}
            required
          >
            {Object.keys(CLASSES).map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Subclass</label>
          <input
            type="text"
            value={formData.subclass}
            onChange={(e) => handleChange('subclass', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Level *</label>
          <input
            type="number"
            value={formData.level}
            onChange={(e) => handleChange('level', parseInt(e.target.value))}
            min="1"
            max="20"
            required
          />
        </div>

        <div className="input-group">
          <label>Ancestry *</label>
          <select
            value={formData.ancestry}
            onChange={(e) => handleChange('ancestry', e.target.value)}
            required
          >
            {ANCESTRIES.map(ancestry => (
              <option key={ancestry} value={ancestry}>{ancestry}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Community *</label>
          <select
            value={formData.community}
            onChange={(e) => handleChange('community', e.target.value)}
            required
          >
            {COMMUNITIES.map(community => (
              <option key={community} value={community}>{community}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="traits-section">
        <h4>Traits</h4>
        <div className="traits-form-grid">
          {Object.keys(formData.traits).map(trait => (
            <div key={trait} className="input-group">
              <label>{trait.charAt(0).toUpperCase() + trait.slice(1)}</label>
              <select
                value={formData.traits[trait]}
                onChange={(e) => handleChange(`traits.${trait}`, parseInt(e.target.value))}
              >
                {TRAIT_RANGE.map(val => (
                  <option key={val} value={val}>
                    {val >= 0 ? '+' : ''}{val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="slots-section">
        <div className="slot-group">
          <h4>HP Slots</h4>
          <div className="slot-toggles">
            {formData.hpSlots.map((filled, index) => (
              <button
                key={index}
                type="button"
                className={`slot-toggle ${filled ? 'filled' : 'empty'} hp`}
                onClick={() => handleSlotToggle('hpSlots', index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="slot-group">
          <h4>Stress Slots</h4>
          <div className="slot-toggles">
            {formData.stressSlots.map((filled, index) => (
              <button
                key={index}
                type="button"
                className={`slot-toggle ${filled ? 'filled' : 'empty'} stress`}
                onClick={() => handleSlotToggle('stressSlots', index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Evasion</label>
          <input
            type="number"
            value={formData.evasion}
            onChange={(e) => handleChange('evasion', parseInt(e.target.value))}
            min="0"
          />
        </div>

        <div className="input-group">
          <label>Armor</label>
          <input
            type="number"
            value={formData.armor}
            onChange={(e) => handleChange('armor', parseInt(e.target.value))}
            min="0"
          />
        </div>

        <div className="input-group full-width">
          <label>Primary Domain *</label>
          <select
            value={formData.primaryDomain}
            onChange={(e) => handleChange('primaryDomain', e.target.value)}
            required
          >
            {availableDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="experiences-form-section">
        <h4>Experiences</h4>
        <div className="experience-input-group">
          <input
            type="text"
            value={experienceInput}
            onChange={(e) => setExperienceInput(e.target.value)}
            placeholder="Add experience..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExperience())}
          />
          <button type="button" className="btn btn-secondary" onClick={addExperience}>
            Add
          </button>
        </div>
        {formData.experiences.length > 0 && (
          <div className="experiences-tags">
            {formData.experiences.map((exp, index) => (
              <span key={index} className="badge">
                {exp}
                <button type="button" onClick={() => removeExperience(index)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="input-group">
        <label>Demiplane Character Sheet Link</label>
        <input
          type="url"
          value={formData.demiplaneLink}
          onChange={(e) => handleChange('demiplaneLink', e.target.value)}
          placeholder="https://app.demiplane.com/..."
        />
      </div>

      <div className="input-group">
        <label>Backstory</label>
        <textarea
          value={formData.backstory}
          onChange={(e) => handleChange('backstory', e.target.value)}
          rows="4"
        />
      </div>

      {isDM && (
        <div className="input-group">
          <label>DM Notes (DM Only)</label>
          <textarea
            value={formData.dmNotes}
            onChange={(e) => handleChange('dmNotes', e.target.value)}
            rows="3"
          />
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={16} />
          Save Character
        </button>
      </div>
    </form>
  );
}
