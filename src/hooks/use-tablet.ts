"use client";
import { useEffect, useState } from "react";

const Tablet_BREAKPOINT = 1024;

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${Tablet_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsTablet(window.innerWidth < Tablet_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsTablet(window.innerWidth < Tablet_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTablet;
}
