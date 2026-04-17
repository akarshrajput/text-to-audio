import { signOut } from "@/app/actions/auth";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Account Settings",
  description: "Private SongCraft account settings for authenticated users.",
  path: "/account",
  noIndex: true,
});

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Account</h1>

      <section className="mt-8 w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <p className="text-sm text-slate-300">Email</p>
        <p className="mt-1 text-lg font-medium text-white">{user?.email}</p>

        <form action={signOut} className="mt-6">
          <button className="rounded-xl border border-rose-300/50 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:border-rose-200 hover:text-white">
            Sign out from all protected pages
          </button>
        </form>
      </section>
    </main>
  );
}
