"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects, subjectsCategories } from "@/lib/data";
import { BookOpen, Calendar, LayoutDashboard, Lightbulb } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "../ui/button";

export default function StudentOnboarding({ step }: { step: number }) {
  const [interests, setInterests] = useState<string[]>([]);

  const t = useTranslations("onboarding.student");
  const locale = useLocale();

  const toggleInterest = (value: string) => {
    if (interests.includes(value)) {
      setInterests(interests.filter((i) => i !== value));
    } else {
      setInterests([...interests, value]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case0.title")}</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {t("case0.form.firstNameLabel")}
                </Label>
                <Input
                  id="firstName"
                  placeholder={t("case0.form.firstNamePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {t("case0.form.lastNameLabel")}
                </Label>
                <Input
                  id="lastName"
                  placeholder={t("case0.form.lastNamePlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">{t("case0.form.dobLabel")}</Label>
              <Input id="dob" type="date" />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case1.title")}</h2>
            </div>

            <p className="text-muted-foreground">{t("case1.description")}</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {subjectsCategories.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject}
                    checked={interests.includes(subject)}
                    onCheckedChange={() => toggleInterest(subject)}
                  />
                  <Label htmlFor={subject}>{subject}</Label>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="education-level">
                {t("case1.form.educationLevelLabel")}
              </Label>
              <Select dir={locale === "ar" ? "rtl" : "ltr"}>
                <SelectTrigger id="education-level">
                  <SelectValue
                    placeholder={t("case1.form.educationLevelPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                  <SelectItem value="elementary">
                    {t("case1.form.elmentary")}
                  </SelectItem>
                  <SelectItem value="middle">
                    {t("case1.form.middle")}
                  </SelectItem>
                  <SelectItem value="high">{t("case1.form.high")}</SelectItem>
                  <SelectItem value="college">
                    {t("case1.form.college")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case2.title")}</h2>
            </div>

            <p className="text-muted-foreground mb-4">
              {t("case2.description")}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {subjects.map((course) => (
                <Card
                  key={course.id}
                  className="hover:border-primary cursor-pointer transition-colors"
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium">{course.title}</h3>
                    <div className="text-muted-foreground mt-1 flex justify-between text-sm">
                      <span>{course.category}</span>
                      <span>{course.level}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-muted-foreground text-sm">
                {t("case2.orEnterCode")}
              </p>
              <div className="mt-2 flex gap-2">
                <Input placeholder={t("case2.josnCoursePlaceholder")} />
                <Button variant="outline" className="whitespace-nowrap">
                  {t("case2.josnCourse")}
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
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

      default:
        return null;
    }
  };

  return (
    <div className="bg-background rounded-lg border p-6 shadow-sm">
      {renderStep()}
    </div>
  );
}
