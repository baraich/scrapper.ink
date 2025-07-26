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

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname === "/" ? [""] : pathname.split("/");

  return (
    <div className="flex items-center flex-start py-0.5">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbLink
                className="capitalize"
                href={`/${path}`}
              >
                <BreadcrumbItem>
                  {path === "" ? "home" : path}
                </BreadcrumbItem>
              </BreadcrumbLink>

              {idx !== paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
