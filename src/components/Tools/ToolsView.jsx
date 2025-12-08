import { ExternalLink } from 'lucide-react';
import { EXTERNAL_TOOLS, CLASSES, ANCESTRIES, COMMUNITIES } from '../../data/daggerheart';
import './ToolsView.css';

const ICON_MAP = {
  sword: '⚔️',
  sparkles: '✨',
  'user-circle': '👤',
  home: '🏠',
  'book-open': '📖'
};

export default function ToolsView() {
  return (
    <div className="tools-view">
      <div className="view-header">
        <div>
          <h2>Tools & Reference</h2>
          <p className="view-subtitle">External resources and quick reference guides</p>
        </div>
      </div>

      <div className="tools-section">
        <h3>External Tools</h3>
        <div className="external-tools-grid">
          {EXTERNAL_TOOLS.map((tool, index) => (
            <a
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-card card"
            >
              <span className="tool-icon">{ICON_MAP[tool.icon] || '🔗'}</span>
              <div className="tool-content">
                <h4>{tool.name}</h4>
                <p>{tool.description}</p>
              </div>
              <ExternalLink size={20} className="external-icon" />
            </a>
          ))}
        </div>
      </div>

      <div className="reference-grid">
        <div className="tools-section">
          <h3>Classes & Domains</h3>
          <div className="reference-list">
            {Object.entries(CLASSES).map(([className, data]) => (
              <div key={className} className="reference-item card">
                <h4>{className}</h4>
                <div className="domains-list">
                  {data.domains.map(domain => (
                    <span key={domain} className="badge">{domain}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tools-section">
          <h3>Ancestries</h3>
          <div className="reference-tags">
            {ANCESTRIES.map(ancestry => (
              <span key={ancestry} className="badge badge-hope">{ancestry}</span>
            ))}
          </div>

          <h3 style={{marginTop: '2rem'}}>Communities</h3>
          <div className="reference-tags">
            {COMMUNITIES.map(community => (
              <span key={community} className="badge badge-fear">{community}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
