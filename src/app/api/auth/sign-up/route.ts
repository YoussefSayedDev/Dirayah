import { hashPassword } from "@/lib/passwordUtils";
import { prisma } from "@/lib/prisma";
import { AuthError } from "@/types/validation";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type AuthResponse = {
  error: AuthError | null;
};

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const result = userSchema.safeParse(body);
    if (!result.success) {
      const response: AuthResponse = {
        error: {
          message: "Invalid input data",
          isLocalized: false,
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { username, email, password } = result.data;

    // Check if user already exists
    const existingUserWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const existingUserWithUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserWithUsername) {
      const response: AuthResponse = {
        error: {
          message: {
            en: "User with this username already exists",
            ar: "يوجد مستخدم بهذا الاسم بالفعل",
          },
          isLocalized: true,
        },
      };
      return NextResponse.json(response, { status: 409 });
    }

    if (existingUserWithEmail) {
      const response: AuthResponse = {
        error: {
          message: {
            en: "User with this email already exists",
            ar: "يوجد مستخدم بهذا البريد الإلكتروني بالفعل",
          },
          isLocalized: true,
        },
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    //Create user and profile in a transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          email,
          username,
          name: username, // Use username as initial name
          password: hashedPassword,
        },
      });

      // Create empty profile - details will be filled during onboarding
      await tx.profile.create({
        data: {
          userId: newUser.id,
          onboardingCompleted: false,
          onboardingStep: 0,
        },
      });

      return newUser;
    });

    const response: AuthResponse = {
      error: null,
    };
    return NextResponse.json(
      {
        ...response,
        userId: user.id,
        message: {
          en: "User registered successfully",
          ar: "تم تسجيل المستخدم بنجاح",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);
    const response: AuthResponse = {
      error: {
        message: {
          en: "An error occurred during registration",
          ar: "حدث خطأ أثناء التسجيل",
        },
        isLocalized: true,
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
