import { StudioClient } from "@/components/studio/studio-client";
import type { Metadata } from "next";
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

  return (
    <main className="site-container w-full flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <StudioClient isAuthenticated={Boolean(user)} />
    </main>
  );
}
