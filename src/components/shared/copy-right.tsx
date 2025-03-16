"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function CopyRight() {
  const [year, setYear] = useState<number | null>(null);
  const t = useTranslations("common");

  useEffect(() => {
    // Only set the year on the client side
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto w-full">
      <div className="flex w-full flex-col items-center gap-2 px-10 text-sm text-gray-500 sm:flex-row sm:justify-between lg:w-1/2">
        <span>© {year ?? "2025"} StudyFlow</span>
        <div className="flex flex-row items-center gap-1">
          <span>{t("developedBy")} </span>
          <a
            href="https://youssef-el-sayed.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm font-medium hover:underline"
          >
            {t("youssefElSayed")}
          </a>
        </div>
        <span>{t("allRightsReserved")}</span>
      </div>
    </footer>
  );
}
