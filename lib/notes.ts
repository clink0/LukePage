import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content", "notes");

export interface NoteFrontmatter {
  slug: string;
  date: string;
  title: string;
  source_notes_path: string;
  source_notes_hash: string;
  enriched_at: string;
  model: string;
  prompt_version: string;
  figures: { id: string; kind: "plotly" | "matplotlib" }[];
  open_question_count: number;
}

export interface Note {
  course: string; // lowercased course dir name, e.g. "emag"
  date: string;
  frontmatter: NoteFrontmatter;
  content: string;
}

export function getAllCourses(): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];
  return fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function getNotesForCourse(course: string): Note[] {
  const courseDir = path.join(CONTENT_ROOT, course);
  if (!fs.existsSync(courseDir)) return [];

  return fs
    .readdirSync(courseDir)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const date = name.replace(/\.mdx$/, "");
      return getNoteSource(course, date);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // most recent first
}

export function getNoteSource(course: string, date: string): Note {
  const mdxPath = path.join(CONTENT_ROOT, course, `${date}.mdx`);
  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { data, content } = matter(raw);

  return {
    course,
    date,
    frontmatter: data as NoteFrontmatter,
    content,
  };
}

export function getFigureJson(course: string, date: string, id: string): unknown {
  const figurePath = path.join(CONTENT_ROOT, course, date, "figures", `${id}.json`);
  return JSON.parse(fs.readFileSync(figurePath, "utf-8"));
}
