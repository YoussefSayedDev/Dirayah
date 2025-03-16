"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Calendar, LayoutDashboard, User, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function TeacherOnboarding({ step }: { step: number }) {
  const t = useTranslations("onboarding.teacher");
  const locale = useLocale();

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case0.title")}</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {t("case0.form.firstNameLabel")}
                </Label>
                <Input
                  id="firstName"
                  placeholder={t("case0.form.firstNamePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {t("case0.form.lastNameLabel")}
                </Label>
                <Input
                  id="lastName"
                  placeholder={t("case0.form.lastNamePlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">{t("case0.experience.label")}</Label>
              <Select dir={locale === "ar" ? "rtl" : "ltr"}>
                <SelectTrigger id="experience">
                  <SelectValue
                    placeholder={t("case0.experience.select.placeholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">
                    {t("case0.experience.select.options.0-2")}
                  </SelectItem>
                  <SelectItem value="3-5">
                    {t("case0.experience.select.options.3-5")}
                  </SelectItem>
                  <SelectItem value="6-10">
                    {t("case0.experience.select.options.6-10")}
                  </SelectItem>
                  <SelectItem value="10+">
                    {t("case0.experience.select.options.10+")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expertise">{t("case0.subject.label")}</Label>
              <Select dir={locale === "ar" ? "rtl" : "ltr"}>
                <SelectTrigger id="expertise">
                  <SelectValue
                    placeholder={t("case0.subject.select.placeholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">
                    {t("case0.subject.select.options.math")}
                  </SelectItem>
                  <SelectItem value="science">
                    {t("case0.subject.select.options.science")}
                  </SelectItem>
                  <SelectItem value="programming">
                    {t("case0.subject.select.options.programming")}
                  </SelectItem>
                  <SelectItem value="languages">
                    {t("case0.subject.select.options.languages")}
                  </SelectItem>
                  <SelectItem value="history">
                    {t("case0.subject.select.options.history")}
                  </SelectItem>
                  <SelectItem value="arts">
                    {t("case0.subject.select.options.arts")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case1.profileSetup")}</h2>
            </div>

            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-200">
                  <User className="h-12 w-12 text-slate-400" />
                </div>
                <Button variant="outline" className="w-full">
                  {t("case1.uploadPhoto")}
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t("case1.professionalTitle")}</Label>
                  <Input
                    id="title"
                    placeholder={t("case1.professionalPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t("case1.bio")}</Label>
                  <Textarea
                    id="bio"
                    placeholder={t("case1.bioPlaceholder")}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case2.createCourse")}</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">{t("case2.courseTitle")}</Label>
                <Input
                  id="course-title"
                  placeholder={t("case2.courseTitlePlaceholder")}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course-category">
                    {t("case2.category.label")}
                  </Label>
                  <Select dir={locale === "ar" ? "rtl" : "ltr"}>
                    <SelectTrigger id="course-category">
                      <SelectValue
                        placeholder={t("case2.category.placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">
                        {t("case2.category.options.math")}
                      </SelectItem>
                      <SelectItem value="science">
                        {t("case2.category.options.science")}
                      </SelectItem>
                      <SelectItem value="programming">
                        {t("case2.category.options.programming")}
                      </SelectItem>
                      <SelectItem value="languages">
                        {t("case2.category.options.languages")}
                      </SelectItem>
                      <SelectItem value="history">
                        {t("case2.category.options.history")}
                      </SelectItem>
                      <SelectItem value="arts">
                        {t("case2.category.options.arts")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-level">
                    {t("case2.difficultyLevel.label")}
                  </Label>
                  <Select dir={locale === "ar" ? "rtl" : "ltr"}>
                    <SelectTrigger id="course-level">
                      <SelectValue
                        placeholder={t("case2.difficultyLevel.placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        {t("case2.difficultyLevel.options.beginner")}
                      </SelectItem>
                      <SelectItem value="intermediate">
                        {t("case2.difficultyLevel.options.intermediate")}
                      </SelectItem>
                      <SelectItem value="advanced">
                        {t("case2.difficultyLevel.options.advanced")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-description">
                  {t("case2.courseDescription")}
                </Label>
                <Textarea
                  id="course-description"
                  placeholder={t("case2.courseDescriptionPlaceholder")}
                  className="min-h-[100px]"
                />
              </div>

              <Tabs
                defaultValue="lessons"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="lessons">
                    {t("case2.tabs.lessons.title")}
                  </TabsTrigger>
                  <TabsTrigger value="materials">
                    {t("case2.tabs.materials.title")}
                  </TabsTrigger>
                  <TabsTrigger value="assignments">
                    {t("case2.tabs.assignments.title")}
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="lessons"
                  className="mt-2 rounded-md border p-4"
                >
                  <div className="space-y-2">
                    <Label>{t("case2.tabs.lessons.label")}</Label>
                    <Input placeholder={t("case2.tabs.lessons.placeholder")} />
                    <div className="mt-2 flex justify-end">
                      <Button variant="outline" size="sm">
                        {t("case2.tabs.lessons.addLesson")}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="materials"
                  className="mt-2 rounded-md border p-4"
                >
                  <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">
                        {t("case2.tabs.materials.dragAndDropFiles")}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        {t("case2.tabs.materials.browseFiles")}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="assignments"
                  className="mt-2 rounded-md border p-4"
                >
                  <div className="space-y-2">
                    <Label>{t("case2.tabs.assignments.label")}</Label>
                    <Input
                      placeholder={t("case2.tabs.assignments.placeholder")}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button variant="outline" size="sm">
                        {t("case2.tabs.assignments.addAssignment")}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">
                {t("case3.inviteStudents")}
              </h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="text-primary text-4xl font-bold">ABC123</div>
                  <p className="text-muted-foreground">
                    {t("case3.shareLink")}
                  </p>
                  <Button variant="outline" size="sm">
                    {t("case3.copyCode")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2 pt-4">
              <Label htmlFor="invite-emails">{t("case3.inviteLink")}</Label>
              <Textarea
                id="invite-emails"
                placeholder={t("case3.inviteLinkPlaceholder")}
                className="min-h-[100px]"
              />
              <div className="mt-2 flex justify-end">
                <Button variant="outline">{t("case3.sendInvites")}</Button>
              </div>
            </div>

            <div className="pt-4">
              <Label>{t("case3.orShareLink")}</Label>
              <div className="mt-2 flex gap-2">
                <Input value="https://studyflow.com/join/ABC123" readOnly />
                <Button variant="outline" className="whitespace-nowrap">
                  {t("case3.copyLink")}
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <LayoutDashboard className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case4.dashboardTour")}</h2>
            </div>

            <div className="bg-background relative rounded-lg border p-4">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Teacher Dashboard Preview"
                className="w-full rounded-md border"
              />

              <div className="absolute top-1/4 left-1/5 flex items-center">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  1
                </div>
                <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
                  {t("case4.manageCourses")}
                </div>
              </div>

              <div className="absolute top-1/2 right-1/4 flex items-center">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  2
                </div>
                <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
                  {t("case4.trackStudentProgress")}
                </div>
              </div>

              <div className="absolute bottom-1/4 left-1/3 flex items-center">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  3
                </div>
                <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
                  {t("case4.createAndGradeAssignments")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{t("case4.courseManagement")}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {t("case4.courseManagementDescription")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">
                    {t("case4.studentProgressTracking")}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {t("case4.studentProgressTrackingDescription")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">
                    {t("case4.communicationTools")}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {t("case4.communicationToolsDescription")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background rounded-lg border p-6 shadow-sm">
      {renderStep()}
    </div>
  );
}
