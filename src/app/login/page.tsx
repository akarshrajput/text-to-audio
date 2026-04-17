import Link from "next/link";
import type { Metadata } from "next";
import { signInWithPassword } from "@/app/actions/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Login",
  description: "Sign in to SongCraft to access your audio dashboard and saved library.",
  path: "/login",
  noIndex: true,
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function readParam(value: string | string[] | undefined, fallback = "") {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }
  return value ?? fallback;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const nextPath = readParam(params.next, "/dashboard");
  const error = readParam(params.error);
  const notice = readParam(params.notice);

  return (
    <main className="site-container flex w-full flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-300">
          Sign in to access your dashboard, library, and downloads.
        </p>

        <form action={signInWithPassword} className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <input type="hidden" name="next" value={nextPath} />

        <label className="block space-y-2 text-sm">
          <span className="text-slate-300">Email</span>
          <input
            required
            name="email"
            type="email"
            className="w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-2 text-white outline-none ring-teal-400/40 transition focus:ring"
            placeholder="you@company.com"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="text-slate-300">Password</span>
          <input
            required
            minLength={8}
            name="password"
            type="password"
            className="w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-2 text-white outline-none ring-teal-400/40 transition focus:ring"
            placeholder="********"
          />
        </label>

        {error ? (
          <p className="rounded-xl border border-rose-400/40 bg-rose-950/50 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        {notice ? (
          <p className="rounded-xl border border-teal-400/35 bg-teal-950/30 px-3 py-2 text-sm text-teal-100">
            {notice}
          </p>
        ) : null}

          <button className="w-full rounded-xl bg-teal-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-teal-300">
            Login
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-300">
          New here?{" "}
          <Link className="text-teal-300 hover:text-teal-200" href={`/register?next=${encodeURIComponent(nextPath)}`}>
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
