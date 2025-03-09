import { SignUpForm } from "@/components/auth/sign-up-form";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function SignUpPage() {
  // Localization
  const t = await getTranslations("auth.signUp");
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          <h1 className="text-2xl font-semibold">{t("heading")}</h1>
          <p className="text-muted-foreground mt-2 text-base">
            {t("description")}
          </p>
          <div className="my-8">
            <SignUpForm />
          </div>
          <Link href="/sign-in" className="block text-center hover:underline">
            {t("hasAccount")}
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <aside className="auth-image-section">
        <Image
          src="/images/photos/sign-up.jpg"
          alt="Auth Illustration"
          width={500}
          height={500}
          className="h-full w-full object-cover"
          priority
          loading="eager"
        />
      </aside>
    </main>
  );
}
