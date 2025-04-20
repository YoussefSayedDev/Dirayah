// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { subjects, subjectsCategories } from "@/lib/data";
// // import { useAuth } from "@/providers/auth-provider";
// import { useUserStore } from "@/lib/stores/userStore";
// import { BookOpen, Calendar, LayoutDashboard, Lightbulb } from "lucide-react";
// import { useLocale, useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { Button } from "../../ui/button";

// export default function StudentOnboarding({ step }: { step: number }) {
//   const router = useRouter();
//   // const { updateOnboardingProgress } = useUserStore();

//   const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
//   const [courseCode, setCourseCode] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     school: "",
//     grade: "",
//     educationLevel: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Collect all data in one state object
//   const [collectedData, setCollectedData] = useState({
//     personalInfo: {},
//     educationInfo: {},
//     coursesInfo: {},
//   });

//   // Toggle course selection
//   const toggleCourseSelection = (courseId: string) => {
//     if (selectedCourses.includes(courseId)) {
//       setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
//     } else {
//       setSelectedCourses([...selectedCourses, courseId]);
//     }
//   };

//   // Function to update form data
//   const updateFormData = (field: string, value: string) => {
//     setFormData({
//       ...formData,
//       [field]: value,
//     });
//   };

//   // Function to validate form data
//   const validateForm = () => {
//     if (step === 1) {
//       if (!formData.firstName.trim()) {
//         toast.error(t("validation.firstNameRequired"));
//         return false;
//       }
//       if (!formData.lastName.trim()) {
//         toast.error(t("validation.lastNameRequired"));
//         return false;
//       }
//     } else if (step === 2) {
//       if (interests.length === 0) {
//         toast.error(t("validation.interestsRequired"));
//         return false;
//       }
//       if (!formData.educationLevel) {
//         toast.error(t("validation.educationLevelRequired"));
//         return false;
//       }
//     } else if (step === 3) {
//       if (selectedCourses.length === 0 && !courseCode.trim()) {
//         toast.error(t("validation.courseSelectionRequired"));
//         return false;
//       }
//     }
//     return true;
//   };

//   // Function to collect data at each step without saving to DB
//   const collectStepData = () => {
//     if (!validateForm()) return false;

//     // Collect data based on current step
//     if (step === 1) {
//       setCollectedData({
//         ...collectedData,
//         personalInfo: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           dateOfBirth: formData.dateOfBirth
//             ? new Date(formData.dateOfBirth)
//             : undefined,
//         },
//       });
//     } else if (step === 2) {
//       setCollectedData({
//         ...collectedData,
//         educationInfo: {
//           interests,
//           grade: formData.grade,
//           school: formData.school,
//           educationLevel: formData.educationLevel,
//         },
//       });
//     } else if (step === 3) {
//       setCollectedData({
//         ...collectedData,
//         coursesInfo: {
//           courses: selectedCourses,
//           courseCode: courseCode.trim() || undefined,
//         },
//       });
//     }

//     return true;
//   };

//   // Handle next step
//   // const handleNext = async () => {
//   //   if (step === 3) {
//   //     await updateOnboardingProgress(false, 3);

//   //     // Navigate to completion page
//   //     router.push("/onboarding/completion");
//   //   } else {
//   //     // Collect data for the current step
//   //     const isValid = collectStepData();
//   //     if (isValid) {
//   //       // Update onboarding progress in the store
//   //       await updateOnboardingProgress(false, step + 1);
//   //       onNext(step + 1);
//   //     }
//   //   }
//   // };

//   const t = useTranslations("Onboarding.student");
//   const locale = useLocale();

//   const toggleInterest = (value: string) => {
//     if (interests.includes(value)) {
//       setInterests(interests.filter((i) => i !== value));
//     } else {
//       setInterests([...interests, value]);
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:

//       case 2:

//       case 3:

//       case 4:

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-background rounded-lg border p-6 shadow-sm">
//       {isSubmitting ? (
//         <div className="flex h-40 items-center justify-center">
//           <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
//         </div>
//       ) : (
//         <>
//           {renderStep()}

//           <div className="mt-8 flex justify-between">
//             {step > 0 ? (
//               <Button
//                 variant="outline"
//                 onClick={() =>
//                   router.push(`/onboarding/student-profile?step=${step - 1}`)
//                 }
//                 disabled={isSubmitting}
//               >
//                 {t("navigation.previous")}
//               </Button>
//             ) : (
//               <div></div>
//             )}

//             <Button
//               onClick={() =>
//                 router.push(`/onboarding/student-profile?step=${step + 1}`)
//               }
//               disabled={isSubmitting || step === 3}
//             >
//               {step === 3 ? t("navigation.complete") : t("navigation.next")}
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
