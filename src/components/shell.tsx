import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, FlaskConical, Library, PenLine } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { usePass, usePassHydrated, usePassStatus } from "@/lib/pass";

const NAV = [
  { to: "/course", label: "Course", icon: BookOpen },
  { to: "/method", label: "Method", icon: PenLine },
  { to: "/lab", label: "Lab", icon: FlaskConical },
  { to: "/archive", label: "Record", icon: Library },
] as const;

function active(path: string, to: string) {
  return path === to || path.startsWith(`${to}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const ensureStarted = usePass((s) => s.ensureStarted);
  useEffect(() => {
    const start = () => usePass.getState().ensureStarted();
    if (usePass.persist.hasHydrated()) start();
    return usePass.persist.onFinishHydration(start);
  }, [ensureStarted]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg px-4 py-3 md:px-8">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-serif text-lg font-medium tracking-tight text-fg">Remote View</span>
          <span className="hidden text-xs font-medium uppercase tracking-widest text-faint sm:inline">
            app.remoteview
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                "px-3 py-2 text-sm " +
                (active(path, item.to) ? "text-copper" : "text-muted hover:text-fg")
              }
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/faq"
            className={"px-3 py-2 text-sm " + (active(path, "/faq") ? "text-copper" : "text-muted hover:text-fg")}
          >
            FAQ
          </Link>
          <Link
            to="/journal"
            className={
              "px-3 py-2 text-sm " + (active(path, "/journal") ? "text-copper" : "text-muted hover:text-fg")
            }
          >
            Journal
          </Link>
          <PassLink />
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <PassLink />
          <Link to="/journal" className={"text-sm " + (active(path, "/journal") ? "text-copper" : "text-muted")}>
            Journal
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-28 md:px-8 md:pt-10 md:pb-16">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-bg md:hidden">
        {NAV.map((item) => {
          const Icon = item.icon;
          const on = active(path, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={
                "flex min-h-14 flex-col items-center justify-center gap-1 text-xs " +
                (on ? "text-copper" : "text-faint")
              }
            >
              <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function PassLink() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = usePassHydrated();
  const status = usePassStatus();
  const on = active(path, "/pass");
  const label = !hydrated
    ? "Pass"
    : status.phase === "life"
      ? "Lifetime"
      : status.phase === "paid"
        ? "Pass"
        : status.phase === "trial"
          ? `${status.daysLeft}d free`
          : "Pass";
  return (
    <Link to="/pass" className={"px-3 py-2 text-sm " + (on ? "text-copper" : "text-muted hover:text-fg")}>
      {label}
    </Link>
  );
}

export function Kicker({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-copper">
      {index ? <span className="text-faint">{index} · </span> : null}
      {children}
    </p>
  );
}
