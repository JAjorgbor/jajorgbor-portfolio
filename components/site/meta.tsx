import { Link } from "next-view-transitions";
import type { ComponentProps } from "react";

export function Label({ children }: { children: React.ReactNode }) {
  return <span className="meta block text-ink-3">{children}</span>;
}

export function Value({ children }: { children: React.ReactNode }) {
  return <span className="meta block text-ink">{children}</span>;
}

export function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Value>{children}</Value>
    </div>
  );
}

export function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-2 rounded-full bg-accent align-middle"
    />
  );
}

type MetaLinkProps = ComponentProps<typeof Link> & { external?: boolean };

export function MetaLink({ external, children, className = "", ...props }: MetaLinkProps) {
  const cls = `meta meta-link inline-block text-ink ${className}`;
  if (external) {
    const href = typeof props.href === "string" ? props.href : String(props.href);
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children} ↗
      </a>
    );
  }
  return (
    <Link {...props} className={cls}>
      {children}
    </Link>
  );
}
