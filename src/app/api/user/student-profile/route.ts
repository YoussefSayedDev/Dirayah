import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Create a Zod schema based on Prisma's StudentProfile type
// This approach ensures type safety between Zod validation and Prisma
const StudentProfileSchema = z.object({
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  grade: z.string().min(1, "Grade is required"),
  school: z.string().min(1, "School name is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  courses: z.array(z.string()).optional().default([]),
  courseCode: z.string().optional(),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .transform((date) => {
      // Convert the date string to ISO DateTime format
      return new Date(date).toISOString();
    }),
});

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    const parseResult = StudentProfileSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          messageAr: "فشل التحقق من صحة البيانات",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const profileData = parseResult.data;

    // Get the current user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email ?? undefined,
      },
      include: {
        profile: {
          include: {
            studentProfile: true,
          },
        },
      },
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

    if (user.profile?.role !== "student") {
      return NextResponse.json(
        {
          message: "User not a student",
          messageAr: "المستخدم ليس طالبًا",
        },
        { status: 400 },
      );
    }

    // Prepare the data for Prisma (remove any undefined values)
    const prismaData = Object.fromEntries(
      Object.entries(profileData).filter(([, v]) => v !== undefined),
    );

    // Check if student profile already exists
    if (user.profile.studentProfile) {
      // Update existing profile
      await prisma.studentProfile.update({
        where: {
          id: user.profile.studentProfile.id,
        },
        data: prismaData,
      });

      return NextResponse.json({
        message: "Student profile updated successfully",
        messageAr: "تم تحديث الملف الشخصي للطالب بنجاح",
      });
    } else {
      // Create new student profile
      await prisma.studentProfile.create({
        data: {
          profile: {
            connect: {
              id: user.profile.id,
            },
          },
          ...prismaData,
        },
      });

      return NextResponse.json({
        message: "Student profile created successfully",
        messageAr: "تم إنشاء الملف الشخصي للطالب بنجاح",
      });
    }
  } catch (error) {
    console.error("Student profile update error:", error);
    return NextResponse.json(
      {
        message: "Failed to update student profile",
        messageAr: "فشل تحديث الملف الشخصي للطالب",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// GET endpoint to retrieve student profile
export async function GET() {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email ?? undefined,
      },
      include: {
        profile: {
          include: {
            studentProfile: true,
          },
        },
      },
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

    if (user.profile?.role !== "student") {
      return NextResponse.json(
        {
          message: "User not a student",
          messageAr: "المستخدم ليس طالبًا",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      studentProfile: user.profile.studentProfile || null,
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch student profile",
        messageAr: "فشل في جلب الملف الشخصي للطالب",
      },
      { status: 500 },
    );
  }
}
