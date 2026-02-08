import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Header } from "@/components/nav/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50 antialiased selection:bg-amber-500/30 selection:text-white">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
      <footer className="w-full border-t border-neutral-900 bg-neutral-950 py-12 text-center text-sm text-neutral-500">
        <p>
          © {new Date().getFullYear()} Joshua Ajorgbor. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-neutral-600">
          Built with Next.js, Tailwind CSS & Motion.
        </p>
      </footer>
    </main>
  );
}
