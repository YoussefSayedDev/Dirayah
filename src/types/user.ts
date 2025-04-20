export type UserRole = "student" | "teacher" | "parent" | "admin";

export type OnboardingRole = "student" | "teacher" | "parent";

export type Profile =
  | {
      role: string;
      firstName: string;
      lastName: string;
      onboardingCompleted: boolean;
      onboardingStep: number;
    }
  | undefined;

export type StudentProfile = {
  interests: string[];
  grade: string;
  school: string;
  educationLevel: string;
  courses: string[];
  courseCode: string;
};

export type TeacherProfile = {
  experience: string;
  subject: string;
  professionalTitle: string;
  bio: string;
};

export type ParentProfile = {
  relation: string;
  numberOfChildren: string;
  childUsername: string;
  childEmail: string;
};
