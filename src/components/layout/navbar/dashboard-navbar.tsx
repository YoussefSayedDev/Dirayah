"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardNavbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split("/")[1];

  // Get path segments without locale
  const segments = pathname
    .replace(new RegExp(`^/${locale}/`), "")
    .split("/")
    .filter(Boolean);

  // Generate breadcrum items
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${locale}${segments
      .slice(0, index + 1)
      .map((s) => `/${s}`)
      .join("/")}`;

    // Try to translate the segment, fallback to capitalized segment
    const label = t(segment, {
      defaultMessage: segment.charAt(0).toUpperCase() + segment.slice(1),
    });

    return {
      href,
      label,
    };
  });

  // Add home as the first item
  breadcrumbs.unshift({
    href: `/${locale}/dashboard`,
    label: t("home"),
  });

  return (
    <nav className="flex items-center border-b px-6 py-3">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="text-muted-foreground h-4 w-4" />
            )}

            <Link
              href={breadcrumb.href}
              className={cn(
                "text-sm hover:underline",
                index === breadcrumbs.length - 1
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
