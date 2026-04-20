import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description: "Read common questions about Songify text-to-audio workflows, AI music generation, account access, and output storage.",
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
  {
    question: "How does seed / Vibe Lock work?",
    answer: "Each generation uses a random seed. Enabling Vibe Lock pins the seed so subsequent generations are stylistically similar, helping you iterate without losing a great result.",
  },
  {
    question: "Which languages are supported?",
    answer: "Currently English, German, Hindi, Spanish, and French are available. More languages are being added based on user demand.",
  },
];

export default function FaqPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);
  const faqSchema = buildFaqSchema(faqs);

  return (
    <main className="site-container w-full flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div style={{ maxWidth: 640, marginBottom: "3rem" }}>
        <p className="section-eyebrow mb-3">FAQ</p>
        <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "2.5rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Frequently asked questions
        </h1>
      </div>

      <div style={{ maxWidth: 740, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {faqs.map((item, i) => (
          <article key={item.question} className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-violet)", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                {i + 1}
              </span>
              <div>
                <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {item.question}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
