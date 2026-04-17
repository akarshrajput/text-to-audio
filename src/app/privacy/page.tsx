import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Review how SongCraft handles account data, generated assets, and service analytics.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="site-container flex w-full flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="max-w-4xl text-4xl font-bold text-white">Privacy Policy</h1>
      <div className="mt-6 max-w-4xl space-y-4 text-sm leading-7 text-slate-300">
        <p>SongCraft stores account and generated asset metadata required to deliver platform functionality and user libraries.</p>
        <p>We apply security controls to protect user data and only process operational data needed for service performance.</p>
        <p>For data access or deletion requests, contact privacy@songcraft.ai.</p>
      </div>
    </main>
  );
}
