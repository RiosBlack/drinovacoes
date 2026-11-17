"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "../_i18n/LanguageProvider";

const STORAGE_KEY = "dr-v2-bg-muted";
const AUDIO_SRC = "/v2/bg-music.mp3";
const DEFAULT_VOLUME = 0.35;

type BackgroundAudioContextValue = {
  muted: boolean;
  playing: boolean;
  toggleMute: () => void;
};

const BackgroundAudioContext =
  createContext<BackgroundAudioContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  /** Só toca depois que o preloader terminar */
  active: boolean;
};

export function BackgroundAudioProvider({ children, active }: ProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  // Restaura preferência de mute
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "1") {
      setMuted(true);
      mutedRef.current = true;
    }
  }, []);

  // Cria o elemento de áudio uma vez
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.setAttribute("loop", "");
    audio.preload = "auto";
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    // Fallback: se o browser ignorar `loop`, reinicia no fim
    const onEnded = () => {
      if (mutedRef.current) return;
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || mutedRef.current) return;
    try {
      audio.muted = false;
      await audio.play();
    } catch {
      // Autoplay bloqueado — libera no próximo gesto do usuário
      const unlock = () => {
        if (mutedRef.current) return;
        void audio.play().catch(() => undefined);
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
      };
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
    }
  }, []);

  // Inicia depois do preloader
  useEffect(() => {
    if (!active) return;
    void tryPlay();
  }, [active, tryPlay]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");

    if (!audio) return;

    if (next) {
      audio.pause();
    } else {
      audio.muted = false;
      void audio.play().catch(() => undefined);
    }
  }, []);

  const value = useMemo(
    () => ({ muted, playing, toggleMute }),
    [muted, playing, toggleMute],
  );

  return (
    <BackgroundAudioContext.Provider value={value}>
      {children}
    </BackgroundAudioContext.Provider>
  );
}

export function useBackgroundAudio() {
  const ctx = useContext(BackgroundAudioContext);
  if (!ctx) {
    throw new Error(
      "useBackgroundAudio must be used within BackgroundAudioProvider",
    );
  }
  return ctx;
}

/** Botão mute/unmute — fica ao lado do seletor de idioma */
export function AudioToggle({ className = "" }: { className?: string }) {
  const { muted, toggleMute } = useBackgroundAudio();
  const { t } = useLanguage();
  const Icon = muted ? VolumeX : Volume2;

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted ? t("audio.unmute") : t("audio.mute")}
      aria-pressed={muted}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-[#19E57B] hover:text-[#19E57B] ${className}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
