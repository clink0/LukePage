import { cn } from "@/lib/utils";
import React from "react";

// --- HEADINGS ---
type HeadingProps = {
  variant?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
};

export function Heading({ variant = "h1", className, children }: HeadingProps) {
  const styles = {
    h1: "text-5xl md:text-7xl font-bold tracking-tighter text-white",
    h2: "text-3xl md:text-5xl font-bold tracking-tight text-white",
    h3: "text-2xl font-bold text-white",
    h4: "text-xl font-bold text-white uppercase tracking-widest",
  };

  // Maps variant directly to HTML tag
  const Component = variant;

  return (
    <Component className={cn(styles[variant], className)}>
      {children}
    </Component>
  );
}

// --- BODY TEXT ---
type TextProps = {
  variant?: "default" | "muted" | "small" | "lead";
  className?: string;
  children: React.ReactNode;
  // FIX: Changed 'React.ElementType' to 'any' to resolve the children/className conflict
  as?: any; 
};

export function Text({ variant = "default", className, children, as: Component = "p" }: TextProps) {
  const styles = {
    default: "text-base text-neutral-300 leading-relaxed",
    lead: "text-xl md:text-2xl text-neutral-400 font-light leading-relaxed",
    muted: "text-sm text-neutral-500",
    small: "text-xs text-neutral-500",
  };

  return (
    <Component className={cn(styles[variant], className)}>
      {children}
    </Component>
  );
}

// --- MONOSPACE / TERMINAL TEXT ---
type MonoProps = {
  variant?: "default" | "code" | "tag";
  color?: "green" | "amber" | "cyan" | "red" | "neutral";
  className?: string;
  children: React.ReactNode;
};

export function Mono({ variant = "default", color = "neutral", className, children }: MonoProps) {
  const colors = {
    neutral: "text-neutral-400 border-neutral-800 bg-neutral-900/50",
    green: "text-green-500 border-green-900/50 bg-green-900/20",
    amber: "text-amber-500 border-amber-900/50 bg-amber-900/20",
    cyan: "text-cyan-500 border-cyan-900/50 bg-cyan-900/20",
    red: "text-red-500 border-red-900/50 bg-red-900/20",
  };

  // Grab the text color part for standard text (e.g., "text-green-500")
  const textColor = colors[color].split(" ")[0]; 

  const styles = {
    default: cn("font-mono text-sm tracking-widest uppercase", textColor),
    code: cn("font-mono text-sm bg-black/50 p-1 rounded border border-neutral-800", textColor),
    tag: cn("font-mono text-xs px-2 py-1 rounded border", colors[color]),
  };

  return (
    <span className={cn(styles[variant], className)}>
      {children}
    </span>
  );
}