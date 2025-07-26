import { useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

export function useSkippedMobile() {
  const isMobile = useIsMobile();
  const [skippedIsMobile, setSkippedIsMobile] =
    useState<boolean>(true);

  useEffect(
    function () {
      let timeout = setTimeout(
        () => setSkippedIsMobile(isMobile),
        100
      );
      return () => clearInterval(timeout);
    },
    [isMobile]
  );

  return skippedIsMobile;
}
