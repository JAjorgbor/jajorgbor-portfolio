import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CONTACT_SECTION_QUERY,
  HOME_QUERY,
  PROJECT_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  ContactContent,
  HomeData,
  ProjectDetail,
  SiteSettings,
} from "@/sanity/lib/types";

// Deduplicated per request, since the layout, metadata and page all need it.
export const getSettings = cache(async () => {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY });
  return data as SiteSettings | null;
});

export async function getHomeData() {
  const { data } = await sanityFetch({ query: HOME_QUERY });
  return data as HomeData;
}

export async function getContactSection() {
  const { data } = await sanityFetch({ query: CONTACT_SECTION_QUERY });
  return data as ContactContent | null;
}

export const getProject = cache(async (slug: string) => {
  const { data } = await sanityFetch({ query: PROJECT_QUERY, params: { slug } });
  return data as ProjectDetail | null;
});
