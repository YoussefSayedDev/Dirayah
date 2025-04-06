"use client";

import CompletionScreen from "@/components/onboarding/completion-screen";
import ParentOnboarding from "@/components/onboarding/parent-onboarding";
import StudentOnboarding from "@/components/onboarding/student-onboarding";
import TeacherOnboarding from "@/components/onboarding/teacher-onboarding";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/providers/auth-provider";
import { LocalizedMessage } from "@/types/localization";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ClapperboardIcon as ChalkboardTeacher,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<
    "student" | "teacher" | "parent" | null
  >(null);

  const { user, isLoading, updateOnboardingStatus } = useAuth();

  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "parent" | null>(
    null,
  );

  const t = useTranslations("Onboarding");
  const locale = useLocale();

  const router = useRouter();

  // Maximum steps for each role
  const maxSteps = {
    student: 4,
    teacher: 5,
    parent: 3,
  };

  // Initialze step from user data
  useEffect(() => {
    if (user && !isLoading) {
      setStep(user.onboardingStep || 0);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setRole((user.role as "student" | "teacher" | "parent") || null);

      // If onboarding is already completed, redirect to dashboard
      if (user.onboardingCompleted) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, router]);

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!role) return (step / 1) * 100; // Initial step (role selection) is 1 step
    return (step / (maxSteps[role] + 1)) * 100; // +1 for the initial role selection step
  };

  const handleNext = async () => {
    // First step is role selection
    if (step === 0) {
      if (!role) {
        toast(t("common.error"), {
          description: t("common.pleaseSelectRole"),
          style: {
            color: "destructive",
          },
        });
        return;
      }

      if (!firstName || !lastName) {
        toast(t("common.error"), {
          description: t("common.pleaseEnterName"),
          style: {
            color: "destructive",
          },
        });
        return;
      }

      // Update user profile with role adn name
      const { error } = await updateOnboardingStatus(false, 1, {
        firstName,
        lastName,
        role,
      });

      if (error) {
        const errorMessage = error.isLocalized
          ? (error.message as LocalizedMessage)[
              locale as keyof LocalizedMessage
            ]
          : (error.message as string);

        console.log({
          errorMessage,
        });

        toast(t("common.error"), {
          description: errorMessage,
          style: {
            color: "red",
          },
        });
        return;
      }

      setStep(1);
      return;
    }

    // Role-specific steps
    if (role) {
      if (step < maxSteps[role]) {
        const newStep = step + 1;
        setStep(newStep);

        // Update onboarding step in the database
        await updateOnboardingStatus(false, newStep);
      } else {
        setCompleted(true);
        completeOnboarding();
      }
    }
  };

  const handleBack = async () => {
    if (step > 0) {
      const newStep = step - 1;
      setStep(newStep);

      // Update onboarding step in the database
      await updateOnboardingStatus(false, newStep);
    }
  };

  const handleSkip = () => {
    setCompleted(true);
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      const { error } = await updateOnboardingStatus(true);

      if (error) {
        const errorMessage = error.isLocalized
          ? (error.message as LocalizedMessage)[
              locale as keyof LocalizedMessage
            ]
          : (error.message as string);

        console.log({
          errorMessage,
        });

        toast(t("common.error"), {
          description: errorMessage,
          style: {
            color: "red",
          },
        });
        return;
      }

      toast(t("common.success"), {
        description: t("main.onboardingComplete"),
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch {
      toast(t("common.error"), {
        description: t("common.somethingWentWrong"),
        style: {
          color: "destructive",
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-4 text-sm">
            {t("common.loading")}
          </p>
        </div>
      </div>
    );
  }

  const renderOnboardingContent = () => {
    if (completed) {
      return <CompletionScreen role={selectedRole} />;
    }

    if (!selectedRole) {
      return (
        <div className="flex flex-col items-center space-y-8 p-6">
          <h1 className="text-primary text-center text-3xl font-bold">
            {t("main.title")}
          </h1>
          <p className="text-muted-foreground max-w-md text-center">
            {t("main.description")}
          </p>

          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <RoleCard
              title={t("main.roles.student.title")}
              description={t("main.roles.student.description")}
              icon={<BookOpen className="h-12 w-12 text-blue-500" />}
              onClick={() => setSelectedRole("student")}
            />

            <RoleCard
              title={t("main.roles.teacher.title")}
              description={t("main.roles.teacher.description")}
              icon={<ChalkboardTeacher className="h-12 w-12 text-green-500" />}
              onClick={() => setSelectedRole("teacher")}
            />

            <RoleCard
              title={t("main.roles.parent.title")}
              description={t("main.roles.parent.description")}
              icon={<Users className="h-12 w-12 text-purple-500" />}
              onClick={() => setSelectedRole("parent")}
            />
          </div>
          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      );
    }

    switch (selectedRole) {
      case "student":
        return <StudentOnboarding step={step} />;
      case "teacher":
        return <TeacherOnboarding step={step} />;
      case "parent":
        return <ParentOnboarding step={step} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {selectedRole && !completed && (
        <div className="bg-background border-b px-4 py-2">
          <div
            dir={locale === "en" ? "ltr" : "rtl"}
            className="mx-auto max-w-4xl"
          >
            <Progress value={calculateProgress()} className="h-2" />
            <div className="text-muted-foreground mt-1 flex justify-between text-xs">
              <span>
                {t("common.step", { step: step + 1 })}{" "}
                {t("common.of", { total: maxSteps[selectedRole] })}
              </span>
              <button
                onClick={handleSkip}
                className="text-primary cursor-pointer hover:underline"
              >
                {t("common.skipOnboarding")}
              </button>
            </div>
          </div>
          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {renderOnboardingContent()}

          {selectedRole && !completed && (
            <div className="mt-8 flex justify-between">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={handleBack}
              >
                {locale === "en" ? (
                  <ArrowLeft className="mr-2 h-4 w-4" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                {t("common.back")}
              </Button>

              <Button className="cursor-pointer" onClick={handleNext}>
                {step < maxSteps[selectedRole]
                  ? t("common.continue")
                  : t("common.completed")}
                {locale === "en" ? (
                  <ArrowRight className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowLeft className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface RoleCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
}

function RoleCard({ title, description, icon, onClick }: RoleCardProps) {
  return (
    <Card
      className="hover:border-primary flex cursor-pointer flex-col items-center border-2 p-6 text-center transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="bg-background mb-4 rounded-full p-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
}
