import { Leader } from "@/components/motion/leader";
import { Lights } from "@/components/motion/lights";
import { AboutCredit } from "@/components/site/about-credit";
import { ContactCredit } from "@/components/site/contact-credit";
import { Hero } from "@/components/site/hero";
import { WorkList } from "@/components/site/work-list";
import { getHomeData, getSettings } from "@/sanity/lib/fetch";

export default async function Home() {
  const [settings, { home, projects }] = await Promise.all([getSettings(), getHomeData()]);

  return (
    <>
      <Leader />
      <Lights>
        <Hero settings={settings} />
        <section
          id="work"
          data-scene="theatre"
          data-lights-target
          className="bg-bg py-(--section) text-ink"
        >
          <WorkList
            projects={projects}
            label={home?.projectsSection?.heading ?? "Selected work"}
          />
        </section>
      </Lights>
      <AboutCredit content={home?.about} />
      <div className="border-t border-line">
        <ContactCredit content={home?.contactSection} settings={settings} />
      </div>
    </>
  );
}
