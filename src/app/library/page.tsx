import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Audio Library",
  description: "Private Songify audio library for authenticated users.",
  path: "/library",
  noIndex: true,
});

type SongRow = {
  id: string;
  title: string | null;
  prompt_tags: string | null;
  genre: string | null;
  mood: string | null;
  audio_url: string | null;
  created_at: string;
};

export default async function LibraryPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("songs")
    .select("id,title,prompt_tags,genre,mood,audio_url,created_at")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(24);

  const songs = (data ?? []) as SongRow[];

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Library</h1>
      <p className="mt-2 text-slate-300">Your generated songs stored in Supabase.</p>

      {error ? (
        <p className="mt-6 rounded-xl border border-amber-400/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          Could not load songs yet. Run the SQL migration in README and verify table policies.
        </p>
      ) : null}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => (
          <article key={song.id} className="surface-card">
            <h2 className="line-clamp-1 text-base font-semibold text-white">{song.title ?? "Untitled song"}</h2>
            <p className="mt-1 text-xs uppercase tracking-wide text-teal-300/90">
              {(song.genre ?? "custom") + " / " + (song.mood ?? "original")}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-slate-300">{song.prompt_tags ?? "No tags saved"}</p>
            {song.audio_url ? (
              <audio className="mt-4 w-full" controls src={song.audio_url} preload="none" />
            ) : null}
          </article>
        ))}
      </section>

      {!error && songs.length === 0 ? (
        <p className="mt-8 text-sm text-slate-400">No songs yet. Generate from the studio and save to your account.</p>
      ) : null}
    </main>
  );
}
