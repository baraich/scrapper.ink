"use client";
import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SidebarItem, sidebarItems } from "../lib/routes";
import { useSkippedMobile } from "@/hooks/use-skipped-mobile";
import Logo from "./Logo";

interface Props {
  collapsed: boolean;
}

export default function DashboardSidebar({ collapsed }: Props) {
  const pathname = usePathname();
  const isMobile = useSkippedMobile();
  const isCollapsed = collapsed || isMobile;

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

  return (
    <ResizablePanel
      defaultSize={25}
      minSize={20}
      maxSize={25}
      className={cn("max-w-0", !isCollapsed && "max-w-xl")}
    >
      <div className="hidden sm:block">
        <Logo />
        <Separator />

        <div className="p-4 flex-col flex gap-2">
          {sidebarItems.map((sidebarItem) => (
            <Button
              asChild
              key={sidebarItem.id}
              variant={
                isActiveSidebarItem(sidebarItem, activeSidebarItem)
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
    </ResizablePanel>
  );
}
