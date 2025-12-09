import { useState } from 'react';
import { Save, X } from 'lucide-react';
import './TimelineView.css';

export default function TimelineEventForm({ event, onSave, onCancel }) {
  const [formData, setFormData] = useState(event || {
    title: '',
    date: '',
    location: '',
    type: 'event',
    description: '',
    participants: '',
    outcome: ''
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
    <form className="timeline-event-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Event Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., The Battle of Stonewood"
          required
        />
      </div>

      <div className="input-group">
        <label>In-Game Date</label>
        <input
          type="text"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          placeholder="e.g., Day 15 of Summer, Year 1024"
        />
        <small className="input-hint">
          Use any format that makes sense for your campaign
        </small>
      </div>

      <div className="input-group">
        <label>Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., Stonewood Forest, The Royal Palace"
        />
      </div>

      <div className="input-group">
        <label>Event Type *</label>
        <select
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          required
        >
          <option value="event">Event</option>
          <option value="quest">Quest</option>
          <option value="milestone">Milestone</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows="4"
          placeholder="What happened during this event?"
        />
      </div>

      <div className="input-group">
        <label>Participants</label>
        <input
          type="text"
          value={formData.participants}
          onChange={(e) => handleChange('participants', e.target.value)}
          placeholder="e.g., The party, King Aldric, Guards"
        />
      </div>

      <div className="input-group">
        <label>Outcome</label>
        <textarea
          value={formData.outcome}
          onChange={(e) => handleChange('outcome', e.target.value)}
          rows="3"
          placeholder="What was the result or consequence?"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={16} />
          Save Event
        </button>
      </div>
    </form>
  );
}
