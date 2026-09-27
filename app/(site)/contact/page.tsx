import type { Metadata } from "next";
import { ContactCredit } from "@/components/site/contact-credit";
import { ContactForm } from "@/components/site/contact-form";
import { getContactSection, getSettings } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Contact | ${settings?.name ?? "Portfolio"}`,
    description: "Get in touch for professional inquiries and collaborations.",
  };
}

export default async function ContactPage() {
  const [settings, content] = await Promise.all([getSettings(), getContactSection()]);

  return (
    <div className="pt-20 md:pt-24">
      <ContactCredit content={content} settings={settings}>
        <ContactForm content={content} />
      </ContactCredit>
    </div>
  );
}
