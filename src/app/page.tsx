import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { getComfyUiOnline } from "@/lib/app-store";
import { absoluteUrl, buildMetadata, siteConfig } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Text to Audio and AI Music Generator for Teams | Songify",
  description:
    "Create text-to-speech, tone-based narration, poem audio, and artist-free AI music in one platform. Built for creators, products, and teams.",
  path: "/",
});

const services = [
  {
    href: "/services/text-to-speech",
    label: "Text to Speech",
    desc: "Convert written content into natural-sounding speech with tone control.",
    icon: "🎙️",
    color: "#6366f1",
  },
  {
    href: "/services/ai-music-generation",
    label: "AI Music Generation",
    desc: "Generate full AI music tracks from prompts without human artists.",
    icon: "🎵",
    color: "#2dd4bf",
  },
  {
    href: "/services/voice-generation",
    label: "Voice Generation",
    desc: "Produce controllable synthetic voices across styles and languages.",
    icon: "🔊",
    color: "#a855f7",
  },
  {
    href: "/services/poem-to-audio",
    label: "Poem to Audio",
    desc: "Turn poems and literary text into atmospheric audio narrations.",
    icon: "📜",
    color: "#f59e0b",
  },
  {
    href: "/services/speech-tone-tools",
    label: "Speech Tone Tools",
    desc: "Fine-tune delivery style, pacing, and expressiveness for any voice.",
    icon: "🎚️",
    color: "#ec4899",
  },
];

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
    title: "Granular Prompt Control",
    desc: "Dial in genre, mood, vocal style, arrangement, and structure for repeatable, predictable output quality.",
    accent: "#6366f1",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Integrated Studio Workflow",
    desc: "Go from idea to downloadable audio in minutes using one unified generation interface.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Secure Audio Library",
    desc: "Save and organize every generated file in a private, account-scoped library with instant access.",
    accent: "#a855f7",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Production-Ready Outputs",
    desc: "Every track is exportable and optimized for embedding in products, content, and marketing workflows.",
    accent: "#f59e0b",
  },
];

const faqs = [
  {
    question: "What can I create with Songify?",
    answer: "You can create text to speech audio, tone-aware narration, poem to audio tracks, and AI-generated music without using human artists.",
  },
  {
    question: "Can I test Songify before creating an account?",
    answer: "Yes. Visitors can open Studio and generate one song in guest mode. Login unlocks downloads and library storage.",
  },
  {
    question: "Does Songify support production workflows?",
    answer: "Yes. Songify is designed for production with configurable prompts, saved outputs, and indexed audio history for authenticated users.",
  },
  {
    question: "Is Songify suitable for businesses?",
    answer: "Yes. Teams can use Songify for product demos, content pipelines, marketing audio, and branded voice or music generation.",
  },
];

export default async function Home() {
  const comfyUiOnline = await getComfyUiOnline();

  const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "Songify", url: absoluteUrl("/"), logo: absoluteUrl("/favicon.ico"), sameAs: [] };
  const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: absoluteUrl("/"), description: siteConfig.description, potentialAction: { "@type": "SearchAction", target: `${absoluteUrl("/")}?q={search_term_string}`, "query-input": "required name=search_term_string" } };
  const softwareSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Songify", applicationCategory: "MultimediaApplication", operatingSystem: "Web", url: absoluteUrl("/"), offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: siteConfig.description };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }]);

  return (
    <main className="w-full flex-1 pb-20">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Offline banner */}
      {!comfyUiOnline && (
        <div className="site-container px-4 pt-6 sm:px-6 lg:px-8">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            fontSize: "0.8rem", color: "#a5b4fc",
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "999px", padding: "0.4rem 1rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
            Studio coming soon — sign up to be notified
          </div>
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="site-container px-4 pt-20 pb-10 sm:px-6 lg:px-8 text-center">
        <div className="fade-up">
          <span className="hero-kicker">
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#2dd4bf"/></svg>
            AI Audio Platform
          </span>
        </div>

        <h1 className="fade-up-delay-1 mt-7 text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl mx-auto max-w-4xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          <span className="gradient-text">Build production-ready</span>
          <br />
          audio from text &amp; prompts.
        </h1>

        <p className="fade-up-delay-2 mt-6 text-lg leading-8 max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          Generate speech, tone-aware narration, poem audio, and artist-free AI music in one
          professional workspace — built for teams, creators, and product builders.
        </p>

        <div className="fade-up-delay-3 mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/studio" prefetch={false} className="btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.95rem" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Start Creating
          </Link>
          <Link href="/services" prefetch={false} className="btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.95rem" }}>
            View Services
          </Link>
        </div>

        {/* Trust mark */}
        <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
          Free to try · No credit card required · Guest mode available
        </p>
      </section>

      {/* ── Features Grid ─────────────────────────────────────────── */}
      <section className="site-container px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Platform Features</p>
          <h2 className="mt-3 text-3xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--text-primary)" }}>
            Everything you need in one workspace
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="glass-card glass-card-glow p-6">
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${f.accent}18`,
                border: `1px solid ${f.accent}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: f.accent, marginBottom: "1rem",
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────── */}
      <section className="site-container px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-eyebrow">Core Services</p>
          <h2 className="mt-3 text-3xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--text-primary)" }}>
            Purpose-built audio workflows
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
            Each service is optimized for a specific use case — from spoken word to full AI music production.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.href} href={s.href} prefetch={false} className="glass-card" style={{ padding: "1.5rem", textDecoration: "none", display: "block", transition: "all 220ms ease" }}>
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{s.label}</h3>
              </div>
              <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{s.desc}</p>
              <div className="mt-4 flex items-center gap-1" style={{ fontSize: "0.78rem", color: s.color, fontWeight: 600 }}>
                View service
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="site-container px-4 pt-20 sm:px-6 lg:px-8">
        <div style={{
          borderRadius: "1.5rem",
          padding: "3rem 2rem",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(45,212,191,0.10) 100%)",
          border: "1px solid rgba(99,102,241,0.2)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "200%", background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
          <p className="section-eyebrow relative" style={{ color: "#a5b4fc" }}>Get started today</p>
          <h2 className="relative mt-4 text-3xl font-bold sm:text-4xl" style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--text-primary)" }}>
            Ready to create?
          </h2>
          <p className="relative mt-3 max-w-xl mx-auto text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
            Open the studio — no account needed for your first generation. Login to save, download, and build your audio library.
          </p>
          <div className="relative mt-7 flex flex-wrap gap-3 justify-center">
            <Link href="/studio" prefetch={false} className="btn-primary" style={{ padding: "0.8rem 1.75rem" }}>
              Open Studio
            </Link>
            <Link href="/pricing" prefetch={false} className="btn-secondary" style={{ padding: "0.8rem 1.75rem" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="site-container px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((item) => (
            <article key={item.question} className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.6rem" }}>
                {item.question}
              </h3>
              <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {item.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/faq" prefetch={false} className="btn-secondary" style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}>
            View full FAQ →
          </Link>
          <Link href="/terms" prefetch={false} className="btn-secondary" style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}>
            Terms
          </Link>
          <Link href="/privacy" prefetch={false} className="btn-secondary" style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}>
            Privacy
          </Link>
        </div>
      </section>
    </main>
  );
}
