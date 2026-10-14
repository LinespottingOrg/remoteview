import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { plans, usePass, usePassHydrated, usePassStatus, type PlanId } from "@/lib/pass";

const PLAN_NAME = {
  month: "pass.nameMonth",
  year: "pass.nameYear",
  life: "pass.nameLife",
} as const;
const PLAN_LOWER = {
  month: "pass.planMonth",
  year: "pass.planYear",
  life: "pass.planLife",
} as const;
const PLAN_PRICE = {
  month: "pass.priceMonth",
  year: "pass.priceYear",
  life: "pass.priceLife",
} as const;
const PLAN_TERM = {
  month: "pass.termMonth",
  year: "pass.termYear",
  life: "pass.termLife",
} as const;
const PLAN_DETAIL = {
  month: "pass.detailMonth",
  year: "pass.detailYear",
  life: "pass.detailLife",
} as const;

export function PassOffer({ locked = false }: { locked?: boolean }) {
  const { t } = useI18n();
  const hydrated = usePassHydrated();
  const status = usePassStatus();
  const plan = usePass((s) => s.plan);
  const buy = usePass((s) => s.buy);
  const [pick, setPick] = useState<PlanId>("year");
  const [note, setNote] = useState("");

  function confirm() {
    buy(pick);
    setNote(
      pick === "life"
        ? t("pass.noteLife")
        : t("pass.noteTerm", { name: t(PLAN_NAME[pick]), term: t(PLAN_TERM[pick]) }),
    );
  }

  function restore() {
    if (status.open && status.phase !== "trial") {
      setNote(t("pass.noteAlready"));
      return;
    }
    setNote(t("pass.noteNone"));
  }

  return (
    <section className="mx-auto max-w-xl">
      <p className="text-xs font-medium uppercase tracking-widest text-copper">{t("pass.kicker")}</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium text-fg">
        {locked ? t("pass.lockedTitle") : t("pass.openTitle")}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        {hydrated && status.phase === "trial"
          ? t(status.daysLeft === 1 ? "pass.trialOne" : "pass.trialOther", { count: status.daysLeft })
          : hydrated && status.phase === "life"
            ? t("pass.lifetime")
            : hydrated && status.phase === "paid"
              ? t(status.daysLeft === 1 ? "pass.paidOne" : "pass.paidOther", {
                  count: status.daysLeft,
                  plan: t(plan === "year" ? "pass.planYear" : "pass.planMonth"),
                })
              : t("pass.afterWeek")}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-faint">{t("pass.scope")}</p>

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
                <span className="font-serif text-2xl text-fg">{t(PLAN_NAME[item.id])}</span>
                <span className="text-sm text-copper">{t(PLAN_PRICE[item.id])}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">
                {t(PLAN_TERM[item.id])}. {t(PLAN_DETAIL[item.id])}
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
        {t("pass.confirm", { name: t(PLAN_LOWER[pick]), price: t(PLAN_PRICE[pick]) })}
      </button>
      <button type="button" onClick={restore} className="mt-3 block min-h-11 text-sm text-muted">
        {t("pass.restore")}
      </button>
      {note ? <p className="mt-4 text-sm text-fg">{note}</p> : null}

      <p className="mt-8 text-xs leading-relaxed text-faint">
        {t("pass.productIds")}{" "}
        <Link to="/faq" hash="pass" className="text-copper">
          {t("pass.covers")}
        </Link>
      </p>
    </section>
  );
}

export function Access({ children, preview = false }: { children: ReactNode; preview?: boolean }) {
  const hydrated = usePassHydrated();
  const status = usePassStatus();
  const { t } = useI18n();
  if (!hydrated) return <p className="text-sm text-faint">{t("pass.checking")}</p>;
  if (status.open || preview) return children;
  return <PassOffer locked />;
}
