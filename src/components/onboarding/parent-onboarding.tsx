"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, LayoutDashboard, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function ParentOnboarding({ step }: { step: number }) {
  const t = useTranslations("onboarding.parent");
  const locale = useLocale();
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Calendar className="h-6 w-6 text-purple-600" />
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
              <Label htmlFor="relation">{t("case0.relation.label")}</Label>
              <Select dir={locale === "ar" ? "rtl" : "ltr"}>
                <SelectTrigger id="relation">
                  <SelectValue
                    placeholder={t("case0.relation.select.placeholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">
                    {t("case0.relation.select.options.parent")}
                  </SelectItem>
                  <SelectItem value="guardian">
                    {t("case0.relation.select.options.guardian")}
                  </SelectItem>
                  <SelectItem value="grandparent">
                    {t("case0.relation.select.options.grandparent")}
                  </SelectItem>
                  <SelectItem value="other">
                    {t("case0.relation.select.options.other")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("case0.numberOfChildren.label")}</Label>
              <RadioGroup
                dir={locale === "ar" ? "rtl" : "ltr"}
                defaultValue="1"
              >
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3">3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4+" id="r4" />
                    <Label htmlFor="r4">4+</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case1.linkChild")}</h2>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">{t("case1.description")}</p>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="child-username">
                        {t("case1.card.usernameLabel")}
                      </Label>
                      <Input
                        id="child-username"
                        placeholder={t("case1.card.usernamePlaceholder")}
                      />
                    </div>

                    <div className="text-center">
                      <span className="text-muted-foreground text-sm">
                        {t("case1.card.or")}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="child-email">
                        {t("case1.card.emailLabel")}
                      </Label>
                      <Input
                        id="child-email"
                        type="email"
                        placeholder={t("case1.card.emailPlaceholder")}
                      />
                    </div>

                    <Button className="w-full">
                      {t("case1.card.linkAccount")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="pt-4">
                <p className="text-muted-foreground text-sm">
                  {t("case1.donotHaveChild")}
                </p>
                <div className="mt-2 flex gap-2">
                  <Input
                    value="https://learninghub.com/link/PARENT123"
                    readOnly
                  />
                  <Button variant="outline" className="whitespace-nowrap">
                    {t("case1.copyLink")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <LayoutDashboard className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold">{t("case2.dashboardTour")}</h2>
            </div>

            <div className="bg-background relative rounded-lg border p-4">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Parent Dashboard Preview"
                className="w-full rounded-md border"
              />

              <div className="absolute top-1/4 left-1/5 flex items-center">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  1
                </div>
                <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
                  {t("case2.trackChildProgress")}
                </div>
              </div>

              <div className="absolute top-1/2 right-1/4 flex items-center">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  2
                </div>
                <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
                  {t("case2.viewUpcomingAssignments")}
                </div>
              </div>

              <div className="absolute bottom-1/4 left-1/3 flex items-center">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  3
                </div>
                <div className="bg-background ml-2 rounded p-2 text-sm shadow-lg">
                  {t("case2.messageTeachersDirectly")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{t("case2.progressTracking")}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {t("case2.monitorGradesAndCompletion")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">
                    {t("case2.assignmentCalendar")}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {t("case2.assignCalendarDescription")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">
                    {t("case2.teacherCommunication")}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {t("case2.teacherCommunicationDescription")}
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
    <div className="bg-background rounded-lg border p-4 shadow-sm">
      {renderStep()}
    </div>
  );
}

function Button({
  children,
  variant = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} px-4 py-2`}
      {...props}
    >
      {children}
    </button>
  );
}
