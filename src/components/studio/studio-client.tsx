"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";
import type { SongGenerateInput, SongGenerateResult } from "@/lib/song/types";

const DEFAULT_PROMPT =
  "warm children song, acoustic instruments, gentle storytelling melody, family-safe content, clean vocal pronunciation";

const GENRES = ["Lullaby", "Pop", "Folk", "Orchestral", "Jazz", "Techno", "Lo-fi", "Rock", "Ambient", "Reggae"];
const MOODS = ["happy", "calm", "playful", "mysterious", "epic", "cute", "sad", "energetic", "spooky", "dreamy"];
const SCENES = ["Forest", "Space", "Ocean", "Castle", "City", "Classroom", "Playground", "Nighttime", "Farm", "Jungle"];
const VOCALS = ["Female vocal", "Male vocal", "Child voice", "Choir", "Rap", "Instrumental"];
const VOCAL_STYLES = [
  "soft, gentle delivery",
  "powerful, belted",
  "whispery, breathy",
  "cartoon, expressive",
  "tender, motherly",
  "operatic, theatrical",
];

const GUEST_LIMIT_KEY = "songcraft_guest_generation_count";

function randomInt() {
  return Math.floor(Math.random() * 999_999_999);
}

function readGuestCount() {
  if (typeof window === "undefined") {
    return 0;
  }
  const count = Number(window.localStorage.getItem(GUEST_LIMIT_KEY) ?? "0");
  return Number.isFinite(count) ? count : 0;
}

function incrementGuestCount() {
  if (typeof window === "undefined") {
    return;
  }
  const count = readGuestCount() + 1;
  window.localStorage.setItem(GUEST_LIMIT_KEY, String(count));
}

