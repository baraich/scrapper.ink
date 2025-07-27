"use client";
import Breadcrumbs from "@/modules/layout/components/Breadcrumbs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import DashboardSidebar from "@/modules/layout/components/DashboardSidebar";
import MobileSidebar from "@/modules/layout/components/MobileSidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <main className="w-screen min-h-screen flex justify-center">
        <DashboardSidebar />

        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={75}
          minSize={75}
          maxSize={80}
          className="w-full h-full flex items-center flex-col"
        >
          <div className="w-full p-4 flex items-center justify-between">
            <div className="py-1 flex gap-4">
              <MobileSidebar />
              <Breadcrumbs />
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <Separator />

          <div className="w-full h-full">{children}</div>
        </ResizablePanel>
      </main>
    </ResizablePanelGroup>
  );
}
