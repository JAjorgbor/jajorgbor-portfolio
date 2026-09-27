import { ProjectsIcon } from "@sanity/icons/Projects";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "links", title: "Links" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visible",
      title: "Visible on website",
      description: "Turn off to hide this project from the site without deleting it.",
      type: "boolean",
      group: "content",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      group: "content",
      initialValue: 100,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "One sentence under the title in the title sequence.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", type: "string", group: "content" }),
    defineField({ name: "year", type: "string", group: "content" }),
    defineField({
      name: "tags",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "metrics",
      title: "Impact",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "overview",
      title: "Role overview",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Narrative sections",
      description: "The case study body, in order. Each section can carry media.",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "section",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({
              name: "body",
              type: "array",
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [{ title: "Bullet", value: "bullet" }],
                }),
              ],
            }),
            defineField({
              name: "media",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: [defineField({ name: "alt", type: "string" })],
                }),
                defineArrayMember({
                  type: "file",
                  name: "video",
                  options: { accept: "video/*" },
                }),
              ],
            }),
            defineField({
              name: "layout",
              type: "string",
              options: {
                list: [
                  { title: "Column", value: "column" },
                  { title: "Full bleed", value: "full" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "column",
            }),
          ],
          preview: {
            select: { title: "heading", media: "media.0" },
            prepare: ({ title, media }) => ({ title: title ?? "Untitled section", media }),
          },
        }),
      ],
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Demo video",
      type: "file",
      group: "media",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "loopStart",
      title: "Hover loop start (seconds)",
      description: "Where the 4-second hover loop begins in the demo video.",
      type: "number",
      group: "media",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({ name: "link", title: "Live URL", type: "url", group: "links" }),
    defineField({ name: "repoUrl", title: "Repository URL", type: "url", group: "links" }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      role: "role",
      visible: "visible",
      media: "thumbnail",
    },
    prepare: ({ title, role, visible, media }) => ({
      title,
      subtitle: visible === false ? `Hidden · ${role ?? ""}` : role,
      media,
    }),
  },
});
