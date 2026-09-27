import type { Metadata } from "next";
import { WorkList } from "@/components/site/work-list";
import { getProjects, getSettings } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return { title: `Work | ${settings?.name ?? "Portfolio"}` };
}

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div data-scene="theatre" className="min-h-svh bg-bg pb-(--section) pt-32 text-ink md:pt-40">
      <div className="grid-12 page-x mb-(--section-tight)">
        <h1 data-reveal="focus" className="display col-span-12 text-step-6 lg:col-span-6">
          Work
        </h1>
      </div>
      <WorkList projects={projects} label="Index" />
    </div>
  );
}
