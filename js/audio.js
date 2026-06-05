/**
 * Tiny synthesized audio engine for the maze — no asset files, all WebAudio.
 * Ambient drone + footsteps + pickup chime + station-arrival chord.
 * Must be init()'d from a user gesture (the "Enter lab" click).
 */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this._ambient = null;
    this._musicStep = 0;
    this._musicTimer = null;
    this.volume = 0.85;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.master.connect(this.ctx.destination);
    this._startAmbient();
    this._startMusic();
  }

  setMuted(m) {
    this.muted = m;
    if (!this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.linearRampToValueAtTime(m ? 0 : this.volume, now + 0.2);
  }

  toggleMute() {
    this.init();
    this.setMuted(!this.muted);
    return this.muted;
  }

  _startAmbient() {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.value = 0.05;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 240;
    const o1 = ctx.createOscillator();
    o1.type = "triangle";
    o1.frequency.value = 50;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = 50.4;
    o1.connect(lp);
    o2.connect(lp);
    lp.connect(g);
    g.connect(this.master);
    // slow shimmer on the cutoff so the drone breathes
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 90;
    lfo.connect(lfoG);
    lfoG.connect(lp.frequency);
    o1.start();
    o2.start();
    lfo.start();
    this._ambient = { o1, o2, lfo };
  }

  _blip(freq, dur, type = "sine", vol = 0.1, when = 0) {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.03);
  }

  step(sprint) {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = sprint ? 168 : 128;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + 0.11);
  }

  // Soft sustained pad note for the background-music chords.
  _pad(freq, when = 0) {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = freq;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1300;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.04, t + 0.8); // slow attack
    g.gain.linearRampToValueAtTime(0.03, t + 2.6); // sustain
    g.gain.linearRampToValueAtTime(0.0001, t + 3.7); // release
    o.connect(lp);
    lp.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + 3.8);
  }

  // Gentle looping chord progression (Am – F – C – G) as ambient background music.
  _startMusic() {
    const prog = [
      [220.0, 261.63, 329.63], // Am
      [174.61, 220.0, 261.63], // F
      [261.63, 329.63, 392.0], // C
      [196.0, 246.94, 293.66], // G
    ];
    const playBar = () => {
      const chord = prog[this._musicStep % prog.length];
      chord.forEach((f, k) => this._pad(f, k * 0.05));
      // sparse arpeggio an octave up
      chord.forEach((f, k) => this._blip(f * 2, 0.4, "sine", 0.018, 1.2 + k * 0.5));
      this._musicStep++;
    };
    playBar();
    this._musicTimer = setInterval(playBar, 3800);
  }

  arrive() {
    [523.25, 659.25, 783.99].forEach((f, i) => this._blip(f, 0.5, "sine", 0.07, i * 0.05));
  }
}
