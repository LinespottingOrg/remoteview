import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { lessons, type Lesson } from "@/data/course";
import { useHydrated, useProgress } from "@/lib/progress";
import { Kicker } from "@/components/shell";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const hydrated = useHydrated();
  const saved = useProgress((s) => s.quizzes[lesson.id]);
  const done = useProgress((s) => s.done.includes(lesson.id));
  const saveQuiz = useProgress((s) => s.saveQuiz);
  const markDone = useProgress((s) => s.markDone);
  const [picks, setPicks] = useState<number[]>(saved ?? []);
  const [filmOk, setFilmOk] = useState(true);
  const index = lessons.findIndex((item) => item.id === lesson.id);
  const next = lessons[index + 1];
  const paragraphs = lesson.body.split("\n\n");

  useEffect(() => {
    if (saved && saved.length > 0) setPicks(saved);
  }, [saved, lesson.id]);
  const answered = picks.filter((n) => n >= 0).length === lesson.quiz.length && picks.length === lesson.quiz.length;

  function choose(qi: number, ci: number) {
    setPicks((prev) => {
      const nextPicks = prev.length ? [...prev] : lesson.quiz.map(() => -1);
      nextPicks[qi] = ci;
      return nextPicks;
    });
  }

  function commit() {
    if (!answered) return;
    saveQuiz(lesson.id, picks);
    markDone(lesson.id);
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/course" className="text-sm text-muted">
        All lessons
      </Link>
      <header className="mt-4 border-l-2 border-copper pl-4">
        <Kicker index={lesson.numeral}>Lecture · {lesson.minutes}</Kicker>
        <h1 className="mt-2 font-serif text-4xl leading-tight font-medium text-fg md:text-5xl">{lesson.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{lesson.summary}</p>
      </header>

      {filmOk ? (
        <figure className="mt-8">
          <video
            key={lesson.film}
            className="aspect-video w-full rounded-md bg-surface"
            controls
            playsInline
            muted
            preload="metadata"
            src={lesson.film}
            onError={() => setFilmOk(false)}
          />
          <figcaption className="mt-2 text-sm text-faint">
            A ten-second film for this lesson. It starts muted so it does not fight the lecture.
          </figcaption>
        </figure>
      ) : null}

      <section className="sheet mt-8 rounded-lg bg-paper p-5 text-ink md:p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">Lecture</p>
        <audio className="mt-3 w-full" controls preload="metadata" src={lesson.audio}>
          <a href={lesson.audio}>Listen to the lecture</a>
        </audio>
        <div className="mt-6 space-y-4">
          {paragraphs.map((paragraph) => {
            const record = paragraph.startsWith("Record.");
            const guide = paragraph.startsWith("Guide.");
            const speaker = record || guide;
            return (
              <p
                key={paragraph.slice(0, 48)}
                className={
                  "font-serif text-lg leading-relaxed " + (speaker ? "text-ink" : "text-ink")
                }
              >
                {speaker ? (
                  <span className="mr-2 font-sans text-xs font-medium uppercase tracking-widest text-copper-dim">
                    {record ? "Record" : "Guide"}
                  </span>
                ) : null}
                {speaker ? paragraph.slice(paragraph.indexOf(".") + 1).trim() : paragraph}
              </p>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-fg">Keep these</h2>
        <ul className="mt-3 space-y-2">
          {lesson.points.map((point) => (
            <li key={point} className="border-l border-line pl-3 text-sm leading-relaxed text-muted">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-fg">Check yourself</h2>
        <p className="mt-2 text-sm text-muted">Two questions. Wrong answers stay visible, with the reason.</p>
        <ol className="mt-5 space-y-6">
          {lesson.quiz.map((q, qi) => {
            const pick = picks[qi];
            const show = pick !== undefined && pick >= 0;
            return (
              <li key={q.prompt}>
                <p className="text-base text-fg">{q.prompt}</p>
                <div className="mt-3 grid gap-2">
                  {q.choices.map((choice, ci) => {
                    const selected = pick === ci;
                    const correct = show && ci === q.answer;
                    const wrong = show && selected && ci !== q.answer;
                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => choose(qi, ci)}
                        className={
                          "min-h-12 rounded-md border px-3 py-2 text-left text-sm " +
                          (correct
                            ? "border-sage bg-surface text-fg"
                            : wrong
                              ? "border-rose bg-surface text-fg"
                              : selected
                                ? "border-copper bg-surface-2 text-fg"
                                : "border-line text-muted")
                        }
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
                {show ? <p className="mt-2 text-sm leading-relaxed text-muted">{q.why}</p> : null}
              </li>
            );
          })}
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!answered}
            onClick={commit}
            className="inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink disabled:opacity-40"
          >
            {hydrated && done ? "Saved" : "Mark listened"}
          </button>
          {next ? (
            <Link to="/course/$id" params={{ id: next.id }} className="inline-flex min-h-12 items-center text-sm text-copper">
              Next · {next.title}
            </Link>
          ) : (
            <Link to="/lab" className="inline-flex min-h-12 items-center text-sm text-copper">
              Open the practice lab
            </Link>
          )}
        </div>
      </section>
    </article>
  );
}
