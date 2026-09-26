import { defineQuery } from "next-sanity";

const IMAGE = `{ asset, hotspot, crop, alt, "lqip": asset->metadata.lqip }`;

// `!= false` (rather than `== true`) keeps projects created before the
// visibility field existed showing on the site.
const VISIBLE_PROJECT = `_type == "project" && defined(slug.current) && visible != false`;

const PROJECT_CARD = `
  _id,
  title,
  "slug": slug.current,
  description,
  role,
  year,
  tags,
  metrics,
  thumbnail ${IMAGE}
`;

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    name,
    resumeUrl,
    footerNote,
    email,
    chatLabel,
    phoneDisplay,
    chatUrl,
    socials[]{ _key, platform, url },
    seoTitle,
    seoDescription
  }
`);

export const HOME_QUERY = defineQuery(`{
  "home": *[_type == "homePage"][0]{ hero, projectsSection, about, skillsSection, contactSection },
  "projects": *[${VISIBLE_PROJECT}] | order(order asc, _createdAt desc){ ${PROJECT_CARD} },
  "experience": *[_type == "experience"] | order(order asc, _createdAt desc){
    _id, company, role, period, type, description, achievements
  },
  "education": *[_type == "education"] | order(order asc, _createdAt desc){
    _id, school, degree, period, location, achievements
  },
  "skills": *[_type == "skillCategory"] | order(order asc, _createdAt asc){
    _id, title, skills
  }
}`);

export const CONTACT_SECTION_QUERY = defineQuery(`
  *[_type == "homePage"][0].contactSection
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[${VISIBLE_PROJECT}]{ "slug": slug.current }
`);

export const PROJECT_QUERY = defineQuery(`
  *[${VISIBLE_PROJECT} && slug.current == $slug][0]{
    ${PROJECT_CARD},
    overview,
    link,
    repoUrl,
    "videoUrl": video.asset->url,
    "videoMimeType": video.asset->mimeType
  }
`);
