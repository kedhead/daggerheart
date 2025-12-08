import { useLocalStorage } from './useLocalStorage';

const DEFAULT_CAMPAIGN = {
  name: 'My Daggerheart Campaign',
  description: 'A tale of hope and fear...'
};

export function useCampaign() {
  const [campaign, setCampaign] = useLocalStorage('dh_campaign', DEFAULT_CAMPAIGN);
  const [characters, setCharacters] = useLocalStorage('dh_characters', []);
  const [lore, setLore] = useLocalStorage('dh_lore', []);
  const [sessions, setSessions] = useLocalStorage('dh_sessions', []);

  // Campaign methods
  const updateCampaign = (updates) => {
    setCampaign({ ...campaign, ...updates });
  };

  // Character methods
  const addCharacter = (character) => {
    const newCharacter = {
      ...character,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCharacters([...characters, newCharacter]);
    return newCharacter;
  };

  const updateCharacter = (id, updates) => {
    setCharacters(characters.map(char =>
      char.id === id
        ? { ...char, ...updates, updatedAt: new Date().toISOString() }
        : char
    ));
  };

  const deleteCharacter = (id) => {
    setCharacters(characters.filter(char => char.id !== id));
  };

  // Lore methods
  const addLore = (loreEntry) => {
    const newLore = {
      ...loreEntry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setLore([...lore, newLore]);
    return newLore;
  };

  const updateLore = (id, updates) => {
    setLore(lore.map(entry =>
      entry.id === id
        ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
        : entry
    ));
  };

  const deleteLore = (id) => {
    setLore(lore.filter(entry => entry.id !== id));
  };

  // Session methods
  const addSession = (session) => {
    const nextNumber = sessions.length > 0
      ? Math.max(...sessions.map(s => s.number)) + 1
      : 1;

    const newSession = {
      ...session,
      id: crypto.randomUUID(),
      number: nextNumber,
      createdAt: new Date().toISOString()
    };
    setSessions([...sessions, newSession]);
    return newSession;
  };

  const updateSession = (id, updates) => {
    setSessions(sessions.map(session =>
      session.id === id ? { ...session, ...updates } : session
    ));
  };

  const deleteSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return {
    campaign,
    updateCampaign,
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    lore,
    addLore,
    updateLore,
    deleteLore,
    sessions,
    addSession,
    updateSession,
    deleteSession
  };
}
