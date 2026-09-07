"use client";

import { useLenis } from "lenis/react";
import { MenuIcon } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavLinks } from "@/features/site-shell/components/NavLinks";
import type { NavItem } from "@/features/site-shell/lib/nav-items";
import type { SectionId } from "@/lib/site";

type MobileNavProps = {
  items: NavItem[];
  dir: "ltr" | "rtl";
  labels: { open: string; title: string };
};

export function MobileNav({ items, dir, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const navigate = (id: SectionId, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    // The drawer holds a scroll lock while it closes; scroll once it has let go.
    window.setTimeout(() => lenis?.scrollTo(`#${id}`), 250);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={labels.open} />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent
        side={dir === "rtl" ? "left" : "right"}
        className="w-[min(320px,85vw)] gap-10 border-divider bg-ground p-8 pt-16"
      >
        <SheetTitle className="rail mb-0 text-ink">{labels.title}</SheetTitle>
        <NavLinks items={items} className="flex-col gap-7 text-[13px]" onNavigate={navigate} />
      </SheetContent>
    </Sheet>
  );
}
