import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAppSettings, getAppUserProfile, listAppUserProfiles } from "@/lib/app-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveComfyUiUrl, saveUserRole, testComfyUiUrl } from "./actions";

export const metadata: Metadata = buildMetadata({
  title: "Admin",
  description: "Manage Songify users, roles, and the Studio backend URL.",
  path: "/admin",
  noIndex: true,
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function readParam(value: string | string[] | undefined, fallback = "") {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const error = readParam(params.error);
  const notice = readParam(params.notice);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  const profile = await getAppUserProfile(user.id);
  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const [users, settings] = await Promise.all([
    listAppUserProfiles(),
    getAppSettings(),
  ]);

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600">Admin</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Studio settings and users</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage user roles and the ComfyUI backend URL from MongoDB instead of environment variables.
        </p>

        {error ? (
          <p className="mt-6 rounded-xl border border-rose-400/40 bg-rose-950/50 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        {notice ? (
          <p className="mt-6 rounded-xl border border-teal-400/35 bg-teal-950/30 px-4 py-3 text-sm text-teal-100">
            {notice}
          </p>
        ) : null}

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="surface-card space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Studio backend</h2>
              <p className="mt-1 text-sm text-slate-600">This URL is read by the generation API route.</p>
            </div>

            <form action={saveComfyUiUrl} className="space-y-3">
              <label className="block text-sm text-slate-700">
                ComfyUI URL
                <input
                  className="input mt-1"
                  name="comfyUiUrl"
                  type="url"
                  defaultValue={settings.comfyUiUrl}
                  placeholder="https://your-comfyui-host.example.com"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-teal-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-teal-300">
                  Save backend URL
                </button>
                <button
                  formAction={testComfyUiUrl}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Test backend
                </button>
              </div>
            </form>
          </article>

          <article className="surface-card space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Current access</h2>
              <p className="mt-1 text-sm text-slate-600">
                Your role: {profile.role}. New accounts default to user.
              </p>
            </div>

            <div className="max-h-[34rem] space-y-3 overflow-auto pr-1">
              {users.map((item) => (
                <form
                  key={item.userId}
                  action={saveUserRole}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"
                >
                  <input type="hidden" name="userId" value={item.userId} />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{item.fullName ?? item.email ?? item.userId}</p>
                      <p className="text-sm text-slate-500">{item.email ?? "No email saved"}</p>
                    </div>

                    <div className="flex items-end gap-2">
                      <label className="block text-sm text-slate-700">
                        Role
                        <select className="input mt-1 min-w-32" name="role" defaultValue={item.role}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </label>

                      <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}