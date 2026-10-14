import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons } from "@/data/course";
import { Exclusions } from "@/components/exclusions";
import { Shell, Kicker } from "@/components/shell";
import { useI18n } from "@/lib/i18n";
import { usePassHydrated, usePassStatus } from "@/lib/pass";
import { useHydrated, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t } = useI18n();
  const hydrated = useHydrated();
  const passReady = usePassHydrated();
  const status = usePassStatus();
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
            alt={t("home.heroAlt")}
            className="aspect-video w-full rounded-md object-cover"
          />
          <figcaption className="mt-2 text-sm text-faint">{t("home.heroCaption")}</figcaption>
        </figure>
        <div className="md:col-span-7">
          <Kicker index={t("home.kickerIndex")}>{t("home.kicker")}</Kicker>
          <h1 className="mt-3 font-serif text-4xl leading-tight font-medium text-balance text-fg md:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{t("home.lede")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/course/$id"
              params={{ id: next.id }}
              className="inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink"
            >
              {heard === 0
                ? t("home.start")
                : heard === lessons.length
                  ? t("home.replay")
                  : t("home.continue", { numeral: next.numeral })}
            </Link>
            <Link
              to="/lab"
              className="inline-flex min-h-12 items-center border border-line px-5 text-sm text-fg"
            >
              {t("home.practice")}
            </Link>
          </div>
          <p className="mt-4 text-sm text-faint">
            {hydrated
              ? t("home.lecturesMarked", { heard, total: lessons.length })
              : t("home.lectureCount", { total: lessons.length })}
            {hydrated && sessions.length > 0
              ? ` · ${t("home.scoredSessions", { count: sessions.length })}`
              : ""}
            {" · "}
            {t("home.audioLength")}
          </p>
        </div>
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl text-fg">{t("home.courseHeading")}</h2>
          <Link to="/course" className="text-sm text-copper">
            {t("home.allLectures")}
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
                      {complete ? t("home.listenedSuffix") : ""}
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
          <p className="text-xs font-medium uppercase tracking-widest text-copper">{t("home.recordKicker")}</p>
          <h3 className="mt-2 font-serif text-2xl text-fg">{t("home.recordTitle")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t("home.recordBody")}</p>
        </Link>
        <Link to="/method" className="block border-t border-line pt-4">
          <p className="text-xs font-medium uppercase tracking-widest text-copper">{t("home.methodKicker")}</p>
          <h3 className="mt-2 font-serif text-2xl text-fg">{t("home.methodTitle")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t("home.methodBody")}</p>
        </Link>
      </section>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
        {passReady && status.phase === "trial"
          ? t(status.daysLeft === 1 ? "home.trialOne" : "home.trialOther", { count: status.daysLeft })
          : passReady && status.open
            ? t("home.passOpen")
            : t("home.passDefault")}{" "}
        <Link to="/pass" className="text-copper">
          {t("home.thePass")}
        </Link>
        {" · "}
        <Link to="/faq" className="text-copper">
          {t("home.sourcesPatents")}
        </Link>
      </p>

      <Exclusions />
    </Shell>
  );
}
