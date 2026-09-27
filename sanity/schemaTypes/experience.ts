import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      description: 'e.g. "Jul 2025 - Nov 2025"',
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Work type",
      type: "string",
      options: { list: ["Remote", "Hybrid", "On-site"], layout: "radio" },
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "achievements",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "role", company: "company", period: "period" },
    prepare: ({ title, company, period }) => ({
      title,
      subtitle: [company, period].filter(Boolean).join(" · "),
    }),
  },
});
