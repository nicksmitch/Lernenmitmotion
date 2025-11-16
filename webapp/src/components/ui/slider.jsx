import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
  const handleChange = (e) => {
    onValueChange?.([parseInt(e.target.value)])
  }
  
  return (
    <input
      type="range"
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={cn("w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary", className)}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }
