import { createFileRoute, Link } from "@tanstack/react-router";
import { glossary, people, saicRows, sources, studies, timeline } from "@/data/archive";
import { Shell, Kicker } from "@/components/shell";

export const Route = createFileRoute("/archive")({ component: ArchivePage });

function ArchivePage() {
  return (
    <Shell>
      <Kicker>The record</Kicker>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight font-medium text-fg md:text-5xl">
        What was claimed, and what the evaluation refused.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Remote viewing, here, means the SRI and military program that ended in 1995, plus the method that program
        trained. The primary papers disagree with each other. This page keeps the disagreement.
      </p>

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
        <h2 className="font-serif text-3xl text-fg">Timeline</h2>
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
        <h2 className="font-serif text-3xl text-fg">The studies that matter</h2>
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
        <h2 className="font-serif text-3xl text-fg">The SAIC remote-viewing set</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          As listed by Jessica Utts from figures Edwin May supplied to the review team in a memorandum of 25 July
          1995. Effect size near zero is chance. These six are the remote-viewing experiments in that list of ten.
          The spread is the point: a small effect does not win every study.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-faint">
                <th className="py-2 pr-4 font-medium">Study</th>
                <th className="py-2 pr-4 font-medium">Trials</th>
                <th className="py-2 pr-4 font-medium">Effect</th>
                <th className="py-2 font-medium">p</th>
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
          Five-choice effect size, from Utts: (3 − average rank) / √2. Small 0.2 is an average rank near 2.72.
          Medium 0.5 is near 2.29. Chance is 3.
        </p>
      </section>

      <section className="mt-14" id="people">
        <h2 className="font-serif text-3xl text-fg">People</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Roles, not halos. Commercial teachers after 1995 are a separate literature from the evaluation.
        </p>
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
        <h2 className="font-serif text-3xl text-fg">Glossary</h2>
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
        <h2 className="font-serif text-3xl text-fg">Read the paper, not the retelling</h2>
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
          The method was claimed as proprietary to Swann. It was not granted as a patent. Puthoff’s patents are
          about communications, not viewing.{" "}
          <Link to="/faq" hash="patent" className="text-copper">
            The FAQ keeps the numbers.
          </Link>
        </p>
      </section>
    </Shell>
  );
}
