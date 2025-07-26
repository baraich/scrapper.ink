import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        "flex flex-col items-center justify-center min-h-screen p-4",
        dm_sans.className
      )}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary text-center">
            404
          </CardTitle>
          <CardDescription className="text-2xl font-semibold text-center">
            Page Not Found
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Don&apos;t worry, even the best data sometimes gets lost
            in the internet.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link
            href={"/"}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors w-full justify-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please contact our
            support team.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
