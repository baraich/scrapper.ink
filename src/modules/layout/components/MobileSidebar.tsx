"use client";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SidebarOpenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";
import { SidebarItem, sidebarItems } from "../lib/routes";
import Link from "next/link";
import { useSkippedMobile } from "@/hooks/use-skipped-mobile";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
  const pathname = usePathname();
  const isMobile = useSkippedMobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeSidebarItem =
    sidebarItems.find(
      (sidebarItem) =>
        sidebarItem.pathname.length > 1 &&
        pathname.includes(sidebarItem.pathname)
    ) || sidebarItems[0];

  const isActiveSidebarItem = (
    needle: SidebarItem,
    target: SidebarItem
  ) => needle.pathname === target.pathname;

  useEffect(
    function () {
      setIsOpen(false);
    },
    [pathname]
  );

  return (
    <div className={cn("flex sm:hidden", isMobile && "flex!")}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <SidebarOpenIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] space-y-4" side="left">
          <div>
            <div className="p-4 flex items-center justify-start gap-2">
              <Logo />
              <span>scrapper.ink</span>
            </div>
            <Separator />
            <div className="p-4 flex-col flex gap-2">
              {sidebarItems.map((sidebarItem) => (
                <Button
                  asChild
                  key={sidebarItem.id}
                  variant={
                    isActiveSidebarItem(
                      sidebarItem,
                      activeSidebarItem
                    )
                      ? "default"
                      : "outline"
                  }
                  className={cn("justify-start")}
                >
                  <Link href={sidebarItem.pathname}>
                    <sidebarItem.icon
                      isActive={isActiveSidebarItem(
                        sidebarItem,
                        activeSidebarItem
                      )}
                    />
                    <span>{sidebarItem.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <span className="inline-block border-r ml-1"></span>
    </div>
  );
}
