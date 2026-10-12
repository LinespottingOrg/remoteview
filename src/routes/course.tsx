import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons } from "@/data/course";
import { Shell, Kicker } from "@/components/shell";
import { useHydrated, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/course")({ component: Course });

function Course() {
  const hydrated = useHydrated();
  const done = useProgress((s) => s.done);

  return (
    <Shell>
      <Kicker>Lectures</Kicker>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight font-medium text-fg md:text-5xl">
        Sound first. A short film beside each one.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        About twenty minutes, spoken. The films are ten seconds and start muted. Read along on the page, then
        answer two questions. Marking a lecture only means you heard it — the questions show their reasons either way.
      </p>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {lessons.map((lesson) => {
          const complete = hydrated && done.includes(lesson.id);
          return (
            <li key={lesson.id}>
              <Link to="/course/$id" params={{ id: lesson.id }} className="grid gap-2 py-5 md:grid-cols-12 md:gap-6">
                <span className="font-serif text-lg text-copper md:col-span-1">{lesson.numeral}</span>
                <span className="md:col-span-4">
                  <span className="block text-lg text-fg">{lesson.title}</span>
                  <span className="mt-1 block text-sm text-faint">
                    {lesson.minutes}
                    {complete ? " · listened" : " · lecture and film"}
                  </span>
                </span>
                <span className="text-sm leading-relaxed text-muted md:col-span-7">{lesson.summary}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}
