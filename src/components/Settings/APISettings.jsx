import { useState } from 'react';
import { Eye, EyeOff, Check, X, Key, ExternalLink } from 'lucide-react';
import { useAPIKey } from '../../hooks/useAPIKey';
import { aiService } from '../../services/aiService';
import './APISettings.css';

export default function APISettings({ userId }) {
  const { keys, saveKey, removeKey, hasKey } = useAPIKey(userId);
  const [showAnthropicKey, setShowAnthropicKey] = useState(false);
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [anthropicInput, setAnthropicInput] = useState('');
  const [openAIInput, setOpenAIInput] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSaveAnthropicKey = async () => {
    if (!anthropicInput.trim()) return;

    setSaving(true);
    try {
      await saveKey('anthropic', anthropicInput.trim());
      setAnthropicInput('');
      alert('Anthropic API key saved successfully!');
    } catch (err) {
      alert('Failed to save API key: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveOpenAIKey = async () => {
    if (!openAIInput.trim()) return;

    setSaving(true);
    try {
      await saveKey('openai', openAIInput.trim());
      setOpenAIInput('');
      alert('OpenAI API key saved successfully!');
    } catch (err) {
      alert('Failed to save API key: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveKey = async (provider) => {
    if (confirm(`Are you sure you want to remove your ${provider} API key?`)) {
      await removeKey(provider);
    }
  };

  const handleTestAPI = async (provider) => {
    setTesting(true);
    setTestResult(null);

    try {
      const key = provider === 'anthropic' ? keys.anthropic : keys.openai;
      const testPrompt = 'Say "Hello! API connection successful." and nothing else.';

      const response = await aiService.generate(testPrompt, key, provider);

      if (response && response.length > 0) {
        setTestResult({ success: true, message: 'API connection successful!', response });
      } else {
        setTestResult({ success: false, message: 'API returned empty response' });
      }
    } catch (err) {
      setTestResult({ success: false, message: err.message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="api-settings">
      <div className="settings-header">
        <h2>API Settings</h2>
        <p className="settings-subtitle">Configure your AI API keys for seamless generation</p>
      </div>

      <div className="api-info card">
        <h3>About API Keys</h3>
        <p>API keys are stored encrypted in your browser's local storage and never sent to our servers. You'll need to bring your own API key from either Anthropic or OpenAI to use the Direct API generation mode.</p>
        <ul>
          <li><strong>Free alternative:</strong> Use "Prompt Generator" mode instead - no API key required!</li>
          <li><strong>Cost:</strong> You only pay for what you use directly to the AI provider</li>
          <li><strong>Privacy:</strong> Keys are encrypted with your user ID and stored locally only</li>
        </ul>
      </div>

      {/* Anthropic API Key */}
      <div className="api-section card">
        <div className="api-section-header">
          <div>
            <h3>Anthropic (Claude)</h3>
            <p className="api-description">Use Claude 3.5 Sonnet for AI generation</p>
          </div>
          {hasKey('anthropic') && (
            <div className="key-status success">
              <Check size={16} />
              Key Configured
            </div>
          )}
        </div>

        {!hasKey('anthropic') ? (
          <div className="key-input-section">
            <div className="form-group">
              <label>Anthropic API Key</label>
              <div className="key-input-wrapper">
                <input
                  type={showAnthropicKey ? 'text' : 'password'}
                  value={anthropicInput}
                  onChange={(e) => setAnthropicInput(e.target.value)}
                  placeholder="sk-ant-..."
                  className="key-input"
                />
                <button
                  className="btn-icon"
                  onClick={() => setShowAnthropicKey(!showAnthropicKey)}
                  type="button"
                >
                  {showAnthropicKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <small className="form-hint">
                Get your API key from{' '}
                <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">
                  console.anthropic.com
                  <ExternalLink size={12} style={{ marginLeft: '4px' }} />
                </a>
              </small>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSaveAnthropicKey}
              disabled={!anthropicInput.trim() || saving}
            >
              <Key size={20} />
              {saving ? 'Saving...' : 'Save Anthropic Key'}
            </button>
          </div>
        ) : (
          <div className="key-actions">
            <button
              className="btn btn-secondary"
              onClick={() => handleTestAPI('anthropic')}
              disabled={testing}
            >
              {testing ? 'Testing...' : 'Test Connection'}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveKey('anthropic')}
            >
              Remove Key
            </button>
          </div>
        )}
      </div>

      {/* OpenAI API Key */}
      <div className="api-section card">
        <div className="api-section-header">
          <div>
            <h3>OpenAI (GPT-4)</h3>
            <p className="api-description">Use GPT-4 Turbo for AI generation</p>
          </div>
          {hasKey('openai') && (
            <div className="key-status success">
              <Check size={16} />
              Key Configured
            </div>
          )}
        </div>

        {!hasKey('openai') ? (
          <div className="key-input-section">
            <div className="form-group">
              <label>OpenAI API Key</label>
              <div className="key-input-wrapper">
                <input
                  type={showOpenAIKey ? 'text' : 'password'}
                  value={openAIInput}
                  onChange={(e) => setOpenAIInput(e.target.value)}
                  placeholder="sk-..."
                  className="key-input"
                />
                <button
                  className="btn-icon"
                  onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                  type="button"
                >
                  {showOpenAIKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <small className="form-hint">
                Get your API key from{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                  platform.openai.com
                  <ExternalLink size={12} style={{ marginLeft: '4px' }} />
                </a>
              </small>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSaveOpenAIKey}
              disabled={!openAIInput.trim() || saving}
            >
              <Key size={20} />
              {saving ? 'Saving...' : 'Save OpenAI Key'}
            </button>
          </div>
        ) : (
          <div className="key-actions">
            <button
              className="btn btn-secondary"
              onClick={() => handleTestAPI('openai')}
              disabled={testing}
            >
              {testing ? 'Testing...' : 'Test Connection'}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveKey('openai')}
            >
              Remove Key
            </button>
          </div>
        )}
      </div>

      {/* Test Result */}
      {testResult && (
        <div className={`test-result card ${testResult.success ? 'success' : 'error'}`}>
          <div className="test-result-header">
            {testResult.success ? <Check size={20} /> : <X size={20} />}
            <strong>{testResult.success ? 'Success!' : 'Failed'}</strong>
          </div>
          <p>{testResult.message}</p>
          {testResult.response && (
            <div className="test-response">
              <small>Response:</small>
              <code>{testResult.response.substring(0, 100)}...</code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
