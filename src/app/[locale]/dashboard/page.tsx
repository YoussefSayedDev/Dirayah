import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col overflow-auto">
          <main className="flex-1 overflow-auto p-6">
            <h1>Dashboard</h1>
          </main>
        </div>
      </div>
    </div>
  );
}
