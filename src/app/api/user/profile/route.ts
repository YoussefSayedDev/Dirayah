import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UserProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    const parseResult = UserProfileSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { errors: parseResult.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Get data the current user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email ?? undefined,
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

    // Update user profile in database
    await prisma.profile.update({
      where: { userId: user.id },
      data: {
        ...parseResult.data,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({
      message: "Failed to update profile",
    });
  }
}
