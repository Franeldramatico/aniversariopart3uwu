'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AudioControl() {
  const [playing, setPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startAmbientSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    // Crear ambiente romántico con frecuencias suaves
    const frequencies = [220, 329.63, 440]; // A3, E4, A4 - acorde de La menor suave
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(audioContext.destination);
    gainRef.current = gainNode;

    frequencies.forEach((freq) => {
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      oscGain.gain.value = 0.03; // Volumen muy suave
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      
      oscillatorsRef.current.push(osc);
    });

    // Fade in suave
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 2);
  };

  const stopAmbientSound = () => {
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => osc.stop());
        oscillatorsRef.current = [];
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      }, 1100);
    }
  };

  const toggleAudio = () => {
    if (playing) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-6 right-20 z-50 p-3 rounded-full bg-black/30 border border-rose/20 backdrop-blur-sm text-rose hover:scale-110 transition-all duration-300 pointer-events-auto"
      aria-label="Toggle Audio"
      style={{ boxShadow: playing ? '0 0 20px rgba(247, 37, 133, 0.3)' : 'none' }}
    >
      {playing ? (
        <span className="text-2xl drop-shadow-[0_0_5px_rgba(247,37,133,0.8)]">♫</span>
      ) : (
        <span className="text-2xl opacity-60">♪</span>
      )}
    </button>
  );
}
