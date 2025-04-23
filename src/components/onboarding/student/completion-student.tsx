"use client";

import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { useUserStore } from "@/lib/stores/userStore";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function StudentCompletionForm() {
  const router = useRouter();
  const { data, resetOnboardingData } = useOnboardingStore();
  const { updateStudentProfile, updateProfile, updateOnboardingProgress } =
    useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations("Onboarding.role.options.student");

  const handleSubmit = async () => {
    if (!data.student) {
      toast.error(t("errors.noStudentData"));
      return;
    }

    setIsSubmitting(true);
    try {
      // Update profile with personal info
      if (data.student.personalInfo) {
        await updateProfile(
          data.student.personalInfo.firstName || "",
          data.student.personalInfo.lastName || "",
        );
      }

      // Update student profile
      await updateStudentProfile(
        data.student.interests || [],
        data.student.grade || "",
        data.student.school || "",
        data.student.educationLevel || "",
        data.student.courses || [],
        data.student.courseCode || "",
        data.student.personalInfo?.dateOfBirth || "",
      );

      // Mark onboarding as completed
      await updateOnboardingProgress(true, 4);

      toast.success(t("success"));

      // Reset onboarding data
      resetOnboardingData();

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(t("errors.failedToSave"), error);
      toast.error(t("errors.failedToSave"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Ready to Start Learning!</h2>
        <p className="text-muted-foreground mt-2">
          Your student profile is all set up. You&apos;re ready to explore
          courses and start your learning journey.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold">Review Your Information</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Personal Information</h4>
            <p>
              Name: {data.student?.personalInfo?.firstName}{" "}
              {data.student?.personalInfo?.lastName}
            </p>
            <p>
              Date of Birth:{" "}
              {data.student?.personalInfo?.dateOfBirth
                ? new Date(
                    data.student.personalInfo.dateOfBirth,
                  ).toLocaleDateString()
                : "Not provided"}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Education Information</h4>
            <p>School: {data.student?.school || "Not provided"}</p>
            <p>Grade: {data.student?.grade || "Not provided"}</p>
            <p>
              Education Level: {data.student?.educationLevel || "Not provided"}
            </p>
            <p>
              Interests:{" "}
              {data.student?.interests?.join(", ") || "None selected"}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Course Information</h4>
            <p>Selected Courses: {data.student?.courses?.length || 0}</p>
            {data.student?.courseCode && (
              <p>Course Code: {data.student.courseCode}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => router.push("/onboarding/student-profile?step=1")}
            disabled={isSubmitting}
          >
            Edit Information
          </Button>

          <Button
            className="cursor-pointer"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Complete Setup"}
          </Button>
        </div>
      </div>
    </div>
  );
}
