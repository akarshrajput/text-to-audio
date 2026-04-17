import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, buildMetadata, siteConfig } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Text to Audio and AI Music Generator for Teams",
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
    question: "What can I create with SongCraft?",
    answer:
      "You can create text to speech audio, tone-aware narration, poem to audio tracks, and AI-generated music without using human artists.",
  },
  {
    question: "Can I test SongCraft before creating an account?",
    answer:
      "Yes. Visitors can open Studio and generate one song in guest mode. Login unlocks downloads and library storage.",
  },
  {
    question: "Does SongCraft support production workflows?",
    answer:
      "Yes. SongCraft is designed for production with configurable prompts, saved outputs, and indexed audio history for authenticated users.",
  },
  {
    question: "Is SongCraft suitable for businesses?",
    answer:
      "Yes. Teams can use SongCraft for product demos, content pipelines, marketing audio, and branded voice or music generation.",
  },
];

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
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
    name: "SongCraft",
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
              <p className="hero-kicker">SongCraft AI Audio Platform</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Build production-ready audio from text, tone, and music prompts.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Generate speech, tone-aware narration, poem audio, and artist-free AI music in one professional
                workspace built for teams, creators, and product builders.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/studio"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Start Creating
                </Link>
                <Link
                  href="/services"
                  className="hero-cta-dark rounded-full px-5 py-2.5 text-sm font-semibold transition"
                >
                  View Services
                </Link>
                <Link
                  href="/pricing"
                  className="hero-cta-dark rounded-full px-5 py-2.5 text-sm font-semibold transition"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div className="grid gap-3 self-start">
              <article className="surface-card bg-slate-900/85">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Prompt Control</p>
                <p className="mt-2 text-sm text-slate-300">
                  Dial genre, mood, vocal style, arrangement, and structure for predictable output quality.
                </p>
              </article>
              <article className="surface-card bg-slate-900/85">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Studio Workflow</p>
                <p className="mt-2 text-sm text-slate-300">
                  Go from idea to downloadable output in minutes using one integrated generation flow.
                </p>
              </article>
              <article className="surface-card bg-slate-900/85">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Secure Storage</p>
                <p className="mt-2 text-sm text-slate-300">
                  Save and organize generated audio in a private library with account-level access controls.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container mt-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white">Core audio services</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          Each service page is optimized for a specific use case, making it easier for search engines and users to
          discover exactly what they need.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLinks.map((service) => (
            <Link key={service.href} href={service.href} className="surface-card transition hover:border-cyan-300/50">
              <h3 className="text-base font-semibold text-white">{service.label}</h3>
              <p className="mt-2 text-sm text-slate-300">See features, workflow, and best-fit scenarios.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-container mt-10 grid gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Home</h2>
          <p className="mt-2 text-sm text-slate-300">Public landing page and product overview.</p>
        </article>
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Studio</h2>
          <p className="mt-2 text-sm text-slate-300">Prompt-driven music generation connected to RunPod ComfyUI.</p>
        </article>
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          <p className="mt-2 text-sm text-slate-300">Protected overview of authenticated workflows.</p>
        </article>
        <article className="surface-card">
          <h2 className="text-lg font-semibold text-white">Library</h2>
          <p className="mt-2 text-sm text-slate-300">Protected list of songs persisted to Supabase.</p>
        </article>
      </section>

      <section className="site-container mt-8 grid gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <Link href="/features" className="surface-card transition hover:border-cyan-300/50">
          <h2 className="text-lg font-semibold text-white">Features</h2>
          <p className="mt-2 text-sm text-slate-300">Platform capabilities and product architecture.</p>
        </Link>
        <Link href="/pricing" className="surface-card transition hover:border-cyan-300/50">
          <h2 className="text-lg font-semibold text-white">Pricing</h2>
          <p className="mt-2 text-sm text-slate-300">Choose a plan for creators, teams, or scale usage.</p>
        </Link>
        <Link href="/about" className="surface-card transition hover:border-cyan-300/50">
          <h2 className="text-lg font-semibold text-white">About</h2>
          <p className="mt-2 text-sm text-slate-300">Brand story and mission for modern AI audio creation.</p>
        </Link>
        <Link href="/contact" className="surface-card transition hover:border-cyan-300/50">
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p className="mt-2 text-sm text-slate-300">Talk with our team for product and business support.</p>
        </Link>
      </section>

      <section className="site-container mt-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <h3 className="text-base font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/faq" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
              View full FAQ
            </Link>
            <Link href="/terms" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
              Terms
            </Link>
            <Link href="/privacy" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
              Privacy
            </Link>
          </div>
        </div>
      </section>

      <section className="site-container mt-6 px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-sm text-slate-300">
          <p>
            Last updated: April 2026. Content reviewed for product accuracy, SEO consistency, and structured data
            completeness.
          </p>
        </div>
      </section>
    </main>
  );
}
