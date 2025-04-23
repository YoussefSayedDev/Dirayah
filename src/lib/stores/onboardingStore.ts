import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Onboarding {
  student?: {
    interests?: string[];
    grade?: string;
    school?: string;
    educationLevel?: string;
    courses?: string[];
    courseCode?: string;
    personalInfo?: {
      firstName?: string;
      lastName?: string;
      dateOfBirth?: Date | string;
    };
  };
  // Parent onboarding

  // Teacher onboarding

  // Admin onboarding
}

type OnboardingState = {
  data: Onboarding;
  currentStep: number;

  // Student onboarding actions
  setStudentPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: string,
  ) => void;
  setStudentEducationInfo: (
    interests: string[],
    grade: string,
    school: string,
    educationLevel: string,
  ) => void;
  setStudentCourseInfo: (courses: string[], courseCode?: string) => void;

  // Parent onboarding actions

  // Teacher onboarding actions

  // Admin onboarding actions

  // General actions
  setCurrentStep: (step: number) => void;
  resetOnboardingData: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      data: {},
      currentStep: 1,

      // Student onboarding actions
      setStudentPersonalInfo: (firstName, lastName, dateOfBirth) =>
        set((state) => ({
          data: {
            ...state.data,
            student: {
              ...state.data.student,
              personalInfo: {
                firstName,
                lastName,
                dateOfBirth: dateOfBirth,
              },
            },
          },
        })),

      setStudentEducationInfo: (interests, grade, school, educationLevel) =>
        set((state) => ({
          data: {
            ...state.data,
            student: {
              ...state.data.student,
              interests,
              grade,
              school,
              educationLevel,
            },
          },
        })),

      setStudentCourseInfo: (courses, courseCode) =>
        set((state) => ({
          data: {
            ...state.data,
            student: {
              ...state.data.student,
              courses,
              courseCode,
            },
          },
        })),

      // Parent onboarding actions

      // Teacher onboarding actions

      // Admin onboarding actions

      // General actions
      setCurrentStep: (step) => set({ currentStep: step }),
      resetOnboardingData: () => set({ data: {}, currentStep: 1 }),
    }),
    {
      name: "onboarding-store",
    },
  ),
);
