import React from "react";
import { cn } from "@/lib/utils";

interface PriceProps {
  value: number;
  className?: string;
}

export default function ProductPrice({ value, className }: PriceProps) {
  const stringValue = value.toFixed(2);
  const [intValue, floatValue] = stringValue.split(".");
  // console.log(`intValue:${intValue}, floatValue:${floatValue}`);

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super">{floatValue}</span>
    </p>
  );
}
