import Link from "next/link";
import { Heading, Mono, Text } from "@/components/ui/Typography";

export interface NoteEntry {
  date: string;
  title: string;
  href: string;
}

export function NotesIndexGrid({ entries }: { entries: NoteEntry[] }) {
  if (entries.length === 0) {
    return <Text variant="muted">No notes published yet.</Text>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="group block rounded-lg border border-cyan-900/40 bg-neutral-950/60 p-5 hover:border-cyan-500/60 transition-colors"
        >
          <Mono variant="tag" color="cyan" className="mb-3 inline-block">
            {entry.date}
          </Mono>
          <Heading variant="h3" className="text-xl group-hover:text-cyan-400 transition-colors">
            {entry.title}
          </Heading>
        </Link>
      ))}
    </div>
  );
}
