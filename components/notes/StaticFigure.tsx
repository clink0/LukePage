import { Mono } from "@/components/ui/Typography";

export function StaticFigure({
  course,
  date,
  id,
  caption,
}: {
  course: string;
  date: string;
  id: string;
  caption?: string;
}) {
  const src = `/notes-media/${course}/${date}/${id}.png`;

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-cyan-900/40 bg-white p-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- static
          generated figure, dimensions unknown ahead of time */}
      <img src={src} alt={caption ?? `figure ${id}`} className="w-full h-auto" />
      {caption && (
        <Mono className="text-cyan-300 text-xl block text-center mt-2">{caption}</Mono>
      )}
    </div>
  );
}
