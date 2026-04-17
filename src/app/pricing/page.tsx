import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Review SongCraft pricing for creators, startups, and teams building text-to-audio and AI music generation workflows.",
  path: "/pricing",
});

export default function PricingPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />

      <h1 className="text-4xl font-bold text-white">Flexible pricing for AI audio production</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        Start with basic workflows, then scale toward team collaboration and large generation volume as usage grows.
      </p>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Starter</h2>
          <p className="mt-2 text-sm text-slate-300">For solo creators validating ideas.</p>
          <p className="mt-4 text-2xl font-bold text-white">$19/mo</p>
        </article>
        <article className="surface-card border-cyan-300/40">
          <h2 className="text-lg font-semibold text-white">Growth</h2>
          <p className="mt-2 text-sm text-slate-300">For teams shipping audio features and campaigns.</p>
          <p className="mt-4 text-2xl font-bold text-white">$79/mo</p>
        </article>
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Scale</h2>
          <p className="mt-2 text-sm text-slate-300">For enterprise-grade output and support requirements.</p>
          <p className="mt-4 text-2xl font-bold text-white">Custom</p>
        </article>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-900">
          Talk to sales
        </Link>
        <Link href="/faq" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
          Pricing FAQ
        </Link>
      </div>
    </main>
  );
}
