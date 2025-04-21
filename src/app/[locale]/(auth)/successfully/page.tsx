import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SuccessfullyPage() {
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form-section">
        <div className="auth-form-container gap-4 text-center">
          <div className="mx-auto w-fit rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold">
            Your password has been successfully reset!
          </h1>

          <p className="max-w-md text-gray-600">
            You can now log in with your new password. If you encounter any
            issues, please contact us.
          </p>

          <Button asChild className="my-8 mt-4 w-full">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
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
