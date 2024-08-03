import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";

interface ProgressProp {
  currentLength: number;
  totalLength: number;
  color?: string;
  bgColor?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & ProgressProp
>(
  (
    // eslint-disable-next-line react/prop-types
    { className, currentLength, totalLength, color, bgColor, ...props },
    ref
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        `relative h-1 w-full overflow-hidden rounded-full ${bgColor || ""}`,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 ${
          color || "bg-dark-brd-pri-100"
        } transition-all`}
        style={{
          transform: `translateX(-${totalLength - (currentLength || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
