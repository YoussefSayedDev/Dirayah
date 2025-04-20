"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { subjects } from "@/lib/data";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ThirdStep() {
  const t = useTranslations("Onboarding.student");
  const { data, setStudentCourseInfo } = useOnboardingStore();
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    data.student?.courses || [],
  );
  const [courseCode, setCourseCode] = useState(data.student?.courseCode || "");

  const toggleCourseSelection = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  // Update the store whenever form data changes
  useEffect(() => {
    setStudentCourseInfo(selectedCourses, courseCode);
  }, [selectedCourses, courseCode, setStudentCourseInfo]);

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">{t("case2.title")}</h2>
      </div>

      <p className="text-muted-foreground mb-4">{t("case2.description")}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {subjects.map((course) => (
          <Card
            key={course.id}
            className={`hover:border-primary cursor-pointer transition-colors ${selectedCourses.includes(course.id) ? "border-primary bg-primary/5" : "hover:border-primary"}`}
            onClick={() => toggleCourseSelection(course.id)}
          >
            <CardContent className="p-4">
              <h3 className="font-medium">{course.title}</h3>
              <div className="text-muted-foreground mt-1 flex justify-between text-sm">
                <span>{course.category}</span>
                <span>{course.level}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <p className="text-muted-foreground text-sm">
          {t("case2.orEnterCode")}
        </p>
        <div className="mt-2 flex gap-2">
          <Input
            placeholder={t("case2.josnCoursePlaceholder")}
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <Button variant="outline" className="whitespace-nowrap">
            {t("case2.josnCourse")}
          </Button>
        </div>
      </div>
    </div>
  );
}
