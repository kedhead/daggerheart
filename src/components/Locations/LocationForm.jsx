import { useState } from 'react';
import { Save, X } from 'lucide-react';
import './LocationsView.css';

export default function LocationForm({ location, onSave, onCancel }) {
  const [formData, setFormData] = useState(location || {
    name: '',
    type: 'town',
    region: '',
    description: '',
    notableFeatures: '',
    inhabitants: '',
    secrets: ''
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
    <form className="location-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Location Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., Riverdale, The Dark Woods"
          required
        />
      </div>

      <div className="input-group">
        <label>Type *</label>
        <select
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          required
        >
          <option value="city">City</option>
          <option value="town">Town</option>
          <option value="village">Village</option>
          <option value="dungeon">Dungeon</option>
          <option value="wilderness">Wilderness</option>
          <option value="landmark">Landmark</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-group">
        <label>Region</label>
        <input
          type="text"
          value={formData.region}
          onChange={(e) => handleChange('region', e.target.value)}
          placeholder="e.g., The Northern Kingdoms, Eastern Coast"
        />
      </div>

      <div className="input-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows="4"
          placeholder="General description of the location..."
        />
      </div>

      <div className="input-group">
        <label>Notable Features</label>
        <textarea
          value={formData.notableFeatures}
          onChange={(e) => handleChange('notableFeatures', e.target.value)}
          rows="3"
          placeholder="Important landmarks, buildings, or features..."
        />
      </div>

      <div className="input-group">
        <label>Inhabitants</label>
        <input
          type="text"
          value={formData.inhabitants}
          onChange={(e) => handleChange('inhabitants', e.target.value)}
          placeholder="e.g., Mostly humans, Some elves, Goblin tribe"
        />
      </div>

      <div className="input-group">
        <label>Secrets</label>
        <textarea
          value={formData.secrets}
          onChange={(e) => handleChange('secrets', e.target.value)}
          rows="3"
          placeholder="Hidden information about this location..."
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={16} />
          Save Location
        </button>
      </div>
    </form>
  );
}
