import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// Server-only client used to store contact form submissions. The token is not
// prefixed with NEXT_PUBLIC_, so it is never exposed to the browser bundle.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