export function StudioClient({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState<SongGenerateInput>({
    basePrompt: DEFAULT_PROMPT,
    lyrics: "",
    lyricsMode: "use",
    genre: null,
    moods: [],
    scene: null,
    vocalType: "Female vocal",
    vocalStyles: ["soft, gentle delivery"],
    language: "en",
    accent: "US",
    bpm: 90,
    energy: 40,
    keyScale: "G major",
    length: 30,
    structure: "Verse+Chorus",
    complexity: 35,
    seed: 31,
    vibeLock: false,
    kidSafe: true,
    timeSignature: "4",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SongGenerateResult | null>(null);

  const tagPreview = useMemo(() => {
    return [
      form.basePrompt,
      form.genre,
      form.moods.join(", "),
      form.scene,
      form.vocalType,
      form.vocalStyles.join(", "),
      form.structure,
      form.kidSafe ? "kid-safe" : "standard",
    ]
      .filter(Boolean)
      .join(" | ");
  }, [form]);

  async function onGenerate() {
    setError(null);

    if (!isAuthenticated && readGuestCount() >= 1) {
      setError("Guest users can generate only one song. Login/register to continue.");
      return;
    }

    setIsGenerating(true);
    try {
      const payload: SongGenerateInput = {
        ...form,
        seed: form.vibeLock ? form.seed : randomInt(),
      };

      const response = await fetch("/api/songs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as SongGenerateResult | { error: string };

      if (!response.ok) {
        const message = "error" in data ? data.error : "Song generation failed";
        throw new Error(message);
      }

      const songData = data as SongGenerateResult;
      setResult(songData);
      setForm((prev) => ({ ...prev, seed: songData.seed }));

      if (!isAuthenticated) {
        incrementGuestCount();
      } else {
        router.refresh();
      }
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unexpected error while generating song";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }

  function toggleMood(mood: string) {
    setForm((prev) => {
      const exists = prev.moods.includes(mood);
      if (exists) {
        return { ...prev, moods: prev.moods.filter((item) => item !== mood) };
      }

      if (prev.moods.length >= 2) {
        return { ...prev, moods: [prev.moods[1], mood] };
      }

      return { ...prev, moods: [...prev.moods, mood] };
    });
  }

  function requireAuthAction(target: "download" | "library") {
    router.push(`/login?next=/studio&intent=${target}`);
  }

  return (
    <section className="space-y-6 pb-12">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300/90">AI Studio</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Create polished songs in seconds</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Anyone can open studio and generate one song. To generate unlimited songs, download, and manage history,
          users must login/register.
        </p>
        {!isAuthenticated ? (
          <p className="mt-4 rounded-xl border border-amber-300/35 bg-amber-950/30 px-3 py-2 text-sm text-amber-200">
            Guest mode: one generation allowed. After that, authentication is required.
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <article className="surface-card">
            <h2 className="text-lg font-semibold text-white">Lyrics and core style</h2>
            <label className="mt-4 block text-sm text-slate-300">Base prompt</label>
            <textarea
              className="input-area mt-2"
              rows={3}
              value={form.basePrompt}
              onChange={(event) => setForm((prev) => ({ ...prev, basePrompt: event.target.value }))}
            />

            <label className="mt-4 block text-sm text-slate-300">Lyrics / story text</label>
            <textarea
              className="input-area mt-2"
              rows={8}
              placeholder="Paste your story, poem, or lyrics"
              value={form.lyrics}
              onChange={(event) => setForm((prev) => ({ ...prev, lyrics: event.target.value }))}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { key: "use", label: "Use as lyrics" },
                { key: "story", label: "Story to song" },
                { key: "instrumental", label: "Instrumental" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={clsx("chip", form.lyricsMode === item.key && "chip-active")}
                  onClick={() => setForm((prev) => ({ ...prev, lyricsMode: item.key as SongGenerateInput["lyricsMode"] }))}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </article>

          <article className="surface-card space-y-4">
            <h2 className="text-lg font-semibold text-white">Creative controls</h2>

            <div>
              <p className="mb-2 text-sm text-slate-300">Genre</p>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    className={clsx("chip", form.genre === genre && "chip-active")}
                    onClick={() => setForm((prev) => ({ ...prev, genre: prev.genre === genre ? null : genre }))}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-slate-300">Mood (up to two)</p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    className={clsx("chip", form.moods.includes(mood) && "chip-active")}
                    onClick={() => toggleMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-slate-300">Scene</p>
              <div className="flex flex-wrap gap-2">
                {SCENES.map((scene) => (
                  <button
                    key={scene}
                    type="button"
                    className={clsx("chip", form.scene === scene && "chip-active")}
                    onClick={() => setForm((prev) => ({ ...prev, scene: prev.scene === scene ? null : scene }))}
                  >
                    {scene}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-slate-300">Vocal type</p>
              <div className="flex flex-wrap gap-2">
                {VOCALS.map((vocal) => (
                  <button
                    key={vocal}
                    type="button"
                    className={clsx("chip", form.vocalType === vocal && "chip-active")}
                    onClick={() => setForm((prev) => ({ ...prev, vocalType: vocal }))}
                  >
                    {vocal}
                  </button>
                ))}
              </div>
            </div>

            {form.vocalType !== "Instrumental" ? (
              <div>
                <p className="mb-2 text-sm text-slate-300">Vocal style</p>
                <div className="flex flex-wrap gap-2">
                  {VOCAL_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      className={clsx("chip", form.vocalStyles.includes(style) && "chip-active")}
                      onClick={() => {
                        setForm((prev) => {
                          const exists = prev.vocalStyles.includes(style);
                          if (exists) {
                            return {
                              ...prev,
                              vocalStyles: prev.vocalStyles.filter((item) => item !== style),
                            };
                          }
                          return { ...prev, vocalStyles: [...prev.vocalStyles, style] };
                        });
                      }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        </div>

        <aside className="space-y-6">
          <article className="surface-card space-y-3">
            <h3 className="text-base font-semibold text-white">Song settings</h3>

            <label className="block text-sm text-slate-300">
              Language
              <select
                className="input mt-1"
                value={form.language}
                onChange={(event) => setForm((prev) => ({ ...prev, language: event.target.value }))}
              >
                <option value="en">English</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </label>

            <label className="block text-sm text-slate-300">
              Accent
              <select
                className="input mt-1"
                value={form.accent}
                onChange={(event) => setForm((prev) => ({ ...prev, accent: event.target.value }))}
              >
                <option value="US">US</option>
                <option value="UK">UK</option>
                <option value="Indian">Indian</option>
                <option value="Neutral">Neutral</option>
              </select>
            </label>

            <label className="block text-sm text-slate-300">
              BPM
              <input
                className="input mt-1"
                type="number"
                min={60}
                max={180}
                value={form.bpm}
                onChange={(event) => setForm((prev) => ({ ...prev, bpm: Number(event.target.value) }))}
              />
            </label>

            <label className="block text-sm text-slate-300">
              Length (seconds)
              <input
                className="input mt-1"
                type="number"
                min={10}
                max={180}
                value={form.length}
                onChange={(event) => setForm((prev) => ({ ...prev, length: Number(event.target.value) }))}
              />
            </label>

            <label className="block text-sm text-slate-300">
              Key
              <select
                className="input mt-1"
                value={form.keyScale}
                onChange={(event) => setForm((prev) => ({ ...prev, keyScale: event.target.value }))}
              >
                <option>C major</option>
                <option>G major</option>
                <option>D major</option>
                <option>A major</option>
                <option>F major</option>
                <option>A minor</option>
                <option>E minor</option>
              </select>
            </label>

            <label className="block text-sm text-slate-300">
              Structure
              <select
                className="input mt-1"
                value={form.structure}
                onChange={(event) => setForm((prev) => ({ ...prev, structure: event.target.value }))}
              >
                <option>Verse+Chorus</option>
                <option>Loop</option>
                <option>Story Arc</option>
                <option>Build-up</option>
              </select>
            </label>

            <label className="block text-sm text-slate-300">
              Energy: {form.energy}
              <input
                className="mt-2 w-full accent-teal-400"
                type="range"
                min={0}
                max={100}
                value={form.energy}
                onChange={(event) => setForm((prev) => ({ ...prev, energy: Number(event.target.value) }))}
              />
            </label>

            <label className="block text-sm text-slate-300">
              Complexity: {form.complexity}
              <input
                className="mt-2 w-full accent-teal-400"
                type="range"
                min={0}
                max={100}
                value={form.complexity}
                onChange={(event) => setForm((prev) => ({ ...prev, complexity: Number(event.target.value) }))}
              />
            </label>

            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3 text-xs text-slate-300">
              <p className="font-medium text-teal-200">Tag preview</p>
              <p className="mt-2 leading-5">{tagPreview}</p>
            </div>

            <button
              type="button"
              disabled={isGenerating}
              onClick={onGenerate}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? "Generating..." : "Create song"}
            </button>

            {error ? (
              <p className="rounded-xl border border-rose-400/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-200">{error}</p>
            ) : null}
          </article>

          <article className="surface-card space-y-3">
            <h3 className="text-base font-semibold text-white">Latest result</h3>
            {result ? (
              <>
                <audio className="w-full" controls src={result.audioUrl} />
                <p className="text-xs text-slate-300">Prompt ID: {result.promptId}</p>

                <div className="flex gap-2">
                  {isAuthenticated ? (
                    <a
                      href={result.persistedAudioUrl ?? result.audioUrl}
                      className="flex-1 rounded-xl border border-teal-300/50 bg-teal-400/15 px-3 py-2 text-center text-sm font-semibold text-teal-100 hover:border-teal-200"
                      download
                    >
                      Download
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => requireAuthAction("download")}
                      className="flex-1 rounded-xl border border-white/20 px-3 py-2 text-sm font-semibold text-white"
                    >
                      Login to download
                    </button>
                  )}

                  <Link
                    href={isAuthenticated ? "/library" : "/login?next=/library"}
                    className="flex-1 rounded-xl border border-white/20 px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                    {isAuthenticated ? "Open library" : "Login for library"}
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-300">Your generated audio preview appears here.</p>
            )}
          </article>
        </aside>
      </div>
    </section>
  );
}
