import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the current session
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          messageAr: "غير مصرح",
        },
        {
          status: 401,
        },
      );
    }

    // Check if email exists
    if (!session.user.email) {
      return NextResponse.json(
        {
          success: false,
          message: "User email not found",
          messageAr: "لم يتم العثور على البريد الإلكتروني للمستخدم",
        },
        { status: 400 },
      );
    }

    // Fetch full user + profile from Prisma
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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

    // check if user exists in database
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          messageAr: "لم يتم العثور على المستخدم",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        messageAr: "خطأ في الخادم",
      },
      { status: 500 },
    );
  }
}
