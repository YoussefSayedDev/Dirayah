"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("");
  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Mail className="text-primary h-12 w-12" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Verify Email
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            We&apos;ve sent you a verification email. Please check your inbox
            and click the link to verify your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="w-full space-y-2">
              <div className="mx-auto w-fit">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => setVerificationCode(value)}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup dir="ltr">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="mt-2 text-center text-sm">
                  {verificationCode === "" ? (
                    <p>Enter your verification code</p>
                  ) : (
                    <>
                      <p>You entered</p>
                      <span className="font-bold">{verificationCode}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="flex w-full items-center gap-2">
            Verify Email
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
