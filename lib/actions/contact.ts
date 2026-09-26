"use server";

import { randomUUID } from "node:crypto";
import * as z from "zod";
import { writeClient } from "@/sanity/lib/write-client";
import { SUBMISSION_ID_PREFIX } from "@/sanity/lib/constants";

const submissionSchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  Message: z.string().trim().min(10).max(5000),
  // Honeypot: hidden from humans, so any value means a bot filled the form.
  website: z.string().optional(),
});

export type SaveContactResult = { ok: true } | { ok: false; error: string };

export async function saveContactSubmission(
  input: unknown,
): Promise<SaveContactResult> {
  const parsed = submissionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const { website, Message, ...fields } = parsed.data;
  if (website) return { ok: true };

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("SANITY_API_WRITE_TOKEN is not set; message not saved.");
    return { ok: false, error: "Messaging is temporarily unavailable." };
  }

  try {
    await writeClient.create({
      _id: `${SUBMISSION_ID_PREFIX}${randomUUID()}`,
      _type: "contactSubmission",
      ...fields,
      message: Message,
      status: "new",
      submittedAt: new Date().toISOString(),
    });
    return { ok: true };
  } catch (err) {
    console.error("Failed to save contact submission", err);
    return { ok: false, error: "Something went wrong. Please try again later." };
  }
}
