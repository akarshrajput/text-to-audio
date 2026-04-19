import { StudioClient } from "@/components/studio/studio-client";
import type { Metadata } from "next";
import { getComfyUiOnline } from "@/lib/app-store";
import { buildMetadata } from "@/lib/seo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "AI Song Studio for Text to Music Creation",
  description:
    "Generate AI songs from lyrics, stories, and mood prompts. SongCraft Studio supports tone controls, vocal options, and production-ready outputs.",
  path: "/studio",
});

export default async function StudioPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const comfyUiOnline = await getComfyUiOnline();

  return (
    <main className="site-container w-full flex-1 px-4 py-8 sm:px-6 lg:px-8">
      {!comfyUiOnline ? (
        <div className="mb-6 rounded-3xl border border-amber-300/30 bg-gradient-to-r from-amber-950/55 via-slate-900 to-slate-900 px-6 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-white/5 backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.14)]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Service status</p>
                <p className="mt-1 text-base font-semibold text-white">Studio backend is temporarily unavailable.</p>
              </div>
            </div>
            <span className="inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
              Coming soon
            </span>
          </div>
        </div>
      ) : null}
      <StudioClient isAuthenticated={Boolean(user)} />
    </main>
  );
}
