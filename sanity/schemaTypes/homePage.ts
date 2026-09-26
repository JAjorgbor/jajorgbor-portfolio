import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

const heading = (name: string, title: string) =>
  defineField({ name, title, type: "string" });

const paragraph = (name: string, title: string) =>
  defineField({ name, title, type: "text", rows: 3 });

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "projects", title: "Projects" },
    { name: "about", title: "About" },
    { name: "skills", title: "Skills" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        heading("headingLine1", "Heading (line 1)"),
        heading("headingLine2", "Heading (line 2)"),
        defineField({
          name: "intro",
          title: "Intro",
          description: "Displayed after your name in bold.",
          type: "text",
          rows: 3,
        }),
        heading("primaryCtaLabel", "Primary button label"),
        heading("secondaryCtaLabel", "Resume button label"),
      ],
    }),
    defineField({
      name: "projectsSection",
      title: "Projects section",
      type: "object",
      group: "projects",
      fields: [heading("heading", "Heading"), paragraph("subheading", "Subheading")],
    }),
    defineField({
      name: "about",
      title: "About section",
      type: "object",
      group: "about",
      fields: [
        heading("heading", "Heading"),
        heading("headingMuted", "Heading (muted second line)"),
        defineField({
          name: "body",
          title: "Body",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
              styles: [{ title: "Normal", value: "normal" }],
              lists: [],
            }),
          ],
        }),
        heading("experienceBadge", "Experience badge"),
      ],
    }),
    defineField({
      name: "skillsSection",
      title: "Skills section",
      type: "object",
      group: "skills",
      fields: [heading("heading", "Heading"), paragraph("subheading", "Subheading")],
    }),
    defineField({
      name: "contactSection",
      title: "Contact section",
      type: "object",
      group: "contact",
      fields: [
        heading("heading", "Heading"),
        heading("headingAccent", "Heading (highlighted part)"),
        paragraph("body", "Body"),
        heading("successTitle", "Success title"),
        paragraph("successMessage", "Success message"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
