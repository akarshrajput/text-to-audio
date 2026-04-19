import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contact Songify for product support, partnership discussions, and business onboarding.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />

      <h1 className="max-w-3xl text-4xl font-bold text-white">Contact Songify</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
        For support, partnerships, or enterprise deployment planning, reach out to our team.
      </p>

      <section className="mt-8 w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p><strong className="text-white">Email:</strong> support@songify.fun</p>
        <p className="mt-2"><strong className="text-white">Sales:</strong> sales@songify.fun</p>
        <p className="mt-2"><strong className="text-white">Response window:</strong> Monday to Friday, within 24 hours</p>
      </section>
    </main>
  );
}
