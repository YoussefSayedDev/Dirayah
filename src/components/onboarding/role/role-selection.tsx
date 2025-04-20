"use client";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { type User, useUserStore } from "@/lib/stores/userStore";
import { LocalizedMessage } from "@/types/localization";
import { UserRole } from "@/types/user";
import { BookOpen, ShieldUser, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "sonner";
import { RoleCard } from "./role-card";

interface RoleSelectionProps {
  user: User;
}

export function RoleSelection({ user }: RoleSelectionProps) {
  const t = useTranslations("Onboarding.role");
  const router = useRouter();
  const locale = useLocale();
  const updateRole = useUserStore((state) => state.updateRole);
  const setUser = useUserStore((state) => state.setUser);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  // Add a state to track initialization errors
  const [initError, setInitError] = useState<string | null>(null);

  // Handlers
  const handleSelectRole = async (role: UserRole) => {
    setSelectedRole(role);
    try {
      const result = await updateRole(role);

      if (result?.error) {
        // Check if the error message is a localized message
        const errorMessage = result.error.message;
        if (
          typeof errorMessage === "object" &&
          "en" in errorMessage &&
          "ar" in errorMessage
        ) {
          // Use the localized message based on current locale
          toast.error(
            errorMessage[locale as keyof LocalizedMessage] || errorMessage.en,
          );
        } else {
          // Use the string message directly
          toast.error(errorMessage);
        }
        return;
      }

      // advance to the next onboarding page-adjust path as needed
      switch (role) {
        case "student":
          router.push("/onboarding/student-profile");
          break;
        case "teacher":
          router.push("/onboarding/teacher-profile");
          break;
        case "parent":
          router.push("/onboarding/parent-profile");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error updating role:", error);
      // Show toast with error message
      toast.error("Failed to update role");
      setSelectedRole(null);
    }
  };

  useEffect(() => {
    try {
      if (user) {
        setUser(user);
        setInitError(null); // Clear any previous error on successful set
      } else {
        // Handle the case where user prop is unexpectedly null/undefined
        throw new Error("User data is missing.");
      }
    } catch (error) {
      const errorMessage =
        t("errors.userStore") || "Failed to initialize user data";
      console.error("Error setting user in store:", error);
      setInitError(errorMessage);
      toast.error(errorMessage);
    }
  }, [setUser, user, t]);

  // Render an error message if initialization failed
  if (initError) {
    return (
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-destructive text-xl font-semibold">
            {t("errors.initFailedTitle") || "Initialization Failed"}
          </h2>
          <p className="text-muted-foreground mt-2">{initError}</p>
          {/* Optional: Add a refresh button or suggestion */}
          <p className="text-muted-foreground mt-4">
            {t("errors.tryRefreshing") || "Please try refreshing the page."}
          </p>
        </div>
      </main>
    );
  }

  // Original return statement if no initialization error
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center space-y-8 p-6">
          <h1 className="text-primary text-center text-3xl font-bold">
            {t("title")}
          </h1>
          <p className="text-muted-foreground max-w-md text-center">
            {t("description")}
          </p>

          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-4">
            <RoleCard
              title={t("options.student.title")}
              description={t("options.student.description")}
              icon={<BookOpen className="h-12 w-12 text-blue-500" />}
              onClick={() => handleSelectRole("student")}
              isLoading={selectedRole === "student"}
              disabled={selectedRole !== null}
            />

            <RoleCard
              title={t("options.teacher.title")}
              description={t("options.teacher.description")}
              icon={
                <FaChalkboardTeacher className="h-12 w-12 text-green-500" />
              }
              onClick={() => handleSelectRole("teacher")}
              isLoading={selectedRole === "teacher"}
              disabled={selectedRole !== null}
            />

            <RoleCard
              title={t("options.parent.title")}
              description={t("options.parent.description")}
              icon={<Users className="h-12 w-12 text-purple-500" />}
              onClick={() => handleSelectRole("parent")}
              isLoading={selectedRole === "parent"}
              disabled={selectedRole !== null}
            />

            <RoleCard
              title={t("options.admin.title")}
              description={t("options.admin.description")}
              icon={<ShieldUser className="h-12 w-12 text-yellow-500" />}
              onClick={() => handleSelectRole("admin")}
              isLoading={selectedRole === "admin"}
              disabled={selectedRole !== null}
            />
          </div>
          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </main>
  );
}
