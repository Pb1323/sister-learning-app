let timer: ReturnType<typeof setInterval> | undefined;
let audioContext: any;

const playTinyChime = () => {
  const AudioContextCtor = (globalThis as any).AudioContext || (globalThis as any).webkitAudioContext;
  if (!AudioContextCtor) return;
  audioContext = audioContext || new AudioContextCtor();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 523.25;
  gain.gain.value = 0.018;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.45);
};

export const setMusicEnabled = (enabled: boolean) => {
  if (timer) clearInterval(timer);
  timer = undefined;
  if (!enabled) return;
  playTinyChime();
  timer = setInterval(playTinyChime, 9000);
};
