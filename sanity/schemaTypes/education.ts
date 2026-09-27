import { BookIcon } from "@sanity/icons/Book";
import { defineArrayMember, defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "school",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "degree",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "period", type: "string" }),
    defineField({ name: "location", type: "string" }),
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
  preview: { select: { title: "degree", subtitle: "school" } },
});
