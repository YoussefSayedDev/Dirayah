// Helper function to get Arabic error messages
export function getArabicErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    "Invalid credentials": "بيانات الاعتماد غير صالحة",
    // Add more error message mappings as needed
  };
  return errorMessages[error] || "حدث خطأ";
}
