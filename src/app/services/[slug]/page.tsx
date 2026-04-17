import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug, servicePages } from "@/lib/services";
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      description: "The requested SongCraft service page was not found.",
      path: `/services/${resolvedParams.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ]);

  const serviceSchema = buildServiceSchema({
    name: service.name,
    description: service.description,
    path: `/services/${service.slug}`,
  });

  const faqSchema = buildFaqSchema(service.faqItems);

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <h1 className="max-w-4xl text-4xl font-bold text-white">{service.name}</h1>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{service.intro}</p>

      <section className="mt-8 max-w-4xl rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Primary use cases</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
          {service.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 max-w-4xl rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">How teams use this in SongCraft</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Start in Studio to set prompt direction, output style, and duration. Then generate and iterate until you
          reach the desired tone. Authenticated users can save final outputs to the SongCraft library and reuse
          successful settings across projects.
        </p>
      </section>

      <section className="mt-6 max-w-4xl rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Common questions</h2>
        <div className="mt-4 space-y-4">
          {service.faqItems.map((item) => (
            <article key={item.question} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <h3 className="text-base font-semibold text-white">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/studio" className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-900">
          Open Studio
        </Link>
        <Link
          href="/services"
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
        >
          All services
        </Link>
        <Link
          href="/pricing"
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
        >
          Pricing
        </Link>
      </div>
    </main>
  );
}
