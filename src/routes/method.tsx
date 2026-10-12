import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { drills, stages, vocab } from "@/data/method";
import { Shell, Kicker } from "@/components/shell";

export const Route = createFileRoute("/method")({ component: MethodPage });

const ACTIONS = [
  { id: "data", label: "Write as data" },
  { id: "aol", label: "Box as AOL" },
  { id: "stop", label: "Stop the session" },
] as const;

function MethodPage() {
  const [open, setOpen] = useState("I");
  const [picks, setPicks] = useState<Record<string, string>>({});
  const stage = stages.find((item) => item.id === open) ?? stages[0]!;
  const solved = drills.filter((drill) => picks[drill.id] === drill.action).length;

  return (
    <Shell>
      <Kicker>Method</Kicker>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight font-medium text-fg md:text-5xl">
        Six stages. Low information first.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        The declassified stage chart runs from a major gestalt to a three-dimensional model. The working rule
        between them is the same: objectify, and do not let a noun drive.
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {stages.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(item.id)}
            className={
              "min-h-12 shrink-0 rounded-md border px-4 text-sm " +
              (item.id === open ? "border-copper bg-surface text-fg" : "border-line text-muted")
            }
          >
            Stage {item.id}
          </button>
        ))}
      </div>

      <article className="mt-4 border-t border-line pt-5">
        <p className="text-xs font-medium uppercase tracking-widest text-copper">Stage {stage.id}</p>
        <h2 className="mt-2 font-serif text-3xl text-fg">{stage.name}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{stage.aim}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-fg">Write</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stage.write}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-fg">Do not write</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stage.avoid}</p>
          </div>
        </div>
        <p className="mt-6 border-l-2 border-copper pl-4 font-serif text-lg leading-relaxed text-fg">{stage.example}</p>
      </article>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-fg">The only legal nouns at stage I</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {vocab.map((word) => (
            <li key={word} className="rounded-sm border border-line px-3 py-2 text-sm text-fg">
              {word}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-faint">Anything more specific is analytical overlay until feedback says otherwise.</p>
      </section>

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl text-fg">Sort the line</h2>
          <p className="text-sm text-faint">
            {solved} of {drills.length}
          </p>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Seven things a viewer might write. Decide before you read the reason.
        </p>
        <ol className="mt-6 space-y-6">
          {drills.map((drill, index) => {
            const pick = picks[drill.id];
            const show = Boolean(pick);
            return (
              <li key={drill.id} className="border-t border-line pt-4">
                <p className="font-serif text-xl text-fg">
                  <span className="mr-3 text-sm text-faint">{index + 1}</span>
                  {drill.line}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ACTIONS.map((action) => {
                    const selected = pick === action.id;
                    const correct = show && action.id === drill.action;
                    const wrong = show && selected && action.id !== drill.action;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => setPicks((prev) => ({ ...prev, [drill.id]: action.id }))}
                        className={
                          "min-h-11 rounded-md border px-3 text-sm " +
                          (correct
                            ? "border-sage text-fg"
                            : wrong
                              ? "border-rose text-fg"
                              : selected
                                ? "border-copper text-fg"
                                : "border-line text-muted")
                        }
                      >
                        {action.label}
                      </button>
                    );
                  })}
                </div>
                {show ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{drill.why}</p> : null}
              </li>
            );
          })}
        </ol>
      </section>
    </Shell>
  );
}
