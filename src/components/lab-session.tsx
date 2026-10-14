import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { vocab } from "@/data/method";
import { pickTarget, targets, type Target } from "@/data/targets";
import { savePads } from "@/lib/pads";
import { useProgress, type SessionScore } from "@/lib/progress";
import { Pad } from "@/components/pad";
import { Exclusions } from "@/components/exclusions";
import { useI18n } from "@/lib/i18n";

type Phase = "ready" | "work" | "sealed" | "open" | "locked";

function makeCue() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let cue = "RV-";
  for (let i = 0; i < 4; i += 1) cue += alphabet[Math.floor(Math.random() * alphabet.length)];
  return cue;
}

export function LabSession() {
  const { t } = useI18n();
  const sessions = useProgress((s) => s.sessions);
  const addSession = useProgress((s) => s.addSession);
  const recent = useMemo(() => sessions.slice(0, 4).map((s) => s.targetId), [sessions]);
  const [phase, setPhase] = useState<Phase>("ready");
  const [cue, setCue] = useState("");
  const [target, setTarget] = useState<Target | null>(null);
  const [feeling, setFeeling] = useState("");
  const [gestalt, setGestalt] = useState("");
  const [sensory, setSensory] = useState("");
  const [aol, setAol] = useState("");
  const [ideogram, setIdeogram] = useState("");
  const [sketch, setSketch] = useState("");
  const [score, setScore] = useState<SessionScore>({
    gestalt: false,
    sensory: false,
    relation: false,
  });
  const [error, setError] = useState("");

  function begin() {
    setCue(makeCue());
    setTarget(pickTarget(recent));
    setFeeling("");
    setGestalt("");
    setSensory("");
    setAol("");
    setIdeogram("");
    setSketch("");
    setScore({ gestalt: false, sensory: false, relation: false });
    setError("");
    setPhase("work");
  }

  async function lock() {
    if (!target) return;
    const id = crypto.randomUUID();
    addSession({
      id,
      at: Date.now(),
      cue,
      targetId: target.id,
      feeling: feeling.trim(),
      gestalt: gestalt.trim(),
      sensory: sensory.trim(),
      aol: aol.trim(),
      score,
    });
    try {
      if (ideogram || sketch) await savePads(id, { ideogram, sketch });
    } catch {
      setError(t("lab.drawError"));
    }
    setPhase("locked");
  }

  const hits = Number(score.gestalt) + Number(score.sensory) + Number(score.relation);
  const lockedLine =
    hits === 0 ? t("lab.lockedZero", { hits }) : hits === 3 ? t("lab.lockedStrong", { hits }) : t("lab.lockedMixed", { hits });

  return (
    <div className="mx-auto max-w-3xl">
      <header className="border-l-2 border-copper pl-4">
        <p className="text-xs font-medium uppercase tracking-widest text-copper">{t("lab.kicker")}</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight font-medium text-fg">{t("lab.title")}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("lab.lede")}</p>
      </header>

      {phase === "ready" ? (
        <div className="mt-8 space-y-6">
          <ol className="space-y-3 text-sm leading-relaxed text-muted">
            <li className="border-l border-line pl-3">{t("lab.step1")}</li>
            <li className="border-l border-line pl-3">{t("lab.step2")}</li>
            <li className="border-l border-line pl-3">{t("lab.step3")}</li>
            <li className="border-l border-line pl-3">{t("lab.step4")}</li>
          </ol>
          <p className="text-sm leading-relaxed text-faint">
            {t("lab.pool", { count: targets.length })}
          </p>
          <button
            type="button"
            onClick={begin}
            className="inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink"
          >
            {t("lab.begin")}
          </button>
        </div>
      ) : null}

      {phase !== "ready" && target ? (
        <div className="sheet mt-8 rounded-lg bg-paper p-5 text-ink md:p-8">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">{t("lab.session")}</p>
            <p className="font-serif text-2xl text-ink">{cue}</p>
          </div>
          <p className="mt-1 text-sm text-ink-soft">{t("lab.cueNote")}</p>

          <div className="mt-6">
            <Pad key={`${cue}-ideogram`} label={t("lab.stage1")} onChange={setIdeogram} />
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">{t("lab.feeling")}</span>
            <input
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder={t("lab.feelingPlaceholder")}
              disabled={phase !== "work"}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">
              {t("lab.gestalt")}
            </span>
            <input
              value={gestalt}
              onChange={(e) => setGestalt(e.target.value)}
              placeholder={vocab.join(" · ")}
              disabled={phase !== "work"}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">
              {t("lab.stage2")}
            </span>
            <textarea
              value={sensory}
              onChange={(e) => setSensory(e.target.value)}
              placeholder={t("lab.sensoryPlaceholder")}
              disabled={phase !== "work"}
            />
          </label>
          <div className="mt-5">
            <Pad key={`${cue}-sketch`} label={t("lab.stage3")} onChange={setSketch} />
          </div>
          <label className="mt-5 block">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">{t("lab.aol")}</span>
            <input
              value={aol}
              onChange={(e) => setAol(e.target.value)}
              placeholder={t("lab.aolPlaceholder")}
              disabled={phase !== "work"}
            />
          </label>

          {phase === "work" ? (
            <button
              type="button"
              onClick={() => setPhase("sealed")}
              className="mt-6 inline-flex min-h-12 items-center bg-ink px-5 text-sm font-medium text-paper"
            >
              {t("lab.seal")}
            </button>
          ) : null}

          {phase === "sealed" ? (
            <div className="mt-6 border-t border-rule pt-5">
              <p className="text-sm leading-relaxed text-ink-soft">
                {t("lab.sealedNote")}
              </p>
              <button
                type="button"
                onClick={() => setPhase("open")}
                className="mt-4 inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink"
              >
                {t("lab.openTarget")}
              </button>
            </div>
          ) : null}

          {phase === "open" || phase === "locked" ? (
            <div className="mt-6 border-t border-rule pt-5">
              <img src={target.image} alt={target.title} className="aspect-photo w-full rounded-sm object-cover" />
              <h2 className="mt-4 font-serif text-2xl">{target.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t("lab.scoreNote")}
              </p>
              <ScoreRow
                label={t("lab.scoreGestalt")}
                detail={target.gestalt}
                on={score.gestalt}
                disabled={phase === "locked"}
                onToggle={() => setScore((s) => ({ ...s, gestalt: !s.gestalt }))}
              />
              <ScoreRow
                label={t("lab.scoreSensory")}
                detail={target.sensory}
                on={score.sensory}
                disabled={phase === "locked"}
                onToggle={() => setScore((s) => ({ ...s, sensory: !s.sensory }))}
              />
              <ScoreRow
                label={t("lab.scoreRelation")}
                detail={target.relation}
                on={score.relation}
                disabled={phase === "locked"}
                onToggle={() => setScore((s) => ({ ...s, relation: !s.relation }))}
              />
              {phase === "open" ? (
                <button
                  type="button"
                  onClick={() => void lock()}
                  className="mt-5 inline-flex min-h-12 items-center bg-ink px-5 text-sm font-medium text-paper"
                >
                  {t("lab.lock", { hits })}
                </button>
              ) : (
                <div className="mt-5">
                  <p className="text-sm font-medium text-ink">
                    {lockedLine}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {t("lab.modelNote", { model: target.model })}
                  </p>
                  {error ? <p className="mt-2 text-sm text-rose">{error}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-4">
                    <button type="button" onClick={begin} className="min-h-12 text-sm font-medium text-copper-dim">
                      {t("lab.another")}
                    </button>
                    <Link to="/journal" className="inline-flex min-h-12 items-center text-sm text-ink">
                      {t("lab.openJournal")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      <Exclusions />
    </div>
  );
}

function ScoreRow({
  label,
  detail,
  on,
  disabled,
  onToggle,
}: {
  label: string;
  detail: string;
  on: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="mt-4 border-t border-rule pt-3">
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className="flex min-h-12 w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-sm font-medium">{label}</span>
        <span
          className={
            "inline-flex h-8 min-w-14 items-center justify-center rounded-sm px-2 text-xs font-medium " +
            (on ? "bg-sage text-ink" : "bg-rule text-ink-soft")
          }
        >
          {on ? t("lab.yes") : t("lab.no")}
        </span>
      </button>
      <p className="text-sm leading-relaxed text-ink-soft">{detail}</p>
    </div>
  );
}
