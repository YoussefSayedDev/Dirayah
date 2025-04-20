import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <main className="bg-background flex min-h-screen flex-col">{children}</main>
  );
}
