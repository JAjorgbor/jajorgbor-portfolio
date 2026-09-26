import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/nav/header";
import { getContactSection, getSettings } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Contact | ${settings?.name ?? "Portfolio"}`,
    description: "Get in touch for professional inquiries and collaborations.",
  };
}

export default async function ContactPage() {
  const [settings, contactSection] = await Promise.all([
    getSettings(),
    getContactSection(),
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-amber-500/30 selection:text-white">
      <Header name={settings?.name} resumeUrl={settings?.resumeUrl} />
      <div className="pt-20">
        <Contact content={contactSection} settings={settings} />
      </div>
      <Footer settings={settings} />
    </main>
  );
}
