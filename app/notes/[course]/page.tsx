import Link from "next/link";
import { notFound } from "next/navigation";
import NotesBackground from "@/components/notes/NotesBackground";
import { NotesIndexGrid, type NoteEntry } from "@/components/notes/NotesIndexGrid";
import { Heading, Mono, Text } from "@/components/ui/Typography";
import { getAllCourses, getNotesForCourse } from "@/lib/notes";

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ course }));
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const notes = getNotesForCourse(course);
  if (notes.length === 0) notFound();

  const entries: NoteEntry[] = notes.map((note) => ({
    date: note.date,
    title: note.frontmatter.title,
    href: `/notes/${course}/${note.date}`,
  }));

  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-cyan-500/30">
      <NotesBackground />

      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-cyan-500 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/notes">
          <Mono className="text-neutral-400 hover:text-cyan-500 hover:underline transition-colors">
            // All Notes
          </Mono>
        </Link>
      </nav>

      <article className="relative z-10 pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <header className="mb-16">
          <Mono color="cyan" className="mb-4 block">
            // {course.toUpperCase()}
          </Mono>
          <Heading variant="h1">{course.toUpperCase()}</Heading>
        </header>

        <NotesIndexGrid entries={entries} />
      </article>
    </main>
  );
}
