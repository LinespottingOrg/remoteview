import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionScore = {
  gestalt: boolean;
  sensory: boolean;
  relation: boolean;
};

export type RvSession = {
  id: string;
  at: number;
  cue: string;
  targetId: string;
  feeling: string;
  gestalt: string;
  sensory: string;
  aol: string;
  score: SessionScore;
};

type ProgressState = {
  done: string[];
  quizzes: Record<string, number[]>;
  sessions: RvSession[];
  markDone: (id: string) => void;
  saveQuiz: (id: string, answers: number[]) => void;
  addSession: (session: RvSession) => void;
  removeSession: (id: string) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      done: [],
      quizzes: {},
      sessions: [],
      markDone: (id) =>
        set((s) => ({ done: s.done.includes(id) ? s.done : [...s.done, id] })),
      saveQuiz: (id, answers) =>
        set((s) => ({ quizzes: { ...s.quizzes, [id]: answers } })),
      addSession: (session) =>
        set((s) => ({ sessions: [session, ...s.sessions].slice(0, 24) })),
      removeSession: (id) =>
        set((s) => ({ sessions: s.sessions.filter((item) => item.id !== id) })),
    }),
    { name: "remote-view-progress" },
  ),
);

export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const finish = () => setReady(true);
    const unsub = useProgress.persist.onFinishHydration(finish);
    if (useProgress.persist.hasHydrated()) finish();
    return unsub;
  }, []);
  return ready;
}
