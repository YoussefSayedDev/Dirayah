import { CheckEmailForm } from "@/components/auth/check-email-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function CheckEmailPage() {
  // Localization
  const t = await getTranslations("auth.checkEmail");
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          {/* Back Button */}
          <div className="w-full text-start">
            <Link href="/sign-in" className="mb-10 flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="text-primary h-4 w-4" />
                <span className="text-primary text-sm font-medium">
                  {t("back")}
                </span>
              </Button>
            </Link>
          </div>

          {/* Form */}
          <div className="text-center">
            {/* Message Logo */}
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold">{t("heading")}</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {t("description")}
            </p>
            <div className="my-8">
              <CheckEmailForm />
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <aside className="auth-image-section overflow-hidden">
        <Image
          src="/images/auth-pages.webp"
          alt="Learning LMS Auth Image"
          width={1200}
          height={1200}
          priority
        />
      </aside>
    </main>
  );
}
