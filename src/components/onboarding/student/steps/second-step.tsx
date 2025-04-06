"use client";
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
import { subjectsCategories } from "@/lib/data";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { BookOpen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function SecondStep() {
  const t = useTranslations("Onboarding.student");
  const { data, setStudentEducationInfo } = useOnboardingStore();
  const locale = useLocale();
  const [interests, setInterests] = useState<string[]>(
    data.student?.interests || [],
  );

  const toggleInterest = (subject: string) => {
    if (interests.includes(subject)) {
      setInterests(interests.filter((item) => item !== subject));
    } else {
      setInterests([...interests, subject]);
    }
  };

  const [formData, setFormData] = useState({
    educationLevel: data.student?.educationLevel || "",
    school: data.student?.school || "",
    grade: data.student?.grade || "",
  });

  // Update the store whenever form data changes
  useEffect(() => {
    setStudentEducationInfo(
      interests,
      formData.educationLevel,
      formData.school,
      formData.grade,
    );
  }, [formData, setStudentEducationInfo, interests]);

  // Function to update form data
  const updateFormData = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

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
        <Select
          dir={locale === "ar" ? "rtl" : "ltr"}
          value={formData.educationLevel}
          onValueChange={(value) => updateFormData("educationLevel", value)}
        >
          <SelectTrigger id="education-level">
            <SelectValue
              placeholder={t("case1.form.educationLevelPlaceholder")}
            />
          </SelectTrigger>
          <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
            <SelectItem value="elementary">
              {t("case1.form.elmentary")}
            </SelectItem>
            <SelectItem value="middle">{t("case1.form.middle")}</SelectItem>
            <SelectItem value="high">{t("case1.form.high")}</SelectItem>
            <SelectItem value="college">{t("case1.form.college")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 pt-4">
        <Label htmlFor="school">{t("case1.form.schoolLabel")}</Label>
        <Input
          id="school"
          placeholder={t("case1.form.schoolPlaceholder")}
          value={formData.school}
          onChange={(e) => updateFormData("school", e.target.value)}
        />
      </div>

      <div className="space-y-2 pt-4">
        <Label htmlFor="grade">{t("case1.form.gradeLabel")}</Label>
        <Input
          id="grade"
          placeholder={t("case1.form.gradePlaceholder")}
          value={formData.grade}
          onChange={(e) => updateFormData("grade", e.target.value)}
        />
      </div>
    </div>
  );
}
