import { useCallback, useRef, useState } from 'react';

function createBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): () => void {
  return () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };
}

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const lastAlertRef = useRef<string>('');

  const playOpenSound = useCallback(() => {
    if (!soundEnabled) return;
    const play = createBeep(880, 0.3, 'sine');
    play();
    setTimeout(() => createBeep(1100, 0.3, 'sine')(), 150);
    setTimeout(() => createBeep(1320, 0.5, 'sine')(), 300);
  }, [soundEnabled]);

  const playCloseSound = useCallback(() => {
    if (!soundEnabled) return;
    const play = createBeep(660, 0.3, 'triangle');
    play();
    setTimeout(() => createBeep(440, 0.3, 'triangle')(), 150);
    setTimeout(() => createBeep(330, 0.5, 'triangle')(), 300);
  }, [soundEnabled]);

  const checkAndAlert = useCallback((sessionId: string, type: 'open' | 'close') => {
    const key = `${sessionId}-${type}`;
    if (lastAlertRef.current === key) return;
    lastAlertRef.current = key;
    if (type === 'open') playOpenSound();
    else playCloseSound();
  }, [playOpenSound, playCloseSound]);

  return { soundEnabled, setSoundEnabled, playOpenSound, playCloseSound, checkAndAlert };
}
