import { UserRole } from "@/types/user";
import { AuthError } from "@/types/validation";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../api/client";
import { formatError } from "../helpers/error";

export interface User {
  id: string;
  name?: string;
  username: string;
  email: string;
  image: string | null;
  profile?: {
    role: string;
    firstName: string;
    lastName: string;
    onboardingCompleted: boolean;
    onboardingStep: number;
  };
  studentProfile?: {
    interests?: string[];
    grade?: string;
    school?: string;
    educationLevel?: string;
    courses?: string[];
    courseCode?: string;
    dateOfBirth?: Date | string;
  };
  teacherProfile?: {
    experience?: string;
    subject?: string;
    professionalTitle?: string;
    bio?: string;
  };
  parentProfile?: {
    relation?: string;
    numberOfChildren?: string;
    childUsername?: string;
    childEmail?: string;
  };
}

type UserState = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateProfile: (
    firstName: string,
    lastName: string,
  ) => Promise<{ error: AuthError } | undefined>;
  updateRole: (role: UserRole) => Promise<{ error: AuthError } | undefined>;
  updateStudentProfile: (
    interests: string[],
    grade: string,
    school: string,
    educationLevel: string,
    courses: string[],
    courseCode: string,
    dateOfBirth: Date | string,
  ) => Promise<{ error: AuthError } | undefined>;
  updateTeacherProfile: (
    experience: string,
    subject: string,
    professionalTitle: string,
    bio: string,
  ) => Promise<{ error: AuthError } | undefined>;
  updateParentProfile: (
    relation: string,
    numberOfChildren: string,
    childUsername: string,
    childEmail: string,
  ) => Promise<{ error: AuthError } | undefined>;
  updateOnboardingProgress: (
    completed: boolean,
    step: number,
  ) => Promise<{ error: AuthError } | undefined>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      setUser: (user) => set({ user }),

      updateProfile: async (firstName, lastName) => {
        const user = get().user;
        if (!user) return { error: formatError("User not authenticated") };
        set({ isLoading: true });
        try {
          await apiClient.put("/user/profile", { firstName, lastName });
          set({
            user: {
              ...user,
              profile: { ...user.profile!, firstName, lastName },
            },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          return { error: formatError(error) };
        }
      },

      updateRole: async (role) => {
        const user = get().user;
        if (!user) return { error: formatError("User not authenticated") };
        set({ isLoading: true });
        try {
          await apiClient.put("/user/role", { role });
          set({
            user: {
              ...user,
              profile: { ...user.profile!, role },
            },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          return { error: formatError(error) };
        }
      },

      updateStudentProfile: async (
        interests,
        grade,
        school,
        educationLevel,
        courses,
        courseCode,
      ) => {
        const user = get().user;
        if (!user) return { error: formatError("User not authenticated") };
        set({ isLoading: true });
        try {
          await apiClient.put("/user/student-profile", {
            interests,
            grade,
            school,
            educationLevel,
            courses,
            courseCode,
          });
          set({
            user: {
              ...user,
              studentProfile: {
                interests,
                grade,
                school,
                educationLevel,
                courses,
                courseCode,
              },
            },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          return { error: formatError(error) };
        }
      },

      updateTeacherProfile: async (
        experience,
        subject,
        professionalTitle,
        bio,
      ) => {
        const user = get().user;
        if (!user) return { error: formatError("User not authenticated") };
        set({ isLoading: true });
        try {
          await apiClient.put("/user/teacher-profile", {
            experience,
            subject,
            professionalTitle,
            bio,
          });
          set({
            user: {
              ...user,
              teacherProfile: { experience, subject, professionalTitle, bio },
            },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          return { error: formatError(error) };
        }
      },

      updateParentProfile: async (
        relation,
        numberOfChildren,
        childUsername,
        childEmail,
      ) => {
        const user = get().user;
        if (!user) return { error: formatError("User not authenticated") };
        set({ isLoading: true });
        try {
          await apiClient.put("/user/parent-profile", {
            relation,
            numberOfChildren,
            childUsername,
            childEmail,
          });
          set({
            user: {
              ...user,
              parentProfile: {
                relation,
                numberOfChildren,
                childUsername,
                childEmail,
              },
            },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          return { error: formatError(error) };
        }
      },

      updateOnboardingProgress: async (completed, step) => {
        const user = get().user;
        if (!user) return { error: formatError("User not authenticated") };
        set({ isLoading: true });
        try {
          await apiClient.put("/user/onboarding", { completed, step });
          set({
            user: {
              ...user,
              profile: {
                ...user.profile!,
                onboardingCompleted: completed,
                onboardingStep: step,
              },
            },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          return { error: formatError(error) };
        }
      },
    }),
    {
      name: "user-store",
    },
  ),
);
