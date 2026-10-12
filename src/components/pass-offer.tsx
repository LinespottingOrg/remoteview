import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { plans, usePass, usePassHydrated, usePassStatus, type PlanId } from "@/lib/pass";

export function PassOffer({ locked = false }: { locked?: boolean }) {
  const hydrated = usePassHydrated();
  const status = usePassStatus();
  const plan = usePass((s) => s.plan);
  const buy = usePass((s) => s.buy);
  const [pick, setPick] = useState<PlanId>("year");
  const [note, setNote] = useState("");

  const chosen = plans.find((item) => item.id === pick) ?? plans[1]!;

  function confirm() {
    buy(pick);
    setNote(
      pick === "life"
        ? "Lifetime pass recorded on this device."
        : `${chosen.name} pass recorded on this device, for ${chosen.term}.`,
    );
  }

  function restore() {
    if (status.open && status.phase !== "trial") {
      setNote("This device already holds a pass.");
      return;
    }
    setNote("No pass is stored on this device.");
  }

  return (
    <section className="mx-auto max-w-xl">
      <p className="text-xs font-medium uppercase tracking-widest text-copper">In-app pass</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium text-fg">
        {locked ? "The free week has ended." : "One week, then a pass."}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        {hydrated && status.phase === "trial"
          ? `${status.daysLeft} ${status.daysLeft === 1 ? "day" : "days"} left in the free week. The academy is open until then.`
          : hydrated && status.phase === "life"
            ? "Lifetime pass. No renewal."
            : hydrated && status.phase === "paid"
              ? `${status.daysLeft} ${status.daysLeft === 1 ? "day" : "days"} left on the ${plan === "year" ? "year" : "month"} pass.`
              : "After the week: 4 USD a month, 35 USD a year, or 99 USD once."}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-faint">
        Lecture 01, the record, the FAQ, and the exclusions stay open. The rest of the lectures, the drill, and a
        new lab session need the pass. Confirming records it on this device. A card is not charged in this build.
      </p>

      <div className="mt-8 space-y-3">
        {plans.map((item) => {
          const on = pick === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPick(item.id)}
              className={
                "block w-full border px-4 py-4 text-left " +
                (on ? "border-copper bg-surface" : "border-line")
              }
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-2xl text-fg">{item.name}</span>
                <span className="text-sm text-copper">{item.price}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">
                {item.term}. {item.detail}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={confirm}
        disabled={!hydrated}
        className="mt-6 inline-flex min-h-12 items-center bg-copper px-5 text-sm font-medium text-ink disabled:opacity-60"
      >
        Confirm {chosen.name.toLowerCase()} · {chosen.price}
      </button>
      <button type="button" onClick={restore} className="mt-3 block min-h-11 text-sm text-muted">
        Restore a pass on this device
      </button>
      {note ? <p className="mt-4 text-sm text-fg">{note}</p> : null}

      <p className="mt-8 text-xs leading-relaxed text-faint">
        Product ids: app.remoteview.month · app.remoteview.year · app.remoteview.life.{" "}
        <Link to="/faq" hash="pass" className="text-copper">
          What the pass covers
        </Link>
      </p>
    </section>
  );
}

export function Access({ children, preview = false }: { children: ReactNode; preview?: boolean }) {
  const hydrated = usePassHydrated();
  const status = usePassStatus();
  if (!hydrated) return <p className="text-sm text-faint">Checking the pass.</p>;
  if (status.open || preview) return children;
  return <PassOffer locked />;
}
