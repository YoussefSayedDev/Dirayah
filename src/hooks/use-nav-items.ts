"use client";

import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Home,
  MessageSquare,
  School,
  Settings,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function useNavItems(userRole: string) {
  const t = useTranslations("sidebar");
  const locale = useLocale();

  // Get navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        title: t("home"),
        href: `/${locale}/dashboard`,
        icon: Home,
      },
      {
        title: t("messages"),
        href: `/${locale}/dashboard/messages`,
        icon: MessageSquare,
      },
      {
        title: t("settings"),
        href: `/${locale}/dashboard/settings`,
        icon: Settings,
      },
    ];

    const roleSpecificItems = {
      student: [
        {
          title: t("courses"),
          href: `/${locale}/dashboard/courses`,
          icon: BookOpen,
        },
        {
          title: t("assignments"),
          href: `/${locale}/dashboard/assignments`,
          icon: ClipboardList,
        },
        {
          title: t("exams"),
          href: `/${locale}/dashboard/exams`,
          icon: GraduationCap,
        },
      ],
      teacher: [
        {
          title: t("courses"),
          href: `/${locale}/dashboard/courses`,
          icon: BookOpen,
        },
        {
          title: t("assignments"),
          href: `/${locale}/dashboard/assignments`,
          icon: ClipboardList,
        },
        {
          title: t("students"),
          href: `/${locale}/dashboard/students`,
          icon: Users,
        },
        {
          title: t("exams"),
          href: `/${locale}/dashboard/exams`,
          icon: GraduationCap,
        },
      ],
      parent: [
        {
          title: t("children"),
          href: `/${locale}/dashboard/children`,
          icon: Users,
        },
        {
          title: t("progress"),
          href: `/${locale}/dashboard/progress`,
          icon: ClipboardList,
        },
      ],
      admin: [
        {
          title: t("users"),
          href: `/${locale}/dashboard/users`,
          icon: Users,
        },
        {
          title: t("courses"),
          href: `/${locale}/dashboard/courses`,
          icon: BookOpen,
        },
        {
          title: t("teachers"),
          href: `/${locale}/dashboard/teachers`,
          icon: School,
        },
        {
          title: t("students"),
          href: `/${locale}/dashboard/students`,
          icon: GraduationCap,
        },
      ],
    };

    return [
      ...commonItems,
      ...(roleSpecificItems[userRole as keyof typeof roleSpecificItems] || []),
    ];
  };

  return {
    navItems: getNavItems(),
  };
}
