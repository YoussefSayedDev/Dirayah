"use client";

import { cn } from "@/lib/utils";
import { Directions, Languages, Locale } from "@/types/localization";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Language {
  code: Locale;
  name: string;
  flag: string;
}

const LANGUAGES: Readonly<Language[]> = [
  { code: Languages.Arabic, name: "العربية", flag: "/images/flags/egypt.png" },
  { code: Languages.English, name: "English", flag: "/images/flags/usa.png" },
] as const;

const DEFAULT_LANGUAGE = LANGUAGES[1];

const getStoredLanguage = (currentLocale: Locale): Language => {
  try {
    if (typeof window === "undefined") {
      return (
        LANGUAGES.find((lang) => lang.code === currentLocale) ??
        DEFAULT_LANGUAGE
      );
    }

    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (!storedLanguage) {
      return (
        LANGUAGES.find((lang) => lang.code === currentLocale) ??
        DEFAULT_LANGUAGE
      );
    }

    return LANGUAGES.find((l) => l.code === storedLanguage) ?? DEFAULT_LANGUAGE;
  } catch (e) {
    console.error("Error accessing localStorage:", e);
    return DEFAULT_LANGUAGE;
  }
};

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const dir = useMemo(
    () => (locale === Languages.Arabic ? Directions.RTL : Directions.LTR),
    [locale],
  );

  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    getStoredLanguage(locale as Locale),
  );

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      if (lang.code === locale) {
        setOpen(false);
        return;
      }

      setIsChangeLanguage(true);

      if (typeof window !== "undefined") {
        localStorage.setItem("preferredLanguage", lang.code);
      }

      setSelectedLanguage(lang);
      setOpen(false);

      const newPath = pathname.replace(`/${locale}`, `/${lang.code}`);
      router.push(newPath);
    },
    [locale, pathname, router],
  );

  const buttonContent = useMemo(
    () => (
      <span className="flex items-center gap-2">
        <Image
          src={selectedLanguage.flag}
          alt={selectedLanguage.name}
          width={20}
          height={20}
          className={cn(isChangeLanguage ? "opacity-50" : "")}
        />
        {isChangeLanguage ? (
          <p className="text-xs">{t("changingLanguage")}</p>
        ) : (
          selectedLanguage.name
        )}
      </span>
    ),
    [isChangeLanguage, selectedLanguage, t],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Change Language"
          className="w-[150px] justify-between md:w-[200px]"
          disabled={isChangeLanguage}
        >
          {buttonContent}
          {isChangeLanguage ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] md:w-[200px]">
        <Command>
          <CommandInput
            dir={dir}
            className="placeholder:text-xs"
            placeholder={t("searchLanguage")}
            aria-label={t("searchLanguage")}
          />
          <CommandList>
            <CommandEmpty>{t("noLanguagesFound")}</CommandEmpty>
            <CommandGroup>
              {LANGUAGES.map((lang) => (
                <CommandItem
                  key={lang.code}
                  onSelect={() => handleLanguageChange(lang)}
                  className="hover:bg-accent cursor-pointer transition-colors"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 transition-opacity",
                      selectedLanguage.code === lang.code
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <span className="flex items-center gap-2">
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      width={20}
                      height={20}
                    />
                    {lang.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
