import { CogIcon } from "@sanity/icons/Cog";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HomeIcon } from "@sanity/icons/Home";
import { InboxIcon } from "@sanity/icons/Inbox";
import { UserIcon } from "@sanity/icons/User";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home Page"),
        ),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("About Page"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("education").title("Education"),
      S.documentTypeListItem("skillCategory").title("Skills"),
      S.divider(),
      S.listItem()
        .title("Messages")
        .id("messages")
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title("Messages")
            .items([
              S.listItem()
                .title("New")
                .id("messages-new")
                .icon(InboxIcon)
                .child(
                  S.documentList()
                    .title("New messages")
                    .schemaType("contactSubmission")
                    .filter('_type == "contactSubmission" && status == "new"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                    .initialValueTemplates([]),
                ),
              S.listItem()
                .title("All messages")
                .id("messages-all")
                .icon(EnvelopeIcon)
                .child(
                  S.documentList()
                    .title("All messages")
                    .schemaType("contactSubmission")
                    .filter('_type == "contactSubmission"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                    .initialValueTemplates([]),
                ),
            ]),
        ),
    ]);
