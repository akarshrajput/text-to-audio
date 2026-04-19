import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Read common questions about Songify text-to-audio workflows, AI music generation, account access, and output storage.",
  path: "/faq",
});

const faqs = [
  {
    question: "Can I use Songify without an account?",
    answer: "Yes, Studio allows a guest generation. Account registration unlocks repeat generation, downloads, and library storage.",
  },
  {
    question: "What audio workflows are supported?",
    answer: "Songify supports text to speech, tone-guided speech, poem narration, and AI music generation from prompts.",
  },
  {
    question: "Where are generated files stored?",
    answer: "For logged-in users, generated outputs are stored in Supabase Storage and indexed in your private Songify library.",
  },
  {
    question: "Can I use Songify for commercial projects?",
    answer: "Commercial usage depends on your plan and legal terms. Contact sales for high-volume or enterprise scenarios.",
  },
];

export default function FaqPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  const faqSchema = buildFaqSchema(faqs);

  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <h1 className="max-w-4xl text-4xl font-bold text-white">Frequently asked questions</h1>
      <div className="mt-8 max-w-4xl space-y-4">
        {faqs.map((item) => (
          <article key={item.question} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h2 className="text-lg font-semibold text-white">{item.question}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
