import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Songify, a professional AI audio platform focused on text-to-audio, controllable speech, and artist-free music generation.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />

      <h1 className="max-w-4xl text-4xl font-bold text-white">About SongCraft</h1>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
        SongCraft is built for teams and creators who need fast, controllable audio generation without sacrificing
        quality. Our platform combines text to speech, tone-driven narration, and AI music generation into one
        production-ready workflow.
      </p>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
        We focus on practical output quality, reproducibility, and operational reliability so generated audio can move
        from concept to publication with fewer manual steps.
      </p>
    </main>
  );
}
