"use client";

import dynamic from "next/dynamic";
import { Mono } from "@/components/ui/Typography";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PlotlySpec {
  data: unknown[];
  layout?: Record<string, unknown>;
}

export function PlotlyFigure({
  id,
  data,
  caption,
}: {
  id: string;
  data: PlotlySpec | null;
  caption?: string;
}) {
  if (!data) {
    return (
      <Mono color="red" variant="tag">
        missing figure data: {id}
      </Mono>
    );
  }

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-cyan-900/40 bg-neutral-950/60 p-2">
      {/* @ts-expect-error -- react-plotly.js's PlotParams.data is typed as
          plotly.js's Data[]; the JSON we load from disk is untyped at this
          boundary (it was produced by Python's plotly.io.to_json). */}
      <Plot
        data={data.data}
        layout={{
          ...data.layout,
          autosize: true,
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "#a3a3a3" },
        }}
        useResizeHandler
        style={{ width: "100%", height: "480px" }}
        config={{ displaylogo: false, responsive: true }}
      />
      {caption && (
        <Mono className="text-cyan-300 text-xl block text-center mt-2">{caption}</Mono>
      )}
    </div>
  );
}
