import * as React from "react";
import { cn } from "../../lib/cn.js";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("hdp-card", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("hdp-card-content", className)} {...props} />;
}
