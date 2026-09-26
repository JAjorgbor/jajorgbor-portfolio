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
