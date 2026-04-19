import Link from "next/link";
import { getAppUserProfile } from "@/lib/app-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = user ? await getAppUserProfile(user.id) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="site-container flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Songify
        </Link>

        <nav className="flex items-center gap-2 text-sm text-slate-600 lg:gap-3">
          <Link className="nav-link" href="/" prefetch={false}>
            Home
          </Link>
          <Link className="nav-link" href="/studio" prefetch={false}>
            Studio
          </Link>
          <Link className="nav-link" href="/dashboard" prefetch={false}>
            Dashboard
          </Link>
          <Link className="nav-link" href="/library" prefetch={false}>
            Library
          </Link>
          <Link className="nav-link" href="/account" prefetch={false}>
            Account
          </Link>
          {profile?.role === "admin" ? (
            <Link className="nav-link rounded-full border border-teal-400/30 bg-teal-500/10 text-teal-700" href="/admin" prefetch={false}>
              Admin
            </Link>
          ) : null}
          {!user && (
            <>
              <Link className="nav-link" href="/login" prefetch={false}>
                Login
              </Link>
              <Link
                className="rounded-full bg-slate-900 px-3 py-1.5 font-semibold text-white transition hover:bg-slate-800"
                href="/register"
                prefetch={false}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
