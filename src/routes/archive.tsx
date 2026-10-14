import { createFileRoute, Link } from "@tanstack/react-router";
import { glossary, people, saicRows, sources, studies, timeline } from "@/data/archive";
import { Shell, Kicker } from "@/components/shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/archive")({ component: ArchivePage });

function ArchivePage() {
  const { t } = useI18n();
  return (
    <Shell>
      <Kicker>{t("archive.kicker")}</Kicker>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight font-medium text-fg md:text-5xl">
        {t("archive.title")}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("archive.lede")}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <blockquote className="border-t border-copper pt-4">
          <p className="font-serif text-lg leading-relaxed text-fg">
            “Psychic functioning has been well established.”
          </p>
          <footer className="mt-3 text-sm text-faint">Jessica Utts, 1995, on the SRI and SAIC studies.</footer>
        </blockquote>
        <blockquote className="border-t border-line pt-4">
          <p className="font-serif text-lg leading-relaxed text-fg">
            “A statistical anomaly is not the same thing as a demonstrated paranormal ability.”
          </p>
          <footer className="mt-3 text-sm text-faint">Ray Hyman, same review.</footer>
        </blockquote>
        <blockquote className="border-t border-line pt-4">
          <p className="font-serif text-lg leading-relaxed text-fg">
            Remote viewing failed, in the material reviewed, to produce actionable intelligence.
          </p>
          <footer className="mt-3 text-sm text-faint">
            AIR operational conclusion, Mumford, Rose & Goslin, 29 September 1995.
          </footer>
        </blockquote>
      </div>

      <section className="mt-14" id="timeline">
        <h2 className="font-serif text-3xl text-fg">{t("archive.timeline")}</h2>
        <ol className="mt-6 space-y-6">
          {timeline.map((item) => (
            <li key={item.year} className="grid gap-2 border-t border-line pt-4 md:grid-cols-12">
              <p className="font-serif text-lg text-copper md:col-span-3">{item.year}</p>
              <div className="md:col-span-9">
                <h3 className="text-base text-fg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14" id="studies">
        <h2 className="font-serif text-3xl text-fg">{t("archive.studies")}</h2>
        <div className="mt-6 space-y-8">
          {studies.map((study) => (
            <article key={study.title} className="border-t border-line pt-4">
              <p className="text-xs font-medium uppercase tracking-widest text-faint">{study.year}</p>
              <h3 className="mt-1 font-serif text-2xl text-fg">{study.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{study.claim}</p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fg">{study.limit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14" id="saic">
        <h2 className="font-serif text-3xl text-fg">{t("archive.saic")}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t("archive.saicNote")}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-faint">
                <th className="py-2 pr-4 font-medium">{t("archive.study")}</th>
                <th className="py-2 pr-4 font-medium">{t("archive.trials")}</th>
                <th className="py-2 pr-4 font-medium">{t("archive.effect")}</th>
                <th className="py-2 font-medium">{t("archive.p")}</th>
              </tr>
            </thead>
            <tbody>
              {saicRows.map((row) => (
                <tr key={row.name} className="border-b border-line">
                  <td className="py-3 pr-4 text-fg">{row.name}</td>
                  <td className="py-3 pr-4 text-muted">{row.trials}</td>
                  <td className="py-3 pr-4 text-muted">{row.effect}</td>
                  <td className="py-3 text-muted">{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-faint">
          {t("archive.effectNote")}
        </p>
      </section>

      <section className="mt-14" id="people">
        <h2 className="font-serif text-3xl text-fg">{t("archive.people")}</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">{t("archive.peopleNote")}</p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {people.map((person) => (
            <li key={person.name} className="grid gap-1 py-4 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-4">
                <p className="text-base text-fg">{person.name}</p>
                <p className="text-sm text-copper">{person.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted md:col-span-8">{person.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" id="glossary">
        <h2 className="font-serif text-3xl text-fg">{t("archive.glossary")}</h2>
        <dl className="mt-6 space-y-5">
          {glossary.map((item) => (
            <div key={item.term} className="border-t border-line pt-4">
              <dt className="text-base text-fg">{item.term}</dt>
              <dd className="mt-1 max-w-3xl text-sm leading-relaxed text-muted">{item.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14" id="sources">
        <h2 className="font-serif text-3xl text-fg">{t("archive.sourcesTitle")}</h2>
        <ul className="mt-6 space-y-4">
          {sources.map((source) => (
            <li key={source.title} className="border-t border-line pt-4">
              {source.href ? (
                <a href={source.href} className="text-base text-copper" target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              ) : (
                <p className="text-base text-fg">{source.title}</p>
              )}
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted">{source.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          {t("archive.sourcesNote")}{" "}
          <Link to="/faq" hash="patent" className="text-copper">
            {t("archive.faqLink")}
          </Link>
        </p>
      </section>
    </Shell>
  );
}
