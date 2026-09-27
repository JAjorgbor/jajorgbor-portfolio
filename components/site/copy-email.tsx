"use client";

import { useState } from "react";

// §8 Contact: the email is the biggest thing on the page and copies on click.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={copy}
        data-magnetic
        className="display-mid credit-link break-all text-left text-step-3 text-ink"
        aria-label={`Copy ${email} to clipboard`}
      >
        {email}
      </button>
      <span className="meta text-ink-3" aria-live="polite">
        {copied ? <span className="text-accent">Copied</span> : "Click to copy"}
      </span>
    </div>
  );
}
