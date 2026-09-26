import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

export const SOCIAL_PLATFORMS = [
  { title: "GitHub", value: "github" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "X / Twitter", value: "twitter" },
  { title: "Instagram", value: "instagram" },
  { title: "YouTube", value: "youtube" },
  { title: "Dribbble", value: "dribbble" },
  { title: "Website", value: "website" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact & Socials" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      description: "Shown in the header logo, hero and footer.",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
      group: "general",
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "chatLabel",
      title: "Chat label",
      description: 'Label above the phone number, e.g. "Chat With Me".',
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone number (display)",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "chatUrl",
      title: "Chat link",
      description: "e.g. https://wa.me/234XXXXXXXXXX",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: SOCIAL_PLATFORMS },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Site title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Site description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
