import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

function Input({
  className,
  type,
  leftIcon,
  customLeftIcon,
  rightIcon,
  customRightIcon,
  onRightIconClick = () => {},
  ...props
}: React.ComponentProps<"input"> & {
  leftIcon?: IconSvgElement;
  rightIcon?: IconSvgElement;
  customLeftIcon?: React.ComponentProps<"div">["className"];
  customRightIcon?: React.ComponentProps<"div">["className"];
  onRightIconClick?: () => void;
}) {
  return (
    <div className="relative">
      {leftIcon && (
        <label
          htmlFor={props.id}
          className={cn(
            "absolute flex items-center justify-center top-0 left-0 h-12 px-4",
            customLeftIcon,
          )}
        >
          <HugeiconsIcon icon={leftIcon} className="size-5" strokeWidth={2} />
        </label>
      )}

      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          "h-9 w-full min-w-0 rounded-md border border-secondary/30 bg-background px-3 py-1 text-sm transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-secondary/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-within:ring-[3px] aria-invalid:ring-destructive/5 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 aria-invalid:transition-all",
          leftIcon && "pl-13",
          rightIcon && "pr-13",
          className,
        )}
        {...props}
      />

      {rightIcon && (
        <div className="absolute flex items-center justify-center top-0 right-0 h-12 px-4">
          <HugeiconsIcon
            icon={rightIcon}
            className={cn("size-5 cursor-pointer", customRightIcon)}
            strokeWidth={2}
            onClick={onRightIconClick}
          />
        </div>
      )}
    </div>
  );
}

export { Input };
