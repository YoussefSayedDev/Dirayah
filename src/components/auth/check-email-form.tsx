"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
import { useState } from "react";

export function CheckEmailForm() {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Localization
  const t = useTranslations("auth.checkEmail.form");
  // const locale = useLocale();
  // const router = useRouter();

  const handleResend = async () => {
    setIsResending(true);

    try {
      // Simulate API call to resend email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setResendSuccess(true);
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {/* Open Gmail Button */}
      <Button
        variant="default"
        className="w-full"
        onClick={() => window.open("https://mail.google.com", "_blank")}
      >
        {t("openGmail")}
      </Button>

      {/* Didn't receive the email */}
      <div className="text-center">
        <Button
          variant="link"
          className="text-sm"
          onClick={handleResend}
          disabled={isResending || resendSuccess}
        >
          {isResending ? (
            t("sending")
          ) : resendSuccess ? (
            t("emailSent")
          ) : (
            <p>
              <span className="text-muted-foreground">
                {t("didNotReceive")}
              </span>
              <span className="font-bold"> {t("resend")}</span>
            </p>
          )}
        </Button>

        {resendSuccess && (
          <p className="mt-2 text-sm text-green-600">
            A new verification email has been sent to your inbox.
          </p>
        )}
      </div>
    </div>
  );
}
