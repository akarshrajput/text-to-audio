import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, buildMetadata, siteConfig } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Text to Audio and AI Music Generator for Teams | Songify",
  description:
    "Create text-to-speech, tone-based narration, poem audio, and artist-free AI music in one platform. Built for creators, products, and teams.",
  path: "/",
});

const serviceLinks = [
  { href: "/services/text-to-speech", label: "Text to Speech" },
  { href: "/services/ai-music-generation", label: "AI Music Generation" },
  { href: "/services/voice-generation", label: "Voice Generation" },
  { href: "/services/poem-to-audio", label: "Poem to Audio" },
  { href: "/services/speech-tone-tools", label: "Speech Tone Tools" },
];

const faqs = [
  {
    question: "What can I create with Songify?",
    answer:
      "You can create text to speech audio, tone-aware narration, poem to audio tracks, and AI-generated music without using human artists.",
  },
  {
    question: "Can I test Songify before creating an account?",
    answer:
      "Yes. Visitors can open Studio and generate one song in guest mode. Login unlocks downloads and library storage.",
  },
  {
    question: "Does Songify support production workflows?",
    answer:
      "Yes. Songify is designed for production with configurable prompts, saved outputs, and indexed audio history for authenticated users.",
  },
  {
    question: "Is Songify suitable for businesses?",
    answer:
      "Yes. Teams can use Songify for product demos, content pipelines, marketing audio, and branded voice or music generation.",
  },
];

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Songify",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/favicon.ico"),
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Songify",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: siteConfig.description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
  ]);

  return (
    <main className="w-full flex-1 pb-12">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="site-container px-4 pt-10 sm:px-6 lg:px-8">
        <div className="hero-stage p-8 sm:p-10 lg:p-14">
          <div className="hero-content hero-grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="hero-kicker">Songify AI Audio Platform</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Build production-ready audio from text, tone, and music prompts.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                Generate speech, tone-aware narration, poem audio, and artist-free AI music in one professional
                workspace built for teams, creators, and product builders.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/studio"
                  prefetch={false}
                  className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start Creating
                </Link>
                <Link
                  href="/services"
                  prefetch={false}
                  className="hero-cta-dark rounded-full px-5 py-2.5 text-sm font-semibold transition"
                >
                  View Services
                </Link>
                <Link
                  href="/pricing"
                  prefetch={false}
                  className="hero-cta-dark rounded-full px-5 py-2.5 text-sm font-semibold transition"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div className="grid gap-3 self-start">
              <article className="surface-card bg-slate-100">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-600">Prompt Control</p>
                <p className="mt-2 text-sm text-slate-700">
                  Dial genre, mood, vocal style, arrangement, and structure for predictable output quality.
                </p>
              </article>
              <article className="surface-card bg-slate-100">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-600">Studio Workflow</p>
                <p className="mt-2 text-sm text-slate-700">
                  Go from idea to downloadable output in minutes using one integrated generation flow.
                </p>
              </article>
              <article className="surface-card bg-slate-100">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-600">Secure Storage</p>
                <p className="mt-2 text-sm text-slate-700">
                  Save and organize generated audio in a private library with account-level access controls.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container mt-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Core audio services</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Each service page is optimized for a specific use case, making it easier for search engines and users to
          discover exactly what they need.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLinks.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              prefetch={false}
              className="surface-card transition hover:border-cyan-300/50"
            >
              <h3 className="text-base font-semibold text-slate-900">{service.label}</h3>
              <p className="mt-2 text-sm text-slate-600">See features, workflow, and best-fit scenarios.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-container mt-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-300 bg-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-300 bg-white p-4">
                <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/faq" prefetch={false} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900">
              View full FAQ
            </Link>
            <Link href="/terms" prefetch={false} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900">
              Terms
            </Link>
            <Link href="/privacy" prefetch={false} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900">
              Privacy
            </Link>
          </div>
        </div>
      </section>

      <section className="site-container mt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-300 bg-slate-100 p-5 text-sm text-slate-600">
          <Link href="/features" prefetch={false} className="text-slate-900 hover:text-cyan-600">
            Features
          </Link>
          <Link href="/pricing" prefetch={false} className="text-slate-900 hover:text-cyan-600">
            Pricing
          </Link>
          <Link href="/about" prefetch={false} className="text-slate-900 hover:text-cyan-600">
            About
          </Link>
          <Link href="/contact" prefetch={false} className="text-slate-900 hover:text-cyan-600">
            Contact
          </Link>
          <span className="ml-auto">Last updated: April 2026</span>
        </div>
      </section>
    </main>
  );
}
