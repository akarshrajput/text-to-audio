import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Platform Features",
  description:
    "Discover SongCraft platform features for text to audio, speech tone control, AI music generation, and workflow-friendly asset management.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">Production-focused features for AI audio generation</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        SongCraft combines speech and music generation in one environment, with controls designed for consistent output
        and faster iteration.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Prompt and mood controls</h2>
          <p className="mt-2 text-sm text-slate-300">Tune genre, mood, tone, structure, and energy for repeatable output quality.</p>
        </article>
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Speech and music workflows</h2>
          <p className="mt-2 text-sm text-slate-300">Create spoken audio, tonal narration, and full AI music tracks from one interface.</p>
        </article>
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Authenticated storage</h2>
          <p className="mt-2 text-sm text-slate-300">Save generated files and metadata in a private library for future reuse.</p>
        </article>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/studio" className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-900">
          Try studio
        </Link>
        <Link href="/services" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
          Explore services
        </Link>
      </div>
    </main>
  );
}
