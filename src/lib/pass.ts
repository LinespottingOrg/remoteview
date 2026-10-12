import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PlanId = "month" | "year" | "life";

const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const plans: { id: PlanId; name: string; price: string; term: string; detail: string }[] = [
  {
    id: "month",
    name: "Month",
    price: "4 USD",
    term: "30 days",
    detail: "Then confirm again if you want another month.",
  },
  {
    id: "year",
    name: "Year",
    price: "35 USD",
    term: "365 days",
    detail: "The same academy, billed once for the year.",
  },
  {
    id: "life",
    name: "Lifetime",
    price: "99 USD",
    term: "once",
    detail: "No renewal. The pass stays on this device.",
  },
];

type PassState = {
  startedAt: number | null;
  plan: PlanId | null;
  purchasedAt: number | null;
  ensureStarted: () => void;
  buy: (plan: PlanId) => void;
};

export const usePass = create<PassState>()(
  persist(
    (set) => ({
      startedAt: null,
      plan: null,
      purchasedAt: null,
      ensureStarted: () => set((s) => (s.startedAt ? s : { startedAt: Date.now() })),
      buy: (plan) => set({ plan, purchasedAt: Date.now() }),
    }),
    { name: "remote-view-pass" },
  ),
);

export type PassPhase = "trial" | "paid" | "life" | "locked";

export type PassStatus = {
  phase: PassPhase;
  open: boolean;
  daysLeft: number;
  until: number | null;
};

export function passStatus(
  s: { startedAt: number | null; plan: PlanId | null; purchasedAt: number | null },
  now = Date.now(),
): PassStatus {
  const started = s.startedAt ?? now;
  const trialUntil = started + WEEK;
  if (s.plan === "life" && s.purchasedAt) {
    return { phase: "life", open: true, daysLeft: 0, until: null };
  }
  if (s.plan && s.purchasedAt) {
    const span = s.plan === "year" ? YEAR : MONTH;
    const until = s.purchasedAt + span;
    if (now < until) {
      return { phase: "paid", open: true, daysLeft: Math.max(1, Math.ceil((until - now) / DAY)), until };
    }
  }
  if (now < trialUntil) {
    return {
      phase: "trial",
      open: true,
      daysLeft: Math.max(1, Math.ceil((trialUntil - now) / DAY)),
      until: trialUntil,
    };
  }
  return { phase: "locked", open: false, daysLeft: 0, until: trialUntil };
}

export function usePassHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const finish = () => setReady(true);
    const unsub = usePass.persist.onFinishHydration(finish);
    if (usePass.persist.hasHydrated()) finish();
    return unsub;
  }, []);
  return ready;
}

export function usePassStatus() {
  const startedAt = usePass((s) => s.startedAt);
  const plan = usePass((s) => s.plan);
  const purchasedAt = usePass((s) => s.purchasedAt);
  return passStatus({ startedAt, plan, purchasedAt });
}
