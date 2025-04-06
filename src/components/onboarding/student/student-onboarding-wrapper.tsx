"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { useUserStore } from "@/lib/stores/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FirstStep } from "./steps/first-step";
import ForthStep from "./steps/forth-step";
import SecondStep from "./steps/second-step";
import ThirdStep from "./steps/third-step";

const TOTAIL_STUDENT_STEPS = 4;

export default function StudentOnboardingWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCurrentStep } = useOnboardingStore();
  const { updateOnboardingProgress } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the step from URL parameter or default to 1
  const currentStep = searchParams.has("step")
    ? parseInt(searchParams.get("step")!, 10)
    : 1;

  if (currentStep > TOTAIL_STUDENT_STEPS) {
    router.push("/onboarding/student-profile?step=3");
  }

  if (currentStep < 1) {
    router.push("/onboarding/student-profile?step=1");
  }

  const handleNext = async () => {
    // Validate current step
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep === 4) {
      // Final step - redirect to completion page
      router.push("/onboarding/completion");
    } else {
      // Update onboarding progress in the user store
      setIsSubmitting(true);
      try {
        await updateOnboardingProgress(false, currentStep + 1);
        router.push(`/onboarding/student-profile?step=${currentStep + 1}`);
      } catch {
        toast.error("Failed to update progress");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/onboarding/student-profile?step=${currentStep - 1}`);
    }
  };

  // Validate the current step
  const validateCurrentStep = () => {
    // Add validation logic here based on the current step
    // This is just a placeholder - implement actual validation
    return true;
  };

  // Render the appropriate step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <ForthStep />;
      default:
        return <FirstStep />;
    }
  };

  // Update the onboarding store with the current step
  useEffect(() => {
    setCurrentStep(currentStep);
  }, [currentStep, setCurrentStep]);

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardContent className="pt-6">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  s <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            <span>Personal Info</span>
            <span>Education</span>
            <span>Courses</span>
            <span>Completion</span>
          </div>
        </div>

        {/* Step content */}
        {renderStep()}
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1 || isSubmitting}
        >
          Previous
        </Button>
        <Button
          className="cursor-pointer"
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {currentStep === 4 ? "Review" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
