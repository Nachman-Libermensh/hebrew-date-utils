import * as React from "react";
import { cn } from "../../lib/cn.js";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClass: Record<ButtonVariant, string> = {
  solid: "hdp-btn hdp-btn-solid",
  outline: "hdp-btn hdp-btn-outline",
  ghost: "hdp-btn hdp-btn-ghost",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "hdp-btn-sm",
  md: "hdp-btn-md",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "solid", size = "md", type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(variantClass[variant], sizeClass[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
