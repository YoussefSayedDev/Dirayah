import { RoleSelection } from "@/components/onboarding/role/role-selection";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User } from "@/lib/stores/userStore";
import { redirect } from "next/navigation";

export default async function RolePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email ?? undefined,
    },
    include: {
      profile: {
        include: {
          studentProfile: true,
          teacherProfile: true,
          parentProfile: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  // Check if user has a role
  if (user.profile?.role) {
    const role = user.profile.role;

    switch (role) {
      case "student":
        redirect("/onboarding/student-profile");
        break;
      case "teacher":
        redirect("/onboarding/teacher-profile");
        break;
      case "parent":
        redirect("/onboarding/parent-profile");
        break;
      case "admin":
        redirect("/onboarding/admin-profile");
        break;
      default:
      // do nothing
    }
  }

  const userForStore: User = {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name || undefined,
    image: user.image || null,
    profile: {
      role: user.profile?.role || "",
      firstName: user.profile?.firstName || "",
      lastName: user.profile?.lastName || "",
      onboardingCompleted: user.profile?.onboardingCompleted || false,
      onboardingStep: user.profile?.onboardingStep || 0,
    },
    studentProfile: user.profile?.studentProfile
      ? {
          interests: user.profile.studentProfile.interests || undefined,
          grade: user.profile.studentProfile.grade || undefined,
          school: user.profile.studentProfile.school || undefined,
          educationLevel: undefined,
          courses: undefined,
          courseCode: undefined,
        }
      : undefined,
    teacherProfile: user.profile?.teacherProfile
      ? {
          experience: user.profile.teacherProfile.experience || undefined,
          subject: undefined,
          professionalTitle: undefined,
          bio: user.profile.teacherProfile.bio || undefined,
        }
      : undefined,
    parentProfile: user.profile?.parentProfile
      ? {
          relation: undefined,
          numberOfChildren: undefined,
          childUsername: undefined,
          childEmail: undefined,
        }
      : undefined,
  };
  return <RoleSelection user={userForStore} />;
}
