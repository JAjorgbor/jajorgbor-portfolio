import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/nav/header";
import { getHomeData, getSettings } from "@/sanity/lib/fetch";

export default async function Home() {
  const [settings, { home, projects, experience, education, skills }] =
    await Promise.all([getSettings(), getHomeData()]);

  return (
    <main className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50 antialiased selection:bg-amber-500/30 selection:text-white">
      <Header name={settings?.name} resumeUrl={settings?.resumeUrl} />
      <Hero
        content={home?.hero}
        name={settings?.name}
        resumeUrl={settings?.resumeUrl}
      />
      <Projects content={home?.projectsSection} projects={projects} />
      <About
        content={home?.about}
        experience={experience}
        education={education}
      />
      <Skills content={home?.skillsSection} categories={skills} />
      <Contact content={home?.contactSection} settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
