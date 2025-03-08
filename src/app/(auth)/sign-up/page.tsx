import { SignUpForm } from "@/components/auth/sign-up-form";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <p className="text-muted-foreground mt-2 text-base">
            Sign up for a new account
          </p>
          <div className="my-8">
            <SignUpForm />
          </div>
          <Link href="/sign-in" className="block text-center hover:underline">
            Already have an account? Sign in
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
