"use client";
import { LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ForthStep() {
  const t = useTranslations("Onboarding.student");
  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-2">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">{t("case3.title")}</h2>
      </div>

      <div className="bg-background relative rounded-lg border p-4">
        <img
          src="/placeholder.svg?height=300&width=600"
          alt="Student Dashboard Preview"
          className="w-full rounded-md border"
        />

        <div className="absolute top-1/4 left-1/4 flex items-center">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
            1
          </div>
          <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
            {t("case3.accessCourses")}
          </div>
        </div>

        <div className="absolute top-1/2 right-1/4 flex items-center">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
            2
          </div>
          <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
            {t("case3.trackProgress")}
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/3 flex items-center">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
            3
          </div>
          <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
            {t("case3.connectWithTeachers")}
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-center">
        {t("case3.description")}
      </p>
    </div>
  );
}
