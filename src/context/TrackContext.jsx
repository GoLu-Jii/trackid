// src/context/TrackContext.jsx
// Shared institutional/family track state.
// Wrap <App /> in <TrackProvider>, consume with useTrack() in any section.

import { createContext, useContext, useState } from 'react';

const TrackContext = createContext(null);

/**
 * TrackProvider — wraps the app to provide track selection state.
 * activeTrack: 'institutional' | 'family' | null
 */
export function TrackProvider({ children }) {
  const [activeTrack, setActiveTrack] = useState(null);

  return (
    <TrackContext.Provider value={{ activeTrack, setActiveTrack }}>
      {children}
    </TrackContext.Provider>
  );
}

/**
 * useTrack — consumer hook for track state.
 * Returns { activeTrack, setActiveTrack }.
 */
export function useTrack() {
  const context = useContext(TrackContext);
  if (context === null) {
    throw new Error('useTrack must be used within a <TrackProvider>');
  }
  return context;
}
