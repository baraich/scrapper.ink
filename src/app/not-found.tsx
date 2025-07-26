import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { DM_Sans } from "next/font/google";
import Link from "next/link";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function NotFoundPage() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background",
        dm_sans.className
      )}
    >
      <div className="max-w-sm w-full">
        <h1 className="text-6xl font-bold text-primary tracking-tight">
          404
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Page not found.
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href={"/"} className="flex items-center justify-center">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              <span>Go Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
