import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  // Check if user is authenticated
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  try {
    // Check if user has completed onboarding
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email ?? undefined,
      },
      include: {
        profile: true,
      },
    });

    if (user?.profile?.onboardingCompleted) {
      redirect("/dashboard");
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    redirect("/sign-in");
  }

  const t = await getTranslations("Onboarding.main.page");
  const locale = await getLocale();

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold">{t("welcomeToOnboarding")}</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          {t("completeProfileInfo")}
        </p>
      </div>

      <div className="mb-10 rounded-lg border p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">{t("roles.title")}</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              1
            </div>
            <div>
              <h3 className="font-medium">
                {t("roles.options.student.title")}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t("roles.options.student.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              2
            </div>
            <div>
              <h3 className="font-medium">
                {t("roles.options.teacher.title")}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t("roles.options.teacher.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              3
            </div>
            <div>
              <h3 className="font-medium">{t("roles.options.parent.title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("roles.options.parent.description")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              4
            </div>
            <div>
              <h3 className="font-medium">{t("roles.options.admin.title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("roles.options.admin.description")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link href="/onboarding/role">
          <Button
            size="lg"
            className="cursor-pointer gap-2"
            aria-label="Continue to role selection"
          >
            {t("continue")}
            {locale === "en" ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <ArrowRight className="h-5 w-5 rotate-180" />
            )}
          </Button>
        </Link>
      </div>
      <div className="absolute right-4 bottom-4 flex items-center gap-2">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
