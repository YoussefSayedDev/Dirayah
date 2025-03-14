import { AuthLayoutGrid } from "@/components/auth/auth-layout-grid";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function SignUpPage() {
  // Localization
  const t = await getTranslations("auth.signUp");
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
            <SignUpForm />
          </div>
          <Link href="/sign-in" className="block text-center hover:underline">
            {t("hasAccount")}
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <aside className="auth-image-section">
        <AuthLayoutGrid />
      </aside>
    </main>
  );
}
