/**
 * audio.js - Motor de Sonidos Creativos con Web Audio API y Síntesis de Voz
 * Diseñado especialmente para estudiantes de 4° Básico
 * 100% independiente de archivos externos (funciona sin conexión y sin errores 404)
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.soundEnabled = localStorage.getItem('misTablas_sound') !== 'false';
    this.voiceEnabled = localStorage.getItem('misTablas_voice') !== 'false';
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('misTablas_sound', this.soundEnabled);
    if (this.soundEnabled) this.play('select');
    return this.soundEnabled;
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    localStorage.setItem('misTablas_voice', this.voiceEnabled);
    if (this.voiceEnabled) {
      this.speak('Voz activada. ¡Vamos con todo!');
    }
    return this.voiceEnabled;
  }

  play(type) {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      switch (type) {
        case 'click':
          this._playClick(now);
          break;
        case 'select':
          this._playSelect(now);
          break;
        case 'correct':
          this._playCorrect(now);
          break;
        case 'wrong':
          this._playWrong(now);
          break;
        case 'victory':
          this._playVictory(now);
          break;
        case 'tick':
          this._playTick(now);
          break;
        case 'chest':
          this._playChest(now);
          break;
        case 'cardFlip':
          this._playCardFlip(now);
          break;
        case 'bubble':
          this._playBubble(now);
          break;
        case 'star':
          this._playStar(now);
          break;
        default:
          this._playClick(now);
      }
    } catch (e) {
      console.warn('Audio playback note:', e);
    }
  }

  _playClick(now) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  _playSelect(now) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  _playCorrect(now) {
    // Brillant Major Triad Fanfare (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.08;
      const duration = 0.22;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  _playWrong(now) {
    // Gentle playful slide down (not harsh or discouraging)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(220, now + 0.2);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  _playVictory(now) {
    // Celebratory victory fanfare
    const melody = [
      { f: 523.25, d: 0.12, t: 0.00 }, // C5
      { f: 659.25, d: 0.12, t: 0.12 }, // E5
      { f: 783.99, d: 0.12, t: 0.24 }, // G5
      { f: 1046.50, d: 0.35, t: 0.36 }, // C6
      { f: 880.00, d: 0.12, t: 0.72 }, // A5
      { f: 1046.50, d: 0.50, t: 0.86 }  // C6 grand finale
    ];

    melody.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = now + item.t;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, st);

      gain.gain.setValueAtTime(0.3, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + item.d);
    });
  }

  _playTick(now) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  _playChest(now) {
    // Magic sparkle chords
    const sparkles = [880, 1108.73, 1318.51, 1760];
    sparkles.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, st);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.2, st + 0.3);

      gain.gain.setValueAtTime(0.2, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.3);
    });
  }

  _playCardFlip(now) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  _playBubble(now) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  _playStar(now) {
    const notes = [659.25, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = now + idx * 0.05;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.22, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.18);
    });
  }

  speak(text) {
    if (!this.voiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-CL'; // Spanish (Chile) or fallback Spanish
      utterance.rate = 1.05;
      utterance.pitch = 1.2; // Cheerful, friendly tone for kids

      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang.startsWith('es-CL')) ||
                      voices.find(v => v.lang.startsWith('es-MX')) ||
                      voices.find(v => v.lang.startsWith('es-US')) ||
                      voices.find(v => v.lang.startsWith('es'));
      if (esVoice) {
        utterance.voice = esVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS speech note:', e);
    }
  }
}

// Global audio singleton
window.snd = new SoundEffects();

// Enable audio on first user touch/click anywhere on page
document.addEventListener('click', () => {
  if (window.snd) window.snd.init();
}, { once: true });
