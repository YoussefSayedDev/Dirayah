import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { JSX } from "react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function RoleCard({
  title,
  description,
  icon,
  onClick,
  isLoading = false,
  disabled = false,
}: RoleCardProps) {
  const t = useTranslations("Onboarding.role");

  return (
    <Card
      className={`flex cursor-pointer flex-col items-center border-2 p-6 text-center transition-shadow hover:shadow-md ${isLoading ? "opacity-70" : ""} ${disabled ? "cursor-not-allowed" : "hover:border-primary"}`}
      onClick={isLoading ? undefined : disabled ? undefined : onClick}
    >
      <div className="bg-background mb-4 rounded-full p-4">
        {isLoading ? (
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        ) : (
          icon
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      {isLoading && (
        <p className="mt-2 text-sm text-blue-500">
          {t("loading") || "Loading..."}
        </p>
      )}
    </Card>
  );
}
