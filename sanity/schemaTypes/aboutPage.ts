import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: "Use / where the line should break on wide screens.",
      type: "string",
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        }),
      ],
    }),
    defineField({
      name: "approach",
      title: "Approach",
      description: "Three short statements about how you work.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "detail",
      title: "Playful detail",
      description: "One line. Leave empty to hide.",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
