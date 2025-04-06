import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RoleSchema = z.object({
  role: z.enum(["student", "teacher", "parent"]),
});

export async function PUT(req: NextRequest) {
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

  try {
    // Parse request body
    const body = await req.json();
    const parseResult = RoleSchema.safeParse(body);

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

    // Upsert user role in the profile table
    await prisma.profile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        role: parseResult.data.role,
      },
      update: {
        role: parseResult.data.role,
      },
    });

    return NextResponse.json({
      message: "Role update successfully",
    });
  } catch (error) {
    console.error("Role update error:", error);
    return NextResponse.json({
      message: "Failed to update role",
    });
  }
}
