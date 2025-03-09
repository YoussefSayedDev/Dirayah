import { SignInForm } from "@/components/auth/sign-in-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function SignInPage() {
  // Localization
  const t = await getTranslations("auth.signIn");
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
            <SignInForm />
          </div>
          <Link href="/sign-up" className="block text-center hover:underline">
            {t("noAccount")}
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <aside className="auth-image-section">
        <Image
          src="/images/photos/sign-in.jpg"
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
