import { Contact } from "@/components/sections/contact";
import { Header } from "@/components/nav/header";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Contact | Jajorgbor",
  description: "Get in touch for professional inquiries and collaborations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-amber-500/30 selection:text-white">
      <Header />
      <div className="pt-20">
        <Contact />
      </div>
      <footer className="w-full border-t border-neutral-900 bg-neutral-950 py-12 text-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Jajorgbor. All rights reserved.</p>
        <p className="mt-2 text-xs text-neutral-600">
          Built with Next.js, Tailwind CSS & Motion.
        </p>
      </footer>
    </main>
  );
}
