// export type OnboardingProfile<T extends UserRole> = T extends "student"
//   ? StudentProfile
//   : T extends "teacher"
//     ? TeacherProfile
//     : T extends "parent"
//       ? ParentProfile
//       : never;

// export type OnboardingPayload<T extends UserRole> = {
//   completed: boolean;
//   step?: number;
//   profile: OnboardingProfile<T>;
// };
