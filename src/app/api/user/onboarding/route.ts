import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // Get the current session
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          messageAr: "غير مصرح",
        },
        {
          status: 401,
        },
      );
    }

    // Parse request body
    const body = await req.json();
    const { completed, step, userData } = body;

    const userEmail = session.user.email;

    // Make sure email is defined before proceeding
    if (!userEmail) {
      return NextResponse.json(
        {
          message: "User email not found in session",
          messageAr: "البريد الإلكتروني للمستخدم غير موجود في الجلسة",
        },
        { status: 400 },
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          messageAr: "المستخدم غير موجود",
        },
        { status: 404 },
      );
    }

    const userId = user.id;

    // First, find or create the profile
    let profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId,
          onboardingCompleted: completed,
          onboardingStep: step,
          ...(userData?.role && { role: userData.role }),
          ...(userData?.firstName && { firstName: userData.firstName }),
          ...(userData?.lastName && { lastName: userData.lastName }),
        },
      });
    } else {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { userId },
        data: {
          onboardingCompleted: completed,
          onboardingStep: step,
          ...(userData?.role && { role: userData.role }),
          ...(userData?.firstName && { firstName: userData.firstName }),
          ...(userData?.lastName && { lastName: userData.lastName }),
        },
      });
    }

    // Handle student profile data
    if (userData?.studentProfile) {
      await prisma.studentProfile.upsert({
        where: { profileId: profile.id },
        create: {
          profileId: profile.id,
          school: userData.studentProfile.school,
          grade: userData.studentProfile.grade,
          interests: userData.studentProfile.interests || [],
          ...(userData.profile?.dateOfBirth && {
            dateOfBirth: userData.profile.dateOfBirth,
          }),
        },
        update: {
          school: userData.studentProfile.school,
          grade: userData.studentProfile.grade,
          interests: userData.studentProfile.interests || [],
          ...(userData.profile?.dateOfBirth && {
            dateOfBirth: userData.profile.dateOfBirth,
          }),
        },
      });
    }

    // Handle teacher profile data
    if (userData?.teacherProfile) {
      await prisma.teacherProfile.upsert({
        where: { profileId: profile.id },
        create: {
          profileId: profile.id,
          institution: userData.teacherProfile.school,
          experience: userData.teacherProfile.experience,
          expertise:
            userData.teacherProfile.subject ||
            userData.teacherProfile.professionalTitle,
          bio: userData.teacherProfile.bio,
        },
        update: {
          institution: userData.teacherProfile.school,
          experience: userData.teacherProfile.experience,
          expertise:
            userData.teacherProfile.subject ||
            userData.teacherProfile.professionalTitle,
          bio: userData.teacherProfile.bio,
        },
      });
    }

    // Handle parent profile data
    if (userData?.parentProfile) {
      await prisma.parentProfile.upsert({
        where: { profileId: profile.id },
        create: {
          profileId: profile.id,
          parentName:
            `${userData.firstName || ""} ${userData.lastName || ""}`.trim(),
          parentPhone: userData.parentProfile.phoneNumber,
        },
        update: {
          parentName:
            `${userData.firstName || ""} ${userData.lastName || ""}`.trim(),
          parentPhone: userData.parentProfile.phoneNumber,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Onboarding status updated successfully",
        messageAr: "تم تحديث حالة التسجيل بنجاح",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating onboarding status:", error);
    return NextResponse.json(
      {
        message: `Failed to update onboarding status: ${error}`,
        messageAr: `فشل تحديث حالة التسجيل: ${error}`,
      },
      { status: 500 },
    );
  }
}
