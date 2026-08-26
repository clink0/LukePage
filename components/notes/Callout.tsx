import type { ReactNode } from "react";
import { Mono, Text } from "@/components/ui/Typography";

type CalloutKind = "derivation" | "analogy";
type Confidence = "high" | "medium" | "low";

const CONFIDENCE_STYLE: Record<
  Confidence,
  { border: string; bg: string; label: string; monoColor: "green" | "amber" | "red" }
> = {
  high: {
    border: "border-green-900/50",
    bg: "bg-green-900/10",
    label: "HIGH CONFIDENCE",
    monoColor: "green",
  },
  medium: {
    border: "border-amber-900/50",
    bg: "bg-amber-900/10",
    label: "MEDIUM CONFIDENCE",
    monoColor: "amber",
  },
  low: {
    border: "border-red-900/60",
    bg: "bg-red-900/15",
    label: "LOW CONFIDENCE -- VERIFY",
    monoColor: "red",
  },
};

export function Callout({
  kind,
  confidence,
  children,
}: {
  kind: CalloutKind;
  confidence: Confidence;
  children: ReactNode;
}) {
  const style = CONFIDENCE_STYLE[confidence] ?? CONFIDENCE_STYLE.medium;

  return (
    <div className={`my-6 rounded-lg border-2 p-5 ${style.border} ${style.bg}`}>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <Mono variant="tag" color={style.monoColor}>
          {kind === "derivation" ? "EXPANDED DERIVATION" : "ANALOGY"}
        </Mono>
        <Mono variant="tag" color={style.monoColor}>
          {style.label}
        </Mono>
      </div>
      <Text as="div">{children}</Text>
    </div>
  );
}
