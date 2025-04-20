// "use client";

// import type React from "react";

// import { getArabicErrorMessage } from "@/lib/helpers";
// import { AuthError } from "@/types/validation";
// import {
//   signIn as nextAuthSignIn,
//   signOut as nextAuthSignOut,
//   useSession,
// } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";
// import { User } from "@/lib/stores/useUserStore";

// // type User = {
// //   id: string;
// //   email: string;
// //   name?: string;
// //   role?: string;
// //   onboardingCompleted: boolean;
// //   onboardingStep: number;
// //   firstName?: string;
// //   lastName?: string;
// // };

// type AuthResponse = {
//   error: AuthError | null;
// };

// type AuthContextType = {
//   user: User | null;
//   isLoading: boolean;
//   signIn: (username: string, password: string) => Promise<AuthResponse>;
//   signUp: (
//     email: string,
//     password: string,
//     username: string,
//   ) => Promise<AuthResponse>;
//   signOut: () => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
//   signInWithFacebook: () => Promise<void>;
//   // updateOnboardingStatus: (
//   //   completed: boolean,
//   //   step?: number,
//   //   userData?: {
//   //     role?: string;
//   //     firstName?: string;
//   //     lastName?: string;
//   //     profile?: {
//   //       dateOfBirth?: Date;
//   //     };
//   //     studentProfile?: {
//   //       interests?: string[];
//   //       grade?: string;
//   //       school?: string;
//   //       educationLevel?: string;
//   //       courses?: string[];
//   //       courseCode?: string;
//   //     };
//   //     teacherProfile?: {
//   //       experience?: string;
//   //       subject?: string;
//   //       professionalTitle?: string;
//   //       bio?: string;
//   //     };
//   //     parentProfile?: {
//   //       relation?: string;
//   //       numberOfChildren?: string;
//   //       childUsername?: string;
//   //       childEmail?: string;
//   //     };
//   //   },
//   // ) => Promise<AuthResponse>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const { data: session, status, update } = useSession();
//   const [user, setUser] = useState<User | null>(null);
//   const isLoading = status === "loading";

//   console.log({
//     role: session?.user.role,
//   });

//   useEffect(() => {
//     if (session?.user) {
//       setUser({
//         id: session.user.id,
//         email: session.user.email!,
//         name: session.user.name || undefined,
//         role: session.user.role,
//         onboardingCompleted: session.user.onboardingCompleted || false,
//         onboardingStep: session.user.onboardingStep || 0,
//         firstName: session.user.firstName,
//         lastName: session.user.lastName,
//       });
//     } else {
//       setUser(null);
//     }
//     console.log({
//       "session changed": session,
//     });
//   }, [session]);

//   const signIn = async (
//     username: string,
//     password: string,
//   ): Promise<AuthResponse> => {
//     try {
//       const result = await nextAuthSignIn("credentials", {
//         username,
//         password,
//         redirect: false,
//       });

//       if (result?.error) {
//         return {
//           error: {
//             message: {
//               en: result.error,
//               ar: getArabicErrorMessage(result.error),
//             },
//             isLocalized: true,
//           },
//         };
//       }

//       return { error: null };
//     } catch {
//       return {
//         error: {
//           message: {
//             en: "An unexpected error occurred",
//             ar: "حدث خطأ غير متوقع",
//           },
//           isLocalized: true,
//         },
//       };
//     }
//   };

//   const signOut = async () => {
//     await nextAuthSignOut({ redirect: false });
//     router.push("/sign-in");
//   };

//   const signInWithGoogle = async () => {
//     await nextAuthSignIn("google", { callbackUrl: "/dashboard" });
//   };

//   const signInWithFacebook = async () => {
//     await nextAuthSignIn("facebook", { callbackUrl: "/dashboard" });
//   };

//   const updateOnboardingStatus = async (
//     completed: boolean,
//     step?: number,
//     userData?: {
//       role?: string;
//       firstName?: string;
//       lastName?: string;
//       profile?: {
//         dateOfBirth?: Date;
//       };
//       studentProfile?: {
//         interests?: string[];
//         grade?: string;
//         school?: string;
//         educationLevel?: string;
//         courses?: string[];
//         courseCode?: string;
//       };
//       teacherProfile?: {
//         experience?: string;
//         subject?: string;
//         professionalTitle?: string;
//         bio?: string;
//       };
//       parentProfile?: {
//         relation?: string;
//         numberOfChildren?: string;
//         childUsername?: string;
//         childEmail?: string;
//       };
//     },
//   ) => {
//     try {
//       if (!user) {
//         return {
//           error: {
//             message: {
//               en: "User not authenticated",
//               ar: "المستخدم غير مصرح",
//             },
//             isLocalized: true,
//           },
//         };
//       }

//       const response = await fetch("/api/user/onboarding", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           completed,
//           step: step !== undefined ? step : user.onboardingStep,
//           userData,
//         }),
//       });

//       const data = await response.json();

//       console.log({
//         data,
//       });

//       if (!response.ok) {
//         return {
//           error: {
//             message: {
//               en: data.message || "Failed to update onboarding status",
//               ar: data.messageAr || "فشل تحديث حالة التسجيل",
//             },
//             isLocalized: true,
//           },
//         };
//       }

//       // Update the session with all the new user data
//       await update({
//         ...session,
//         user: {
//           ...session?.user,
//           onboardingCompleted: completed,
//           onboardingStep: step !== undefined ? step : user.onboardingStep,
//           ...(userData?.role && { role: userData.role }),
//           ...(userData?.firstName && { firstName: userData.firstName }),
//           ...(userData?.lastName && { lastName: userData.lastName }),
//           ...(userData?.profile && { profile: userData.profile }),
//           ...(userData?.studentProfile && {
//             studentProfile: userData.studentProfile,
//           }),
//           ...(userData?.teacherProfile && {
//             teacherProfile: userData.teacherProfile,
//           }),
//           ...(userData?.parentProfile && {
//             parentProfile: userData.parentProfile,
//           }),
//         },
//       });

//       // Update the user with the new data
//       console.log({
//         userData,
//       });

//       return { error: null };
//     } catch (error) {
//       return {
//         error: {
//           message: {
//             en: `An unexpected error occurred: ${error}`,
//             ar: `حدث خطأ غير متوقع: ${error}`,
//           },
//           isLocalized: true,
//         },
//       };
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         signIn,
//         signUp,
//         signOut,
//         signInWithGoogle,
//         signInWithFacebook,
//         updateOnboardingStatus,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// };
