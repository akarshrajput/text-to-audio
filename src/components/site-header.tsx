import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="site-container flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          SongCraft
        </Link>

        <nav className="flex items-center gap-2 text-sm text-slate-200 lg:gap-3">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/studio">
            Studio
          </Link>
          <Link className="nav-link" href="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" href="/library">
            Library
          </Link>
          <Link className="nav-link" href="/account">
            Account
          </Link>

          {user ? (
            <form action={signOut}>
              <button className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1.5 font-medium text-cyan-100 transition hover:border-cyan-200 hover:text-white">
                Sign out
              </button>
            </form>
          ) : (
            <>
              <Link className="nav-link" href="/login">
                Login
              </Link>
              <Link
                className="rounded-full bg-white px-3 py-1.5 font-semibold text-slate-900 transition hover:bg-slate-200"
                href="/register"
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
