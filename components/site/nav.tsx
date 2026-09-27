"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

const NAV = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="col-span-6 flex justify-end gap-6 md:col-span-8 md:gap-8">
      {NAV.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="meta nav-link"
            data-magnetic
            aria-current={current ? "page" : undefined}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
