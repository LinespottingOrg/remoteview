import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons } from "@/data/course";
import { Shell, Kicker } from "@/components/shell";
import { useHydrated, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrated = useHydrated();
  const done = useProgress((s) => s.done);
  const sessions = useProgress((s) => s.sessions);
  const next = lessons.find((lesson) => !done.includes(lesson.id)) ?? lessons[0]!;
  const heard = hydrated ? lessons.filter((lesson) => done.includes(lesson.id)).length : 0;

  return (
    <Shell>
      <div className="grid items-start gap-8 md:grid-cols-12">
        <figure className="md:col-span-5">
          <img
            src="/media/hero.jpg"
            alt="A cream sheet on a dark desk, one ink ideogram, a copper pen, and a sealed envelope."
            className="aspect-video w-full rounded-md object-cover"
          />
          <figcaption className="mt-2 text-sm text-faint">The page before the name.</figcaption>
        </figure>
        <div className="md:col-span-7">
          <Kicker index="Academy">Remote viewing, taught against its own record</Kicker>
          <h1 className="mt-3 font-serif text-4xl leading-tight font-medium text-balance text-fg md:text-6xl">
            Learn the method. Read both verdicts.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Eight spoken lectures and a short film with each one. The six stages from the declassified training
            notes. A blind practice lab that scores a miss as carefully as a hit. Built from the SRI work, the Fort
            Meade program, and the 1995 evaluation — including the parts that say it was not useful.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/course/$id"
              params={{ id: next.id }}
              className="inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink"
            >
              {heard === 0 ? "Start the first lecture" : heard === lessons.length ? "Replay the course" : `Continue · ${next.numeral}`}
            </Link>
            <Link
              to="/lab"
              className="inline-flex min-h-12 items-center border border-line px-5 text-sm text-fg"
            >
              Practice blind
            </Link>
          </div>
          <p className="mt-4 text-sm text-faint">
            {hydrated ? `${heard} of ${lessons.length} lectures marked` : `${lessons.length} lectures`}
            {hydrated && sessions.length > 0 ? ` · ${sessions.length} scored sessions` : ""}
            {" · "}about 20 minutes of audio
          </p>
        </div>
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl text-fg">The course</h2>
          <Link to="/course" className="text-sm text-copper">
            All lectures
          </Link>
        </div>
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {lessons.map((lesson) => {
            const complete = hydrated && done.includes(lesson.id);
            return (
              <li key={lesson.id}>
                <Link
                  to="/course/$id"
                  params={{ id: lesson.id }}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="w-8 font-serif text-lg text-copper">{lesson.numeral}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base text-fg">{lesson.title}</span>
                    <span className="mt-1 block text-sm text-faint">
                      {lesson.minutes}
                      {complete ? " · listened" : ""}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <Link to="/archive" className="block border-t border-line pt-4">
          <p className="text-xs font-medium uppercase tracking-widest text-copper">The record</p>
          <h3 className="mt-2 font-serif text-2xl text-fg">Hold both pages at once</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Utts: established, small to medium. Hyman: a real anomaly, an unnamed cause. AIR: not useful for
            intelligence. Timeline, the SAIC table, people, glossary, sources.
          </p>
        </Link>
        <Link to="/method" className="block border-t border-line pt-4">
          <p className="text-xs font-medium uppercase tracking-widest text-copper">The method</p>
          <h3 className="mt-2 font-serif text-2xl text-fg">Six stages, and a drill for overlay</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Ideogram through model. Then seven lines to sort: write it as data, box it as AOL, or stop the session.
          </p>
        </Link>
      </section>

      <p className="mt-12 max-w-2xl text-sm leading-relaxed text-faint">
        An educational reconstruction of a published method and the public research record. Not medicine, not legal
        evidence, not an invitation to view people. Your authority is the page, the blind, and the score.
      </p>
    </Shell>
  );
}
