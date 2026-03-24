import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "muted";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          "rounded-[2rem] shadow-[0_4px_10px_rgba(0,0,0,0.05)] active:scale-[0.98]", // default styling matching mockups
          {
            "bg-secondary text-white hover:bg-secondary-dark font-cursive text-2xl": variant === "primary",
            "bg-primary text-text-dark hover:bg-primary-dark": variant === "secondary",
            "bg-white text-text-dark hover:bg-gray-50 border border-gray-100": variant === "muted",
            "border-2 border-primary text-text-dark hover:bg-primary/10": variant === "outline",
            "hover:bg-gray-100/50 text-text-dark shadow-none": variant === "ghost",
            "h-10 px-5 text-sm": size === "sm",
            "h-12 px-8 text-lg": size === "md",
            "h-14 px-10 text-xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
