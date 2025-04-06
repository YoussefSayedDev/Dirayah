// import StudentOnboarding from "@/components/onboarding/student/student-onboarding";
import StudentOnboardingWrapper from "@/components/onboarding/student/student-onboarding-wrapper";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="container mx-auto py-8">
        <StudentOnboardingWrapper />
      </div>
    </main>
  );
}
