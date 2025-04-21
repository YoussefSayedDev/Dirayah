import { VerifyEmailForm } from "@/components/auth/verfiy-email-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function VerifyEmailPage() {
  // Localization
  const t = await getTranslations("auth.verifyEmail");
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form-section">
        <div className="auth-form-container text-center">
          <h1 className="text-2xl font-semibold">{t("heading")}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {t("description")}
          </p>
          <div className="my-8">
            <VerifyEmailForm />
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
