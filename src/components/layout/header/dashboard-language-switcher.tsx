"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/lib/constants";
import { Locale } from "@/types/localization";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

type LanguageSwitcherProps = {
  currentLocale: string;
};

export function DashboardLanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const t = useTranslations("header.dashboardLanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    // Get the path without the locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

    // Create the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    // Set a cookie to remember the locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    startTransition(() => {
      router.push(newPath);
      router.refresh();
    });
  };

  const languageNames = {
    en: t("english"),
    ar: t("arabic"),
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Languages className="h-5 w-5" />
          <span className="sr-only cursor-pointer">{t("switchLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            disabled={locale === currentLocale || isPending}
            className={locale === currentLocale ? "bg-accent" : ""}
          >
            {languageNames[locale as Locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
