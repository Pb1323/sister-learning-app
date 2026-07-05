import React, { createContext, useContext, useEffect, useState } from 'react';
import { Settings, defaultSettings, getSettings, saveSettings } from '../utils/storage';
import { setSpeechEnabled } from '../utils/speech';

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    getSettings().then((s) => {
      setSettings(s);
      setSpeechEnabled(s.soundOn);
    });
  }, []);

  const updateSettings = (partial: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      setSpeechEnabled(next.soundOn);
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const buttonSizeToDimension: Record<Settings['buttonSize'], number> = {
  medium: 100,
  large: 130,
  extraLarge: 165,
};
