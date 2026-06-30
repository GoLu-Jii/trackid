// src/components/SoundToggle.jsx
// Sound toggle for ambient audio — used in Hero (Section 01)
// Toggles playback state/mute, uses Lucide icons for clean, scaleable rendering.

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * SoundToggle — controls ambient audio playback.
 * 
 * @param {object} props
 * @param {string} [props.audioUrl] - optional URL of ambient audio track to play
 * @param {boolean} [props.isMuted] - controlled muted state
 * @param {function} [props.onToggle] - callback when toggle clicked
 * @param {string} [props.className] - additional CSS classes
 */
export default function SoundToggle({
  audioUrl = '/assets/audio/ambient-hero.mp3', // placeholder path
  isMuted: controlledMuted,
  onToggle,
  className = '',
}) {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  // If component is controlled, sync muted state, otherwise use internal state
  const isCurrentlyMuted = controlledMuted !== undefined ? controlledMuted : muted;

  const handleToggle = () => {
    const nextMuted = !isCurrentlyMuted;
    
    if (controlledMuted === undefined) {
      setMuted(nextMuted);
    }
    
    if (onToggle) {
      onToggle(nextMuted);
    }
  };

  useEffect(() => {
    if (!audioUrl || !audioRef.current) return;

    if (isCurrentlyMuted) {
      audioRef.current.pause();
    } else {
      // Play audio. Autoplay policies require user interaction first,
      // which clicking this button provides.
      audioRef.current.play().catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('[SoundToggle] Audio playback failed:', err);
      });
    }
  }, [isCurrentlyMuted, audioUrl]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
          preload="auto"
        />
      )}
      <button
        onClick={handleToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-ink/20 text-ink bg-parchment/40 backdrop-blur-sm hover:bg-ink hover:text-parchment hover:border-ink transition-all duration-300 shadow-sm"
        aria-label={isCurrentlyMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isCurrentlyMuted ? (
          <VolumeX className="w-4 h-4 transition-transform duration-200 hover:scale-110" />
        ) : (
          <Volume2 className="w-4 h-4 transition-transform duration-200 hover:scale-110" />
        )}
      </button>
    </div>
  );
}
