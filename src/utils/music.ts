let musicTimer: ReturnType<typeof setInterval> | undefined;
let audioContext: any;
let soundEnabled = true;

const getContext = () => {
  const AudioContextCtor = (globalThis as any).AudioContext || (globalThis as any).webkitAudioContext;
  if (!AudioContextCtor) return undefined;
  audioContext = audioContext || new AudioContextCtor();
  return audioContext;
};

const playTone = (frequency: number, duration = 0.22, volume = 0.035) => {
  if (!soundEnabled) return;
  const context = getContext();
  if (!context) return;
  if (context.resume) context.resume().catch(() => undefined);
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
};

const playMusicPhrase = () => {
  [392, 523.25, 659.25].forEach((note, index) => setTimeout(() => playTone(note, 0.32, 0.012), index * 340));
};

export const setSoundEffectsEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const setMusicEnabled = (enabled: boolean) => {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = undefined;
  if (!enabled) return;
  playMusicPhrase();
  musicTimer = setInterval(playMusicPhrase, 12000);
};

export const playCorrectSound = () => {
  [523.25, 659.25, 783.99].forEach((note, index) => setTimeout(() => playTone(note, 0.18, 0.032), index * 90));
};

export const playWrongSound = () => {
  playTone(261.63, 0.16, 0.018);
};

export const playRewardSound = () => {
  [659.25, 783.99, 1046.5].forEach((note, index) => setTimeout(() => playTone(note, 0.24, 0.035), index * 110));
};
