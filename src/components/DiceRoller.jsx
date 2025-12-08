import { useState } from 'react';
import { Sun, Moon, Dices } from 'lucide-react';
import './DiceRoller.css';

export default function DiceRoller({ isDM }) {
  const [modifier, setModifier] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [rollHistory, setRollHistory] = useState([]);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // Simulate dice rolling animation
    setTimeout(() => {
      const hopeDie = Math.floor(Math.random() * 12) + 1;
      const fearDie = Math.floor(Math.random() * 12) + 1;
      const total = Math.max(hopeDie, fearDie) + parseInt(modifier);
      const outcome = hopeDie > fearDie ? 'hope' : hopeDie < fearDie ? 'fear' : 'hope'; // Ties go to Hope

      const roll = {
        hopeDie,
        fearDie,
        modifier: parseInt(modifier),
        total,
        outcome,
        timestamp: new Date().toLocaleTimeString()
      };

      setCurrentRoll(roll);
      setRollHistory([roll, ...rollHistory.slice(0, 9)]); // Keep last 10 rolls
      setIsRolling(false);
    }, 1000);
  };

  return (
    <div className="dice-roller">
      <h3>Duality Dice Roller</h3>

      <div className="dice-controls">
        <div className="modifier-input">
          <label>Modifier</label>
          <input
            type="number"
            value={modifier}
            onChange={(e) => setModifier(e.target.value)}
            min="-5"
            max="10"
          />
        </div>
        <button
          className={`btn btn-primary ${isDM ? 'dm-mode' : ''}`}
          onClick={rollDice}
          disabled={isRolling}
        >
          <Dices size={20} />
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      {currentRoll && (
        <div className={`roll-result ${currentRoll.outcome}`}>
          <div className="dice-display">
            <div className="die hope-die">
              <Sun size={24} />
              <span className="die-value">{currentRoll.hopeDie}</span>
              <span className="die-label">Hope</span>
            </div>
            <div className="die fear-die">
              <Moon size={24} />
              <span className="die-value">{currentRoll.fearDie}</span>
              <span className="die-label">Fear</span>
            </div>
          </div>

          <div className="roll-total">
            <div className="total-value">{currentRoll.total}</div>
            <div className={`outcome-badge ${currentRoll.outcome}`}>
              {currentRoll.outcome === 'hope' ? (
                <>
                  <Sun size={16} />
                  Hope Result
                </>
              ) : (
                <>
                  <Moon size={16} />
                  Fear Result
                </>
              )}
            </div>
          </div>

          {currentRoll.modifier !== 0 && (
            <div className="modifier-display">
              Base: {Math.max(currentRoll.hopeDie, currentRoll.fearDie)} + Modifier: {currentRoll.modifier}
            </div>
          )}
        </div>
      )}

      {rollHistory.length > 0 && (
        <div className="roll-history">
          <h4>Roll History</h4>
          <div className="history-list">
            {rollHistory.map((roll, index) => (
              <div key={index} className="history-item">
                <span className="history-time">{roll.timestamp}</span>
                <span className="history-dice">
                  <Sun size={14} /> {roll.hopeDie} | <Moon size={14} /> {roll.fearDie}
                </span>
                <span className={`history-outcome ${roll.outcome}`}>
                  {roll.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
