import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./aboutPage";
import { contactSubmission } from "./contactSubmission";
import { education } from "./education";
import { experience } from "./experience";
import { homePage } from "./homePage";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { skillCategory } from "./skillCategory";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  aboutPage,
  project,
  experience,
  education,
  skillCategory,
  contactSubmission,
];

export const SINGLETON_TYPES = new Set(["siteSettings", "homePage", "aboutPage"]);
