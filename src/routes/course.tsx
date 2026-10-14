import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons } from "@/data/course";
import { Shell, Kicker } from "@/components/shell";
import { useI18n } from "@/lib/i18n";
import { usePassHydrated, usePassStatus } from "@/lib/pass";
import { useHydrated, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/course")({ component: Course });

function Course() {
  const { t } = useI18n();
  const hydrated = useHydrated();
  const passReady = usePassHydrated();
  const status = usePassStatus();
  const done = useProgress((s) => s.done);

  return (
    <Shell>
      <Kicker>{t("course.kicker")}</Kicker>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight font-medium text-fg md:text-5xl">
        {t("course.title")}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("course.lede")}</p>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {lessons.map((lesson) => {
          const complete = hydrated && done.includes(lesson.id);
          const gated = passReady && !status.open && lesson.id !== "claim";
          return (
            <li key={lesson.id}>
              <Link to="/course/$id" params={{ id: lesson.id }} className="grid gap-2 py-5 md:grid-cols-12 md:gap-6">
                <span className="font-serif text-lg text-copper md:col-span-1">{lesson.numeral}</span>
                <span className="md:col-span-4">
                  <span className="block text-lg text-fg">{lesson.title}</span>
                  <span className="mt-1 block text-sm text-faint">
                    {lesson.minutes}
                    {complete ? t("course.listened") : t("course.lectureAndFilm")}
                    {gated ? t("course.inThePass") : ""}
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
