import Breadcrumbs from "@/components/Breadcrumbs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import DashboardSidebar from "@/modules/home/components/DashboardSidebar";

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
          defaultSize={80}
          minSize={75}
          maxSize={80}
          className="w-full h-full flex items-center flex-col"
        >
          <div className="w-full p-4 py-4.5">
            <Breadcrumbs />
          </div>
          <Separator />

          <div className="w-full h-full p-4">{children}</div>
        </ResizablePanel>
      </main>
    </ResizablePanelGroup>
  );
}
