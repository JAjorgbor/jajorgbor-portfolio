"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submitForm } from "@linkpane/sdk";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { saveContactSubmission } from "@/lib/actions/contact";
import type { ContactContent } from "@/sanity/lib/types";

const schema = z.object({
  firstName: z.string().min(2, "At least 2 characters"),
  lastName: z.string().min(2, "At least 2 characters"),
  email: z.email("Enter a valid email"),
  Message: z.string().min(10, "At least 10 characters"),
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const field =
  "field-credit w-full bg-transparent py-3 text-step-0 text-ink placeholder:text-ink-3";

export function ContactForm({ content }: { content?: ContactContent | null }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError(null);
    const { website, ...fields } = data;

    // Save to Sanity and forward to Linkpane (email notification) in parallel;
    // the message counts as delivered if either one succeeds.
    const [saved, forwarded] = await Promise.allSettled([
      saveContactSubmission(data),
      website
        ? Promise.resolve()
        : submitForm({
            apiBaseUrl: "https://api.linkpane.com/v2",
            slug: "portfolio-website-contact-form",
            data: fields,
            pid: "42770138",
          }),
    ]);

    const savedOk = saved.status === "fulfilled" && saved.value.ok;
    if (savedOk || forwarded.status === "fulfilled") {
      setSent(true);
      reset();
      return;
    }
    setError(
      (saved.status === "fulfilled" && !saved.value.ok && saved.value.error) ||
        "Something went wrong. Please try again later.",
    );
  }

  if (sent) {
    return (
      <div className="mt-16 border-t border-line pt-10" aria-live="polite">
        <p className="display-mid text-step-3">{content?.successTitle ?? "Sent."}</p>
        {content?.successMessage && <p className="lead mt-4 text-ink-2">{content.successMessage}</p>}
        <button type="button" onClick={() => setSent(false)} className="meta meta-link mt-8 text-ink">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      data-reveal="block"
      data-delay="0.3"
      className="mt-16 border-t border-line pt-10"
    >
      <p className="meta text-ink-3">Or write here</p>

      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message}>
          <input id="firstName" className={field} autoComplete="given-name" {...register("firstName")} />
        </Field>
        <Field label="Last name" error={errors.lastName?.message}>
          <input id="lastName" className={field} autoComplete="family-name" {...register("lastName")} />
        </Field>
        <Field label="Email" error={errors.email?.message} span>
          <input id="email" type="email" className={field} autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Message" error={errors.Message?.message} span>
          <textarea id="Message" rows={5} className={`${field} resize-y`} {...register("Message")} />
        </Field>
      </div>

      {error && (
        <p className="meta mt-6 text-accent" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="meta button-credit mt-10 px-6 py-4 text-ink disabled:opacity-60"
      >
        {isSubmitting ? "Sending" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  span,
  children,
}: {
  label: string;
  error?: string;
  span?: boolean;
  children: React.ReactElement<{ id: string }>;
}) {
  return (
    <div className={`flex flex-col gap-2 ${span ? "md:col-span-2" : ""}`}>
      <label htmlFor={children.props.id} className="meta text-ink-3">
        {label}
      </label>
      {children}
      {error && (
        <span className="meta text-accent" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
