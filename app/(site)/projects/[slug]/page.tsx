import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { LetterboxVideo } from "@/components/site/letterbox";
import { Label, MetaItem, MetaLink } from "@/components/site/meta";
import { client } from "@/sanity/lib/client";
import { getProject, getProjects, getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { ProjectSection } from "@/sanity/lib/types";
import { splitTitle } from "@/components/site/title";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return client.fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProject(slug), getSettings()]);
  if (!project) return {};
  return {
    title: settings?.name ? `${project.title} | ${settings.name}` : project.title,
    description: project.tagline ?? project.description ?? undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const { name, descriptor } = splitTitle(project.title);
  const nextTitle = next ? splitTitle(next.title) : null;

  return (
    <article>
      {/* §7.5 Title sequence */}
      <section data-scene="theatre" className="grid-12 page-x gap-y-12 bg-bg pb-(--section-tight) pt-32 text-ink md:pt-40">
        <div data-reveal="cut" data-delay="1" className="col-span-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {project.role && <MetaItem label="Role">{project.role}</MetaItem>}
          {project.year && <MetaItem label="Year">{project.year}</MetaItem>}
          {project.tags?.length ? (
            <MetaItem label="Stack">{project.tags.join(", ")}</MetaItem>
          ) : null}
          {project.link && (
            <div className="flex flex-col gap-1">
              <Label>Link</Label>
              <MetaLink href={project.link} external>
                Visit
              </MetaLink>
            </div>
          )}
        </div>

        <div className="col-span-12">
          <h1 data-reveal="focus" className="display text-step-6" style={{ viewTransitionName: "project-title" }}>
            {name}
          </h1>
          {descriptor && (
            <p data-reveal="lines" data-delay="0.3" className="display-mid mt-6 text-step-3 text-ink-2">
              {descriptor}
            </p>
          )}
          {(project.tagline ?? project.description) && (
            <p data-reveal="block" data-delay="0.5" className="lead mt-10 max-w-[60ch] text-ink-2">
              {project.tagline ?? project.description}
            </p>
          )}
        </div>

        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <LetterboxVideo project={project} />
        </div>
      </section>

      {/* Narrative, on paper */}
      <div data-scene="paper" className="bg-bg text-ink">
        {project.overview && (
          <Section label="Overview">
            <div data-reveal="block" className="prose-credit lead text-ink-2">
              <PortableText value={project.overview} />
            </div>
          </Section>
        )}

        {project.metrics?.length ? (
          <Section label="Impact">
            <ul className="flex flex-col">
              {project.metrics.map((m) => (
                <li key={m} data-reveal="lines" className="display-mid border-t border-line py-5 text-step-2 last:border-b">
                  {m}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {project.sections?.map((section) => (
          <NarrativeSection key={section._key} section={section} />
        ))}

        <Section label="Credits">
          <div data-reveal="cut" className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {project.role && <MetaItem label="Role">{project.role}</MetaItem>}
            {project.tags?.length ? (
              <MetaItem label="Stack">{project.tags.join(", ")}</MetaItem>
            ) : null}
            <div className="flex flex-col gap-3">
              {project.link && (
                <MetaLink href={project.link} external>
                  Live site
                </MetaLink>
              )}
              {project.repoUrl && (
                <MetaLink href={project.repoUrl} external>
                  Repository
                </MetaLink>
              )}
            </div>
          </div>
        </Section>
      </div>

      {/* §7.7 Next project: the next film's first card */}
      {next && next.slug !== slug && (
        <section data-scene="theatre" className="grid-12 page-x gap-y-8 bg-bg py-(--section) text-ink">
          <div className="col-span-12 lg:col-span-2">
            <Label>Next</Label>
          </div>
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
            <Link
              href={`/projects/${next.slug}`}
              data-shared-title
              className="display credit-link block text-step-5 text-ink"
            >
              <span data-reveal="lines" className="block">
                {nextTitle?.name}
              </span>
            </Link>
            {nextTitle?.descriptor && <p className="mt-4 text-ink-2">{nextTitle.descriptor}</p>}
            <p className="meta mt-4 text-ink-3">
              {[next.role, next.year].filter(Boolean).join(" · ")}
            </p>
          </div>
        </section>
      )}
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid-12 page-x gap-y-8 py-(--section-tight)">
      <div className="col-span-12 lg:col-span-3">
        <div data-reveal="cut" className="lg:sticky lg:top-24">
          <Label>{label}</Label>
        </div>
      </div>
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">{children}</div>
    </section>
  );
}

function NarrativeSection({ section }: { section: ProjectSection }) {
  const full = section.layout === "full";
  return (
    <>
      {(section.heading || section.body) && (
        <Section label={section.heading ?? ""}>
          {section.body && (
            <div data-reveal="block" className="prose-credit lead text-ink-2">
              <PortableText value={section.body} />
            </div>
          )}
        </Section>
      )}
      {section.media?.length ? (
        <div className={full ? "" : "grid-12 page-x"}>
          <div className={`flex flex-col gap-6 ${full ? "" : "col-span-12 lg:col-span-6 lg:col-start-4"}`}>
            {section.media.map((m) =>
              m._type === "image" ? (
                <Image
                  key={m._key}
                  src={urlFor(m).width(2400).url()}
                  alt={m.alt ?? ""}
                  width={2400}
                  height={Math.round(2400 / (m.aspect ?? 16 / 9))}
                  sizes={full ? "100vw" : "(min-width: 1280px) 50vw, 100vw"}
                  placeholder={m.lqip ? "blur" : "empty"}
                  blurDataURL={m.lqip ?? undefined}
                />
              ) : m.url ? (
                <div key={m._key} className="letterbox">
                  <video controls preload="none" playsInline muted loop>
                    <source src={m.url} type={m.mimeType ?? "video/mp4"} />
                  </video>
                </div>
              ) : null,
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
