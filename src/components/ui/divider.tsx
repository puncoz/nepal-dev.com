import { cn } from "@/lib/utils"
import React from "react"

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  text?: string;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", text, ...props }, ref) => {
    if (text) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative flex items-center justify-center my-6",
            className,
          )}
          {...props}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"/>
          </div>
          <div className="relative bg-white px-4 text-sm text-gray-500">
            {text}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          orientation === "horizontal"
            ? "w-full border-t border-gray-300 my-6"
            : "h-full border-l border-gray-300 mx-6",
          className,
        )}
        {...props}
      />
    )
  },
)

Divider.displayName = "Divider"

export { Divider }
export default Divider
