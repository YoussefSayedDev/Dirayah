import StudentCompletionForm from "@/components/onboarding/student/completion-student";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentCompletionPage() {
  const session = await auth();

  // Redirect if not authenticated
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-card mx-auto max-w-3xl rounded-lg border shadow-sm">
        <StudentCompletionForm />
      </div>
    </div>
  );
}
