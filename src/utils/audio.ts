// Audio synthesizer and speech player for GraphOdyssée

export class MythicAudioPlayer {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private currentSectionIndex: number = 0;
  private sections: { text: string; speaker: string; title: string; timestamp: string }[] = [];
  private onSectionChange?: (index: number) => void;
  private onStateChange?: (playing: boolean, paused: boolean) => void;
  private playbackRate: number = 1.0;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public setCallbacks(
    onSectionChange: (index: number) => void,
    onStateChange: (playing: boolean, paused: boolean) => void
  ) {
    this.onSectionChange = onSectionChange;
    this.onStateChange = onStateChange;
  }

  public setRate(rate: number) {
    this.playbackRate = rate;
    if (this.currentUtterance) {
      // Restart current section with new rate if playing
      if (this.isPlaying && !this.isPaused) {
        this.playSection(this.currentSectionIndex);
      }
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public setVoice(voiceName: string) {
    const voices = this.getAvailableVoices();
    const found = voices.find((v) => v.name === voiceName);
    if (found) {
      this.voice = found;
    }
  }

  public startPodcast(
    sections: { text: string; speaker: string; title: string; timestamp: string }[],
    startIndex: number = 0
  ) {
    if (!this.synth) return;
    this.stop();
    this.sections = sections;
    this.currentSectionIndex = startIndex;
    this.isPlaying = true;
    this.isPaused = false;
    this.onStateChange?.(true, false);
    this.playSection(this.currentSectionIndex);
  }

  public playSection(index: number) {
    if (!this.synth || index < 0 || index >= this.sections.length) {
      this.stop();
      return;
    }

    this.synth.cancel();
    this.currentSectionIndex = index;
    this.onSectionChange?.(index);

    const section = this.sections[index];
    const textToSpeak = `${section.title}. ${section.text}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = this.playbackRate;
    utterance.pitch = 0.95; // slightly deeper mythic resonance

    // Select voice if available
    if (this.voice) {
      utterance.voice = this.voice;
    } else {
      const voices = this.synth.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('UK') || v.name.includes('Male') || v.name.includes('Female'))
      );
      if (preferred) utterance.voice = preferred;
    }

    utterance.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        if (this.currentSectionIndex + 1 < this.sections.length) {
          setTimeout(() => {
            this.playSection(this.currentSectionIndex + 1);
          }, 600);
        } else {
          this.stop();
        }
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.stop();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    this.isPlaying = true;
    this.isPaused = false;
    this.onStateChange?.(true, false);
  }

  public pause() {
    if (!this.synth) return;
    if (this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.onStateChange?.(true, true);
    }
  }

  public resume() {
    if (!this.synth) return;
    if (this.isPlaying && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.onStateChange?.(true, false);
    }
  }

  public togglePlayPause() {
    if (!this.isPlaying) {
      if (this.sections.length > 0) {
        this.startPodcast(this.sections, this.currentSectionIndex);
      }
    } else if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.onStateChange?.(false, false);
  }
}

export const globalAudioPlayer = new MythicAudioPlayer();
