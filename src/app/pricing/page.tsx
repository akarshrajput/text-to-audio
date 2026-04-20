import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: "Review Songify pricing for creators, startups, and teams building text-to-audio and AI music generation workflows.",
  path: "/pricing",
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Try the platform with no commitment.",
    features: ["1 guest generation", "Preview audio output", "Access all genres & moods", "No account required"],
    cta: "Start for free",
    href: "/studio",
    accent: "#2dd4bf",
    highlighted: false,
  },
  {
    name: "Creator",
    price: "Coming soon",
    period: "",
    desc: "For individual creators who need full access.",
    features: ["Unlimited generations", "Download MP3 files", "Private audio library", "Priority rendering", "All voice styles"],
    cta: "Join waitlist",
    href: "/contact",
    accent: "#6366f1",
    highlighted: true,
  },
  {
    name: "Team",
    price: "Custom",
    period: "per seat",
    desc: "Enterprise workflows and team collaboration.",
    features: ["Everything in Creator", "Multi-seat access", "API access", "Custom integrations", "Dedicated support & SLAs"],
    cta: "Contact sales",
    href: "/contact",
    accent: "#a855f7",
    highlighted: false,
  },
];

export default function PricingPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  return (
    <main className="site-container w-full flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p className="section-eyebrow">Pricing</p>
        <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "2.5rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.75rem" }}>
          Simple, transparent pricing
        </h1>
        <p style={{ marginTop: "0.75rem", fontSize: "1rem", color: "var(--text-secondary)", maxWidth: 480, margin: "0.75rem auto 0" }}>
          Start free, unlock more as you grow. Pricing plans are being finalized for the best value.
        </p>
      </div>

      {/* Plans */}
      <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", maxWidth: 980, margin: "0 auto" }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="glass-card"
            style={{
              padding: "2rem",
              border: plan.highlighted ? `1px solid ${plan.accent}40` : undefined,
              boxShadow: plan.highlighted ? `0 0 40px ${plan.accent}15` : undefined,
              position: "relative",
            }}
          >
            {plan.highlighted && (
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)" }}>
                <span className="badge badge-violet" style={{ fontSize: "0.7rem" }}>Most Popular</span>
              </div>
            )}

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: plan.accent, marginBottom: "0.75rem" }}>
                {plan.name}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: '"Space Grotesk", sans-serif' }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>/{plan.period}</span>
                )}
              </div>
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {plan.desc}
              </p>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {plan.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.accent} strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              prefetch={false}
              className={plan.highlighted ? "btn-primary" : "btn-secondary"}
              style={{ display: "block", textAlign: "center", textDecoration: "none", padding: "0.7rem", width: "100%" }}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "2.5rem", textAlign: "center", fontSize: "0.83rem", color: "var(--text-muted)" }}>
        Questions?{" "}
        <Link href="/contact" style={{ color: "#a5b4fc", fontWeight: 600, textDecoration: "none" }}>
          Contact our team →
        </Link>
      </p>
    </main>
  );
}
