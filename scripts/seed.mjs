// One-off migration of the portfolio's original hardcoded content into Sanity.
// Safe to re-run: documents use fixed IDs (createOrReplace) and Sanity dedupes
// uploaded assets by content hash.
//
//   pnpm seed
//
// Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_API_WRITE_TOKEN in .env.local.

import { createReadStream } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { createClient } from "@sanity/client";

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
  SANITY_API_WRITE_TOKEN,
} = process.env;

if (
  !NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !NEXT_PUBLIC_SANITY_DATASET ||
  !SANITY_API_WRITE_TOKEN
) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-01",
  token: SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const PUBLIC_DIR = path.resolve(import.meta.dirname, "..", "public");
const key = () => randomUUID().slice(0, 12);

const block = (text, listItem) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
  ...(listItem && { listItem, level: 1 }),
});

async function upload(type, relativePath) {
  const filename = path.basename(relativePath);
  console.log(`  ↑ uploading ${relativePath}`);
  const asset = await client.assets.upload(
    type,
    createReadStream(path.join(PUBLIC_DIR, relativePath)),
    { filename },
  );
  return { _type: "reference", _ref: asset._id };
}

// --- Content ---------------------------------------------------------------

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  name: "Joshua Ajorgbor",
  resumeUrl: "https://showcv.ng/joshua-ajorgbor",
  footerNote: "Built with Next.js, Tailwind CSS & Motion.",
  email: "joshuaajorgbor@gmail.com",
  chatLabel: "Chat With Me",
  phoneDisplay: "+234 903 578 4325",
  chatUrl: "https://wa.me/+2349035784325",
  socials: [
    {
      _key: key(),
      _type: "socialLink",
      platform: "github",
      url: "https://github.com/jajorgbor",
    },
    {
      _key: key(),
      _type: "socialLink",
      platform: "linkedin",
      url: "https://linkedin.com/in/jajorgbor",
    },
  ],
  seoTitle: "Joshua Ajorgbor | Product-Focused Full-Stack Developer",
  seoDescription:
    "Full-Stack Developer with 4+ years of experience building scalable software solutions with TypeScript, Next.js, and Node.js.",
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  hero: {
    headingLine1: "Product-Focused",
    headingLine2: "Fullstack Engineer.",
    intro:
      "Fullstack engineer building scalable products and thoughtful digital experiences for startups and growing businesses across Africa and beyond. ✨🚀.",
    primaryCtaLabel: "View Projects",
    secondaryCtaLabel: "View Resume",
  },
  projectsSection: {
    heading: "Projects",
    subheading:
      "A collection of projects that define my journey in engineering and product design.",
  },
  about: {
    heading: "Engineering with",
    headingMuted: "Fullstack Intent.",
    body: [
      block(
        "Full-Stack Developer with 4+ years of experience building scalable software solutions for startups and enterprises across Africa.",
      ),
      block(
        "As a product-focused engineer, I have contributed to core flagship products as well as dynamic client projects across major tech hubs. I specialize in clean architecture, intuitive UX, and solving real problems with efficient, maintainable code.",
      ),
    ],
    experienceBadge: "2022 — Present",
  },
  skillsSection: {
    heading: "Technical Ecosystem",
    subheading:
      "A structured breakdown of my core competencies across the full development stack.",
  },
  contactSection: {
    heading: "Let's build something",
    headingAccent: "exceptional.",
    body: "Currently open to full-time roles and select contract opportunities where I can contribute to building thoughtful, well-engineered products.",
    successTitle: "Message Sent!",
    successMessage:
      "Thank you for reaching out. I'll get back to you within 24-48 hours.",
  },
};

const projects = [
  {
    slug: "linkpane",
    title: "Linkpane — Link Management & Engagement Platform",
    description:
      "A platform developed at Haqqman for managing links, form endpoints, email signatures, and campaign workflows. Contributed across frontend and backend development with a focus on performance, scalability, and improving the overall product experience during its transition to a modern Next.js architecture.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB"],
    thumbnail: "thumbnails/linkpane.png",
    role: "Frontend Lead & Fullstack Contributor",
    year: "2023",
    metrics: [
      "Led migration to Next.js App Router with TypeScript",
      "Improved data fetching performance and UI responsiveness",
      "Built scalable data-heavy interfaces and campaign workflows",
    ],
    link: "https://linkpane.com",
    video: "videos/Linkpane.mp4",
    overview: [
      "I led frontend development efforts during a critical phase of the product's evolution, helping transition the application to a more maintainable and scalable architecture using the Next.js App Router and TypeScript.",
      "My work focused on improving responsiveness across data-heavy interfaces, refining interaction flows, and ensuring consistency across complex dashboard views used daily by active users. This contributed to a more stable and predictable experience as the platform expanded in scope.",
      "Beyond implementation, I contributed to frontend structure and engineering decisions that improved developer efficiency and reduced friction when introducing new features into the system.",
    ],
  },
  {
    slug: "deer-nigeria",
    title: "DEER Nigeria — Energy On-Demand Platform",
    description:
      "An energy-on-demand platform that simplifies access to services such as diesel delivery, cooking gas, solar solutions, and electricity vending. Played an active role in developing core frontend features and improving key user workflows as part of the engineering team at Agency by Haqqman.",
    tags: ["Next.js", "React", "Tailwind CSS", "Express.js", "MongoDB"],
    thumbnail: "thumbnails/deer-nigeria.png",
    role: "Frontend Engineer",
    year: "2023",
    metrics: [
      "Contributed to development of core frontend features",
      "Improved usability across key service workflows",
    ],
    link: "https://deernigeria.com",
    video: "videos/DEER Nigeria.mp4",
    overview: [
      "Actively contributed to the development of core frontend features, translating product and business requirements into reliable, production-ready interfaces used across major service flows.",
      "Worked on improving interaction patterns and usability across ordering and account-related workflows, helping create a smoother and more consistent user experience.",
      "Collaborated closely with design and engineering teams to deliver features within existing system constraints while maintaining performance and interface consistency as the platform expanded.",
    ],
  },
  {
    slug: "pharmahub-medica",
    title: "PharmaHub Medica — Pharmaceutical E-commerce Platform",
    description:
      "A full-scale pharmaceutical e-commerce platform built to support online ordering, customer management, and operational workflows for a healthcare business. Led end-to-end development across the storefront, user portal, and administrative systems.",
    tags: [
      "Next.js",
      "Express.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
    ],
    thumbnail: "thumbnails/pharmahubmedica.png",
    role: "Lead Fullstack Developer",
    year: "2023",
    metrics: [
      "Developed webstore, user portal, and admin console",
      "Implemented referral system to support customer growth",
    ],
    link: "https://pharmahubmedica.ng",
    video: "videos/PharmaHub Medica.mp4",
    overview: [
      "I led the platform's development from initial concept to production, defining the system structure and implementing both frontend and backend components required for daily business operations.",
      "My focus was on building a reliable ordering experience alongside an administrative workflow that simplified product management, order handling, and operational visibility for the business.",
      "I also introduced a referral feature in response to evolving client needs, aligning product functionality with growth objectives while ensuring the system remained maintainable and scalable for future expansion.",
    ],
  },
];

