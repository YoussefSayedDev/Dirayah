"use client";
import { cn } from "@/lib/utils";
import { Languages, Locale } from "@/types/localization";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { Input } from "../ui/input";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  dir?: "ltr" | "rtl";
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const locale = useLocale() as Locale;

    const isRTL = locale === Languages.Arabic;

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pe-16", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 cursor-pointer px-2 py-1 focus:outline-none",
            isRTL ? "left-2" : "right-2",
          )}
          onClick={() => setShowPassword((s) => !s)}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
