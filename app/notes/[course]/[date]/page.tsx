import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import NotesBackground from "@/components/notes/NotesBackground";
import { PlotlyFigure } from "@/components/notes/PlotlyFigure";
import { StaticFigure } from "@/components/notes/StaticFigure";
import { Heading, Mono, Text } from "@/components/ui/Typography";
import { getAllCourses, getFigureJson, getNoteSource, getNotesForCourse } from "@/lib/notes";

export function generateStaticParams() {
  return getAllCourses().flatMap((course) =>
    getNotesForCourse(course).map((note) => ({ course, date: note.date }))
  );
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ course: string; date: string }>;
}) {
  const { course, date } = await params;

  let note;
  try {
    note = getNoteSource(course, date);
  } catch {
    notFound();
  }
  const { frontmatter, content } = note!;

  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-cyan-500/30">
      <NotesBackground />

      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <Text as="span" className="text-xl font-bold tracking-tighter hover:text-cyan-500 transition-colors">
            Luke Bray
          </Text>
        </Link>
        <Link href={`/notes/${course}`}>
          <Mono className="text-neutral-400 hover:text-cyan-500 hover:underline transition-colors">
            // Back to {course.toUpperCase()}
          </Mono>
        </Link>
      </nav>

      <article className="relative z-10 pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <header className="mb-16 border-b border-cyan-900/50 pb-10">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Mono color="cyan" variant="tag">
              {course.toUpperCase()}
            </Mono>
            <span className="text-neutral-500">|</span>
            <Mono className="text-neutral-400 text-xl">{date}</Mono>
          </div>
          <Heading variant="h1" className="mb-4">
            {frontmatter.title}
          </Heading>
        </header>

        <div className="[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-xl [&_p]:text-neutral-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_blockquote]:border-l-2 [&_blockquote]:border-cyan-800 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-400">
          <MDXRemote
            source={content}
            options={{ mdxOptions: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } }}
            components={{
              PlotlyFigure: (props: { id: string; caption?: string }) => (
                <PlotlyFigure {...props} data={getFigureJson(course, date, props.id) as never} />
              ),
              StaticFigure: (props: { id: string; caption?: string }) => (
                <StaticFigure course={course} date={date} {...props} />
              ),
            }}
          />
        </div>
      </article>
    </main>
  );
}
