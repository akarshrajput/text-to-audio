import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Review Songify pricing for creators, startups, and teams building text-to-audio and AI music generation workflows.",
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

      <div className="flex flex-1 flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-slate-900">Pricing</h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-slate-600">
          We&apos;re finalizing our pricing plans to ensure the best value for creators, startups, and teams.
        </p>
        <p className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-50 px-6 py-4 text-center text-sm font-semibold text-cyan-600">
          Coming soon
        </p>
        <p className="mt-8 text-center text-sm text-slate-500">
          In the meantime, feel free to <Link href="/contact" className="text-cyan-300 hover:text-cyan-200">contact our sales team</Link> to discuss your needs.
        </p>
      </div>
    </main>
  );
}
