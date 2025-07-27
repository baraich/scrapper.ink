"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
import React from "react";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname === "/" ? [""] : pathname.split("/");

  return (
    <div className="flex items-center flex-start">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbLink className="capitalize" asChild>
                <Link href={`/${path}`}>
                  <BreadcrumbItem>
                    {path === "" ? "home" : path}
                  </BreadcrumbItem>
                </Link>
              </BreadcrumbLink>

              {idx !== paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
