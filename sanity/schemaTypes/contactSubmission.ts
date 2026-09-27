import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

// Submissions are created by the website's contact form, never by hand (see
// SUBMISSION_ID_PREFIX in sanity/lib/constants.ts for how they stay private).
export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Message",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "firstName", type: "string", readOnly: true }),
    defineField({ name: "lastName", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "message", type: "text", rows: 8, readOnly: true }),
    defineField({ name: "submittedAt", type: "datetime", readOnly: true }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Replied", value: "replied" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Private notes",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      status: "status",
    },
    prepare: ({ firstName, lastName, email, status }) => ({
      title:
        `${status === "new" ? "● " : ""}${firstName ?? ""} ${lastName ?? ""}`.trim(),
      subtitle: email,
    }),
  },
});
