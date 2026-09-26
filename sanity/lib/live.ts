import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/lib/client";

// Pages are served from cache and <SanityLive /> revalidates them as soon as
// content is published in the Studio — no webhook required.
export const { sanityFetch, SanityLive } = defineLive({ client });
