import Link from "next/link";
import NotesBackground from "@/components/notes/NotesBackground";
import { NotesIndexGrid, type NoteEntry } from "@/components/notes/NotesIndexGrid";
import { Heading, Mono, Text } from "@/components/ui/Typography";
import { getAllCourses, getNotesForCourse } from "@/lib/notes";

export default function NotesIndexPage() {
  const courses = getAllCourses();
  const allEntries: NoteEntry[] = courses.flatMap((course) =>
    getNotesForCourse(course).map((note) => ({
      date: note.date,
      title: note.frontmatter.title,
      href: `/notes/${course}/${note.date}`,
    }))
  );
  allEntries.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-cyan-500/30">
      <NotesBackground />

      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-cyan-500 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href="/projects">
          <Mono className="text-neutral-400 hover:text-cyan-500 hover:underline transition-colors">
            // Return to Archives
          </Mono>
        </Link>
      </nav>

      <article className="relative z-10 pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <header className="mb-16">
          <Mono color="cyan" className="mb-4 block">
            // CLASS NOTES
          </Mono>
          <Heading variant="h1" className="mb-4">
            Notes
          </Heading>
          <Text variant="lead" className="max-w-2xl">
            Transcribed, reviewed, and enriched lecture notes -- published automatically as I write them.
          </Text>
        </header>

        <section className="mb-16">
          <Mono color="cyan" className="block mb-4">
            COURSES
          </Mono>
          <div className="flex gap-4 flex-wrap">
            {courses.map((course) => (
              <Link key={course} href={`/notes/${course}`}>
                <Mono variant="tag" color="cyan">
                  {course.toUpperCase()}
                </Mono>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <Mono color="cyan" className="block mb-4">
            RECENT
          </Mono>
          <NotesIndexGrid entries={allEntries.slice(0, 9)} />
        </section>
      </article>
    </main>
  );
}
