import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildServiceListSchema } from "@/lib/structured-data";
import { servicePages } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "AI Audio Services",
  description:
    "Explore SongCraft services including text to speech, AI music generation, voice generation, poem to audio, and speech tone tools.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  const serviceListSchema = buildServiceListSchema();

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceListSchema} />

      <h1 className="text-4xl font-bold text-slate-900">AI audio services for modern teams</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
        Songify provides specialized audio generation workflows for speech, tone control, music, and narration use
        cases. Each page below describes practical outcomes and implementation fit.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicePages.map((service) => (
          <article key={service.slug} className="surface-card">
            <h2 className="text-lg font-semibold text-slate-900">{service.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            <Link
              href={`/services/${service.slug}`}
              className="mt-4 inline-flex rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-900"
            >
              View service page
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
