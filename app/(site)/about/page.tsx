import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { Lines } from "@/components/site/lines";
import { Label } from "@/components/site/meta";
import { getAboutData, getSettings } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return { title: `About | ${settings?.name ?? "Portfolio"}` };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function AboutPage() {
  const { about, experience, education, skills } = await getAboutData();

  return (
    <div data-scene="paper" className="bg-bg pb-(--section) pt-32 text-ink md:pt-40">
      {/* Story credit */}
      <section className="grid-12 page-x gap-y-10">
        <div data-reveal="cut" className="col-span-12 lg:col-span-2">
          <Label>About</Label>
        </div>
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3">
          {about?.heading && (
            <h1 data-reveal="focus" className="display text-step-5">
              <Lines text={about.heading} />
            </h1>
          )}
          {about?.story && (
            <div data-reveal="block" data-delay="0.3" className="prose-credit lead mt-12 max-w-[60ch] text-ink-2">
              <PortableText value={about.story} />
            </div>
          )}
        </div>
      </section>

      {about?.approach?.length ? (
        <section className="grid-12 page-x mt-(--section) gap-y-10">
          <div data-reveal="cut" className="col-span-12 lg:col-span-2">
            <Label>Approach</Label>
          </div>
          <ol className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
            {about.approach.map((line, i) => (
              <li key={line} className="flex gap-6 border-t border-line py-8 last:border-b">
                <span className="meta shrink-0 pt-2 text-ink-3">{pad(i + 1)}</span>
                <p data-reveal="lines" className="display-mid text-step-3">{line}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {experience.length ? (
        <section className="grid-12 page-x mt-(--section) gap-y-10">
          <div data-reveal="cut" className="col-span-12 lg:col-span-2">
            <Label>Experience</Label>
          </div>
          <ol className="col-span-12 border-t border-line lg:col-span-10 lg:col-start-3">
            {experience.map((job) => (
              <li key={job._id} data-reveal="block" className="grid-12 gap-y-4 border-b border-line py-10">
                <div className="col-span-12 md:col-span-7">
                  <h2 className="display-mid text-step-2">{job.role}</h2>
                  <p className="meta mt-3 text-ink-3">
                    {[job.company, job.type].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 md:text-right">
                  <span className="meta text-ink">{job.period}</span>
                </div>
                {job.description && (
                  <p className="lead col-span-12 mt-2 max-w-[60ch] text-ink-2 md:col-span-7">
                    {job.description}
                  </p>
                )}
                {job.achievements?.length ? (
                  <ul className="prose-credit col-span-12 mt-2 md:col-span-7">
                    {job.achievements.map((a) => (
                      <li key={a} className="text-ink-2">
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {education.length ? (
        <section className="grid-12 page-x mt-(--section) gap-y-10">
          <div data-reveal="cut" className="col-span-12 lg:col-span-2">
            <Label>Education</Label>
          </div>
          <ol className="col-span-12 border-t border-line lg:col-span-10 lg:col-start-3">
            {education.map((edu) => (
              <li key={edu._id} data-reveal="block" className="grid-12 gap-y-4 border-b border-line py-10">
                <div className="col-span-12 md:col-span-7">
                  <h2 className="display-mid text-step-2">{edu.degree}</h2>
                  <p className="meta mt-3 text-ink-3">
                    {[edu.school, edu.location].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 md:text-right">
                  <span className="meta text-ink">{edu.period}</span>
                </div>
                {edu.achievements?.length ? (
                  <ul className="prose-credit col-span-12 mt-2 md:col-span-7">
                    {edu.achievements.map((a) => (
                      <li key={a} className="text-ink-2">
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {skills.length ? (
        <section className="grid-12 page-x mt-(--section) gap-y-10">
          <div data-reveal="cut" className="col-span-12 lg:col-span-2">
            <Label>Stack</Label>
          </div>
          <div className="col-span-12 grid gap-10 md:grid-cols-3 lg:col-span-10 lg:col-start-3">
            {skills.map((cat) => (
              <div key={cat._id} data-reveal="block" className="border-t border-line pt-5">
                <h2 className="meta text-ink">{cat.title}</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {cat.skills?.map((s) => (
                    <li key={s} className="text-ink-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {about?.detail && (
        <section className="grid-12 page-x mt-(--section)">
          <p className="display col-span-12 text-step-3 text-ink-2 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3">
            <em>{about.detail}</em>
          </p>
        </section>
      )}
    </div>
  );
}
