"use client";

import type { MouseEvent } from "react";
import { useActiveSection } from "@/features/site-shell/hooks/use-active-section";
import type { NavItem } from "@/features/site-shell/lib/nav-items";
import { sectionIds, type SectionId } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  items: NavItem[];
  className?: string;
  onNavigate?: (id: SectionId, event: MouseEvent<HTMLAnchorElement>) => void;
};

export function NavLinks({ items, className, onNavigate }: NavLinksProps) {
  const active = useActiveSection(sectionIds);

  return (
    <ul className={cn("meta flex gap-[26px] text-[10.5px] whitespace-nowrap", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            data-active={active === item.id}
            onClick={onNavigate ? (event) => onNavigate(item.id, event) : undefined}
            className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out-expo after:content-[''] hover:after:scale-x-100 data-[active=true]:text-brand data-[active=true]:after:scale-x-100 rtl:after:origin-right"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
