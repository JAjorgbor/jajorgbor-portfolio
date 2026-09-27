import { cache } from "react";
import { client } from "@/sanity/lib/client";
import {
  ABOUT_QUERY,
  CONTACT_SECTION_QUERY,
  HOME_QUERY,
  PROJECT_QUERY,
  PROJECTS_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  AboutData,
  ContactContent,
  HomeData,
  ProjectCard,
  ProjectDetail,
  SiteSettings,
} from "@/sanity/lib/types";

// Pages are static and revalidate on a timer: an edit published in the
// Studio reaches the site within this many seconds. (The live client was
// dropped for the JS budget; see DESIGN.md §10.)
export const REVALIDATE_SECONDS = 60;

function fetchQuery<T>(query: string, params: Record<string, unknown> = {}) {
  return client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
}

// Deduplicated per request: the layout, metadata and page all need it.
export const getSettings = cache(() => fetchQuery<SiteSettings | null>(SETTINGS_QUERY));

export const getHomeData = () => fetchQuery<HomeData>(HOME_QUERY);

export const getProjects = cache(() => fetchQuery<ProjectCard[]>(PROJECTS_QUERY));

export const getAboutData = () => fetchQuery<AboutData>(ABOUT_QUERY);

export const getContactSection = () => fetchQuery<ContactContent | null>(CONTACT_SECTION_QUERY);

export const getProject = cache((slug: string) =>
  fetchQuery<ProjectDetail | null>(PROJECT_QUERY, { slug }),
);
