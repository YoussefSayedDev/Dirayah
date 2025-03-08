import { SignInForm } from "@/components/auth/sign-in-form";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <p className="text-muted-foreground mt-2 text-base">
            Sign in to your account to manage your profile
          </p>
          <div className="my-8">
            <SignInForm />
          </div>
          <Link href="/sign-up" className="block text-center hover:underline">
            Don&apos;t have an account? Sign up
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