const experience = [
  {
    company: "CrowdCargo",
    role: "Frontend Developer",
    period: "Jul 2025 - Nov 2025",
    type: "Remote",
    description:
      "Maintained and improved internal Crowdcargo portals and public storefronts using Next.js and Redux Toolkit Query.",
    achievements: [
      "Optimized internal dashboard performance and stability for admin operations.",
      "Developed responsive Next.js storefront interfaces for Merchants and Restaurants.",
      "Contributed to the initial build of the vendor mobile app using React Native/Expo.",
      "Implemented reusable components and scalable UI patterns for long-term maintainability.",
    ],
  },
  {
    company: "Haqqman",
    role: "Fullstack Web Developer",
    period: "Oct 2022 - Jul 2025",
    type: "Hybrid",
    description:
      "Contributed to core flagship products and client-facing web apps using Next.js, Node.js, and MongoDB.",
    achievements: [
      "Modernized frontend architecture for products like Linkpane and Seapane.",
      "Engineered subscription flows, authentication systems, and reward mechanics.",
      "Developed newsletter tools and internal CRM systems to streamline operations.",
      "Collaborated on production-level features used by 1,000+ creators.",
      "Managed CI/CD workflows and technical documentation.",
    ],
  },
];

const education = [
  {
    school: "Veritas University",
    degree: "B.S.C Computer Science",
    period: "Oct 2020 - Oct 2024",
    location: "Abuja, Nigeria",
    achievements: [
      "Graduated with a second class upper division.",
      "Built RecyLinker (recycling platform with chatbot) as final year project.",
      "Member of Nigerian Association of Computing Students (NACOS).",
      "Interned remotely with Haqqman during the final 2 years of study.",
    ],
  },
];

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit / SWR",
      "ShadCN UI / HeroUI",
      "React Native",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Node.js / Express.js", "MongoDB / Mongoose", "Bun", "REST APIs"],
  },
  {
    id: "tools",
    title: "Tools & Infrastructure",
    skills: [
      "Git / GitHub Actions",
      "PNPM / Turborepo",
      "Vercel",
      "Agile / Team Leadership",
    ],
  },
];

// --- Seed ------------------------------------------------------------------

async function main() {
  console.log(
    `Seeding ${NEXT_PUBLIC_SANITY_PROJECT_ID}/${NEXT_PUBLIC_SANITY_DATASET}`,
  );

  const docs = [siteSettings, homePage];

  for (const [index, p] of projects.entries()) {
    console.log(`Project: ${p.slug}`);
    const [thumbnailRef, videoRef] = await Promise.all([
      upload("image", p.thumbnail),
      upload("file", p.video),
    ]);
    docs.push({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      visible: true,
      order: (index + 1) * 10,
      description: p.description,
      role: p.role,
      year: p.year,
      tags: p.tags,
      metrics: p.metrics,
      overview: p.overview.map((text) => block(text, "bullet")),
      thumbnail: { _type: "image", asset: thumbnailRef, alt: p.title },
      video: { _type: "file", asset: videoRef },
      link: p.link,
    });
  }

  experience.forEach((e, index) =>
    docs.push({
      _id: `experience-${e.company.toLowerCase()}`,
      _type: "experience",
      order: (index + 1) * 10,
      ...e,
    }),
  );

  education.forEach((e, index) =>
    docs.push({
      _id: `education-${index + 1}`,
      _type: "education",
      order: (index + 1) * 10,
      ...e,
    }),
  );

  skillCategories.forEach(({ id, ...c }, index) =>
    docs.push({
      _id: `skillCategory-${id}`,
      _type: "skillCategory",
      order: (index + 1) * 10,
      ...c,
    }),
  );

  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc));
  await tx.commit();

  console.log(`\n✓ Seeded ${docs.length} documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
