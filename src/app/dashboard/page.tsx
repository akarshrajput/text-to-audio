import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "User Dashboard",
  description: "Private Songify workspace dashboard.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">Signed in as {user?.email}</p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link className="surface-card" href="/studio">
          <h2 className="text-lg font-semibold text-slate-900">Create Song</h2>
          <p className="mt-2 text-sm text-slate-600">Go to studio and generate your next track.</p>
        </Link>

        <Link className="surface-card" href="/library">
          <h2 className="text-lg font-semibold text-slate-900">Library</h2>
          <p className="mt-2 text-sm text-slate-600">Review all generated and saved songs.</p>
        </Link>

        <Link className="surface-card" href="/account">
          <h2 className="text-lg font-semibold text-slate-900">Account</h2>
          <p className="mt-2 text-sm text-slate-600">Manage login and profile preferences.</p>
        </Link>
      </section>
    </main>
  );
}
