"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function FirstStep() {
  const t = useTranslations("Onboarding.student");
  const { data, setStudentPersonalInfo } = useOnboardingStore();

  const [formData, setFormData] = useState({
    firstName: data.student?.personalInfo?.firstName || "",
    lastName: data.student?.personalInfo?.lastName || "",
    dateOfBirth: data.student?.personalInfo?.dateOfBirth
      ? new Date(data.student.personalInfo.dateOfBirth)
          .toISOString()
          .split("T")[0]
      : "",
  });

  // Update the store whenever form data changes
  useEffect(() => {
    setStudentPersonalInfo(
      formData.firstName,
      formData.lastName,
      formData.dateOfBirth,
    );
  }, [formData, setStudentPersonalInfo]);

  // Function to update form data
  const updateFormData = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

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
          <Label htmlFor="firstName">{t("case0.form.firstNameLabel")}</Label>
          <Input
            id="firstName"
            placeholder={t("case0.form.firstNamePlaceholder")}
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">{t("case0.form.lastNameLabel")}</Label>
          <Input
            id="lastName"
            placeholder={t("case0.form.lastNamePlaceholder")}
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob">{t("case0.form.dobLabel")}</Label>
        <Input
          id="dob"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
        />
      </div>
    </div>
  );
}
