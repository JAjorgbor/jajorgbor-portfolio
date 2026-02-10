export const PROJECTS = [
  {
    slug: "linkpane",
    title: "Linkpane — Link Management & Engagement Platform",
    description:
      "A platform developed at Haqqman for managing links, form endpoints, email signatures, and campaign workflows. Contributed across frontend and backend development with a focus on performance, scalability, and improving the overall product experience during its transition to a modern Next.js architecture.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB"],
    thumbnail: "/thumbnails/linkpane.png",
    role: "Frontend Lead & Fullstack Contributor",
    year: "2023",
    metrics: [
      "Led migration to Next.js App Router with TypeScript",
      "Improved data fetching performance and UI responsiveness",
      "Built scalable data-heavy interfaces and campaign workflows",
    ],
    link: "https://linkpane.com",
    video: "/videos/Linkpane.mp4",
    overview: (
      <ul className="mt-1 list-disc list-inside space-y-2">
        <li className=" flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          I led frontend development efforts during a critical phase of the
          product&apos;s evolution, helping transition the application to a more
          maintainable and scalable architecture using the Next.js App Router
          and TypeScript.
        </li>
        <li className=" flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          My work focused on improving responsiveness across data-heavy
          interfaces, refining interaction flows, and ensuring consistency
          across complex dashboard views used daily by active users. This
          contributed to a more stable and predictable experience as the
          platform expanded in scope.
        </li>
        <li className=" flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          Beyond implementation, I contributed to frontend structure and
          engineering decisions that improved developer efficiency and reduced
          friction when introducing new features into the system.
        </li>
      </ul>
    ),
  },
  {
    slug: "deer-nigeria",
    title: "DEER Nigeria — Energy On-Demand Platform",
    description:
      "An energy-on-demand platform that simplifies access to services such as diesel delivery, cooking gas, solar solutions, and electricity vending. Played an active role in developing core frontend features and improving key user workflows as part of the engineering team at Agency by Haqqman.",
    tags: ["Next.js", "React", "Tailwind CSS", "Express.js", "MongoDB"],
    thumbnail: "/thumbnails/deer-nigeria.png",
    role: "Frontend Engineer",
    year: "2023",
    metrics: [
      "Contributed to development of core frontend features",
      "Improved usability across key service workflows",
    ],
    link: "https://deernigeria.com",
    video: "/videos/DEER Nigeria.mp4",
    overview: (
      <ul className="mt-1 list-disc list-inside space-y-2">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          Actively contributed to the development of core frontend features,
          translating product and business requirements into reliable,
          production-ready interfaces used across major service flows.
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          Worked on improving interaction patterns and usability across ordering
          and account-related workflows, helping create a smoother and more
          consistent user experience.
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          Collaborated closely with design and engineering teams to deliver
          features within existing system constraints while maintaining
          performance and interface consistency as the platform expanded.
        </li>
      </ul>
    ),
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
    thumbnail: "/thumbnails/pharmahubmedica.png",
    role: "Lead Fullstack Developer",
    year: "2023",
    metrics: [
      "Developed webstore, user portal, and admin console",
      "Implemented referral system to support customer growth",
    ],
    link: "https://pharmahubmedica.ng",
    video: "/videos/PharmaHub Medica.mp4",
    overview: (
      <ul className="mt-1 list-disc list-inside space-y-2">
        <li className=" flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          I led the platform&apos;s development from initial concept to
          production, defining the system structure and implementing both
          frontend and backend components required for daily business
          operations.
        </li>
        <li className=" flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          My focus was on building a reliable ordering experience alongside an
          administrative workflow that simplified product management, order
          handling, and operational visibility for the business.
        </li>
        <li className=" flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          I also introduced a referral feature in response to evolving client
          needs, aligning product functionality with growth objectives while
          ensuring the system remained maintainable and scalable for future
          expansion.
        </li>
      </ul>
    ),
  },
];

export const SKILLS = [
  { name: "React / Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Redux Toolkit / SWR", category: "Frontend" },
  { name: "ShadCN UI / HeroUI", category: "Frontend" },
  { name: "React Native", category: "Frontend" },

  { name: "Node.js / Express.js", category: "Backend" },
  { name: "MongoDB / Mongoose", category: "Backend" },
  { name: "Bun", category: "Backend" },
  { name: "REST APIs", category: "Backend" },

  { name: "Git / GitHub Actions", category: "Tools" },
  { name: "PNPM / Turborepo", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Agile / Team Leadership", category: "Tools" },
];

export const EXPERIENCE = [
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

export const EDUCATION = [
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
