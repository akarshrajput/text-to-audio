import Link from "next/link";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-50">
      <div className="site-container grid w-full gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-900">Songify</p>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Professional text-to-audio, speech tone, and AI music generation workflows for creators and teams.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Songify. All rights reserved.</p>
      </div>
    </footer>
  );
}
