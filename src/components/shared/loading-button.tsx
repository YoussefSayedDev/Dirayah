import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading: boolean;
}

export const LoadingButton = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {props.children}
    </Button>
  );
};
