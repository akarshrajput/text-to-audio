import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Read SongCraft terms for account usage, acceptable use, and platform access conditions.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="max-w-4xl text-4xl font-bold text-white">Terms of Service</h1>
      <div className="mt-6 max-w-4xl space-y-4 text-sm leading-7 text-slate-300">
        <p>By using SongCraft, you agree to platform usage rules, account security responsibilities, and lawful use of generated outputs.</p>
        <p>You are responsible for ensuring prompts and generated content comply with your jurisdiction and distribution requirements.</p>
        <p>For enterprise contracts and SLAs, contact our sales team for custom terms.</p>
      </div>
    </main>
  );
}
