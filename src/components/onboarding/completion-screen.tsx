import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingRole } from "@/lib/types/user";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CompletionScreen({
  role,
}: {
  role: OnboardingRole | null;
}) {
  const getRoleSpecificContent = () => {
    switch (role) {
      case "student":
        return {
          title: "Ready to Start Learning!",
          description:
            "Your student profile is all set up. You're ready to explore courses and start learning journey.",
          features: [
            "Access your personalized dashboard",
            "Browse and join courses",
            "Track your progress",
            "Connect with teachers and classmates",
          ],
        };
      case "teacher":
        return {
          title: "Ready to Start Teaching!",
          decription:
            "Your teacher profile is all set up. You're ready to create courses and connect with students.",
          features: [
            "Access your teacher dashboard",
            "Create and manage courses",
            "Track student progress",
            "Connect with students and parents",
          ],
        };
      case "parent":
        return {
          title: "Ready to Support Learning!",
          description:
            "Your parent profile is all set up. You're ready to monitor your child's progress and communicate with teachers.",
          features: [
            "Access your parent dashboard",
            "Monitor your child's progress",
            "View upcoming assignments",
            "Communicate with teachers",
          ],
        };
      default:
        return {
          title: "Setup Complete!",
          description:
            "Your account is all set up. You're ready to get started.",
          features: [
            "Access your personalized dashboard",
            "Explore the platform",
            "Connect with others",
            "Start your journey",
          ],
        };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <div className="flex flex-col items-center space-y-8 p-6 text-center">
      <div className="rounded-full bg-green-100 p-4">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground mx-auto max-w-md">
          {content.description}
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
        {content.features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-4">
              <div className="bg-primary/10 mr-3 flex h-8 w-8 items-center justify-center rounded-full">
                <span className="text-primary font-medium">{index + 1}</span>
              </div>
              <span>{feature}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Button size="lg">
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="pt-2">
        <p className="text-muted-foreground text-sm">
          Need help? Check out our{" "}
          <a href="#" className="text-primary hover:underline">
            video tutorials
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline">
            FAQ section
          </a>
        </p>
      </div>
    </div>
  );
}
