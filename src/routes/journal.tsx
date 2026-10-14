import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { targets } from "@/data/targets";
import { Shell, Kicker } from "@/components/shell";
import { deletePads, loadPads, type Pads } from "@/lib/pads";
import { useI18n } from "@/lib/i18n";
import { useHydrated, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const { t } = useI18n();
  const hydrated = useHydrated();
  const sessions = useProgress((s) => s.sessions);
  const removeSession = useProgress((s) => s.removeSession);
  const [pads, setPads] = useState<Record<string, Pads | null>>({});

  useEffect(() => {
    let cancel = false;
    void (async () => {
      const entries = await Promise.all(
        sessions.map(async (session) => [session.id, await loadPads(session.id).catch(() => null)] as const),
      );
      if (!cancel) setPads(Object.fromEntries(entries));
    })();
    return () => {
      cancel = true;
    };
  }, [sessions]);

  async function remove(id: string) {
    removeSession(id);
    try {
      await deletePads(id);
    } catch {
      /* the score row is already gone */
    }
  }

  const scored = sessions.length;
  const marks = sessions.reduce(
    (sum, session) =>
      sum + Number(session.score.gestalt) + Number(session.score.sensory) + Number(session.score.relation),
    0,
  );

  return (
    <Shell>
      <Kicker>{t("journal.kicker")}</Kicker>
      <h1 className="mt-3 font-serif text-4xl leading-tight font-medium text-fg">{t("journal.title")}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        {t("journal.lede")}
        {hydrated && scored > 0 ? t("journal.soFar", { marks, possible: scored * 3 }) : ""}
      </p>

      {!hydrated || sessions.length === 0 ? (
        <div className="mt-8 border-t border-line pt-6">
          <p className="text-sm text-muted">{t("journal.empty")}</p>
          <Link to="/lab" className="mt-4 inline-flex min-h-12 items-center text-sm text-copper">
            {t("journal.openLab")}
          </Link>
        </div>
      ) : (
        <ol className="mt-8 space-y-6">
          {sessions.map((session) => {
            const target = targets.find((item) => item.id === session.targetId);
            const hits =
              Number(session.score.gestalt) + Number(session.score.sensory) + Number(session.score.relation);
            const drawing = pads[session.id];
            return (
              <li key={session.id} className="border-t border-line pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-serif text-xl text-fg">{session.cue}</p>
                  <p className="text-sm text-faint">
                    {new Date(session.at).toLocaleString(undefined, {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="mt-1 text-sm text-copper">
                  {t("journal.hits", { hits, title: target?.title ?? t("journal.targetFallback") })}
                </p>
                <dl className="mt-3 space-y-1 text-sm text-muted">
                  {session.feeling ? (
                    <div>
                      <dt className="inline text-faint">{t("journal.feeling")}</dt>
                      <dd className="inline">{session.feeling}</dd>
                    </div>
                  ) : null}
                  {session.gestalt ? (
                    <div>
                      <dt className="inline text-faint">{t("journal.gestalt")}</dt>
                      <dd className="inline">{session.gestalt}</dd>
                    </div>
                  ) : null}
                  {session.sensory ? (
                    <div>
                      <dt className="inline text-faint">{t("journal.senses")}</dt>
                      <dd className="inline">{session.sensory}</dd>
                    </div>
                  ) : null}
                  {session.aol ? (
                    <div>
                      <dt className="inline text-faint">{t("journal.aol")}</dt>
                      <dd className="inline">{session.aol}</dd>
                    </div>
                  ) : null}
                </dl>
                {drawing?.ideogram || drawing?.sketch ? (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {drawing.ideogram ? (
                      <img src={drawing.ideogram} alt={t("journal.ideogramAlt")} className="w-full rounded-sm" />
                    ) : null}
                    {drawing.sketch ? (
                      <img src={drawing.sketch} alt={t("journal.sketchAlt")} className="w-full rounded-sm" />
                    ) : null}
                  </div>
                ) : null}
                <button type="button" onClick={() => void remove(session.id)} className="mt-3 min-h-11 text-sm text-faint">
                  {t("journal.remove")}
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </Shell>
  );
}
