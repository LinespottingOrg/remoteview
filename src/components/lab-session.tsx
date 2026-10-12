import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { vocab } from "@/data/method";
import { pickTarget, targets, type Target } from "@/data/targets";
import { savePads } from "@/lib/pads";
import { useProgress, type SessionScore } from "@/lib/progress";
import { Pad } from "@/components/pad";
import { Exclusions } from "@/components/exclusions";

type Phase = "ready" | "work" | "sealed" | "open" | "locked";

function makeCue() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let cue = "RV-";
  for (let i = 0; i < 4; i += 1) cue += alphabet[Math.floor(Math.random() * alphabet.length)];
  return cue;
}

export function LabSession() {
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
      setError("The score is saved. The drawings could not be stored on this device.");
    }
    setPhase("locked");
  }

  const hits = Number(score.gestalt) + Number(score.sensory) + Number(score.relation);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="border-l-2 border-copper pl-4">
        <p className="text-xs font-medium uppercase tracking-widest text-copper">Practice lab</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight font-medium text-fg">A blind page</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Ten minutes. Ideogram, four senses, one sketch. The picture stays off this page until you seal it.
          The seal is a discipline, not a lock.
        </p>
      </header>

      {phase === "ready" ? (
        <div className="mt-8 space-y-6">
          <ol className="space-y-3 text-sm leading-relaxed text-muted">
            <li className="border-l border-line pl-3">1. Take the cue. Do not try to decode it. It does not describe the target.</li>
            <li className="border-l border-line pl-3">2. One mark. Write A, the feeling. Write B from the small vocabulary, or box an AOL.</li>
            <li className="border-l border-line pl-3">3. Temperature, texture, sound, light. Then masses and how they sit.</li>
            <li className="border-l border-line pl-3">4. Seal. Then look. Then score the miss as carefully as the hit.</li>
          </ol>
          <p className="text-sm leading-relaxed text-faint">
            Places and objects in this pool only — {targets.length} targets, chosen so recent ones wait their turn.
            People, medicine, legal claims, money, and borrowed stamps are excluded. The reasons are under the page.
          </p>
          <button
            type="button"
            onClick={begin}
            className="inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink"
          >
            Begin a blind session
          </button>
        </div>
      ) : null}

      {phase !== "ready" && target ? (
        <div className="sheet mt-8 rounded-lg bg-paper p-5 text-ink md:p-8">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">Session</p>
            <p className="font-serif text-2xl text-ink">{cue}</p>
          </div>
          <p className="mt-1 text-sm text-ink-soft">Cue only. It is not a coordinate and it is not a hint.</p>

          <div className="mt-6">
            <Pad key={`${cue}-ideogram`} label="Stage I · ideogram" onChange={setIdeogram} />
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">A · feeling of the mark</span>
            <input
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="Wavy, hard, rising, flat…"
              disabled={phase !== "work"}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">
              B · gestalt, or AOL
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
              Stage II · temperature, texture, sound, light
            </span>
            <textarea
              value={sensory}
              onChange={(e) => setSensory(e.target.value)}
              placeholder="Adjectives. No place names."
              disabled={phase !== "work"}
            />
          </label>
          <div className="mt-5">
            <Pad key={`${cue}-sketch`} label="Stage III · masses and how they sit" onChange={setSketch} />
          </div>
          <label className="mt-5 block">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">AOL · boxed, not obeyed</span>
            <input
              value={aol}
              onChange={(e) => setAol(e.target.value)}
              placeholder="If a name arrived, write it here and leave it"
              disabled={phase !== "work"}
            />
          </label>

          {phase === "work" ? (
            <button
              type="button"
              onClick={() => setPhase("sealed")}
              className="mt-6 inline-flex min-h-12 items-center bg-ink px-5 text-sm font-medium text-paper"
            >
              Seal the page
            </button>
          ) : null}

          {phase === "sealed" ? (
            <div className="mt-6 border-t border-rule pt-5">
              <p className="text-sm leading-relaxed text-ink-soft">
                The page is closed. Opening the target is feedback. If you already knew which picture this was, mark
                the session contaminated and do not count it.
              </p>
              <button
                type="button"
                onClick={() => setPhase("open")}
                className="mt-4 inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink"
              >
                Open the target
              </button>
            </div>
          ) : null}

          {phase === "open" || phase === "locked" ? (
            <div className="mt-6 border-t border-rule pt-5">
              <img src={target.image} alt={target.title} className="aspect-photo w-full rounded-sm object-cover" />
              <h2 className="mt-4 font-serif text-2xl">{target.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Score only what you wrote before this picture. Adjacency is not a hit.
              </p>
              <ScoreRow
                label="Gestalt matches what you wrote"
                detail={target.gestalt}
                on={score.gestalt}
                disabled={phase === "locked"}
                onToggle={() => setScore((s) => ({ ...s, gestalt: !s.gestalt }))}
              />
              <ScoreRow
                label="At least two sensory lines match"
                detail={target.sensory}
                on={score.sensory}
                disabled={phase === "locked"}
                onToggle={() => setScore((s) => ({ ...s, sensory: !s.sensory }))}
              />
              <ScoreRow
                label="The sketch has the relationship"
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
                  Lock the score · {hits} of 3
                </button>
              ) : (
                <div className="mt-5">
                  <p className="text-sm font-medium text-ink">
                    Locked at {hits} of 3. {hits === 0 ? "A zero is data." : hits === 3 ? "A strong training page." : "Mixed. Keep it mixed."}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    A clean stage I–III line for this target, written after the fact so it cannot help you: {target.model}
                  </p>
                  {error ? <p className="mt-2 text-sm text-rose">{error}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-4">
                    <button type="button" onClick={begin} className="min-h-12 text-sm font-medium text-copper-dim">
                      Another session
                    </button>
                    <Link to="/journal" className="inline-flex min-h-12 items-center text-sm text-ink">
                      Open the journal
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
          {on ? "Yes" : "No"}
        </span>
      </button>
      <p className="text-sm leading-relaxed text-ink-soft">{detail}</p>
    </div>
  );
}
