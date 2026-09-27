import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource & {
  alt?: string | null;
  lqip?: string | null;
  aspect?: number | null;
};

export type SocialLink = { _key: string; platform: string; url: string };

export type SiteSettings = {
  name?: string | null;
  role?: string | null;
  positioning?: string | null;
  availability?: string | null;
  resumeUrl?: string | null;
  notFoundLine?: string | null;
  footerNote?: string | null;
  email?: string | null;
  chatLabel?: string | null;
  phoneDisplay?: string | null;
  chatUrl?: string | null;
  socials?: SocialLink[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type HeroContent = {
  headingLine1?: string | null;
  headingLine2?: string | null;
  intro?: string | null;
  primaryCtaLabel?: string | null;
  secondaryCtaLabel?: string | null;
};

export type SectionIntro = {
  heading?: string | null;
  subheading?: string | null;
};

export type AboutContent = {
  heading?: string | null;
  headingMuted?: string | null;
  body?: PortableTextBlock[] | null;
  experienceBadge?: string | null;
};

export type ContactContent = {
  heading?: string | null;
  headingAccent?: string | null;
  body?: string | null;
  successTitle?: string | null;
  successMessage?: string | null;
};

export type HomePage = {
  hero?: HeroContent | null;
  projectsSection?: SectionIntro | null;
  about?: AboutContent | null;
  skillsSection?: SectionIntro | null;
  contactSection?: ContactContent | null;
};

export type AboutPage = {
  heading?: string | null;
  story?: PortableTextBlock[] | null;
  approach?: string[] | null;
  detail?: string | null;
};

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  role?: string | null;
  year?: string | null;
  tags?: string[] | null;
  metrics?: string[] | null;
  thumbnail?: SanityImage | null;
  videoUrl?: string | null;
  videoMimeType?: string | null;
  loopStart?: number | null;
};

export type SectionMedia =
  | ({ _key: string; _type: "image" } & SanityImage)
  | { _key: string; _type: "video"; url?: string | null; mimeType?: string | null };

export type ProjectSection = {
  _key: string;
  heading?: string | null;
  body?: PortableTextBlock[] | null;
  layout?: "column" | "full" | null;
  media?: SectionMedia[] | null;
};

export type ProjectDetail = ProjectCard & {
  overview?: PortableTextBlock[] | null;
  link?: string | null;
  repoUrl?: string | null;
  sections?: ProjectSection[] | null;
};

export type Experience = {
  _id: string;
  company: string;
  role: string;
  period?: string | null;
  type?: string | null;
  description?: string | null;
  achievements?: string[] | null;
};

export type Education = {
  _id: string;
  school: string;
  degree: string;
  period?: string | null;
  location?: string | null;
  achievements?: string[] | null;
};

export type SkillCategory = {
  _id: string;
  title: string;
  skills?: string[] | null;
};

export type HomeData = {
  home: HomePage | null;
  projects: ProjectCard[];
};

export type AboutData = {
  about: AboutPage | null;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
};
