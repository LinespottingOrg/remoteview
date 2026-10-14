import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, FlaskConical, Library, PenLine } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useI18n, LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";
import { usePass, usePassHydrated, usePassStatus } from "@/lib/pass";

const NAV = [
  { to: "/course", label: "nav.course", icon: BookOpen },
  { to: "/method", label: "nav.method", icon: PenLine },
  { to: "/lab", label: "nav.lab", icon: FlaskConical },
  { to: "/archive", label: "nav.record", icon: Library },
] as const;

function active(path: string, to: string) {
  return path === to || path.startsWith(`${to}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { t, locale, setLocale } = useI18n();
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
          <span className="font-serif text-lg font-medium tracking-tight text-fg">{t("brand")}</span>
          <span className="hidden text-xs font-medium uppercase tracking-widest text-faint sm:inline">
            {t("brandMark")}
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
              {t(item.label)}
            </Link>
          ))}
          <Link
            to="/faq"
            className={"px-3 py-2 text-sm " + (active(path, "/faq") ? "text-copper" : "text-muted hover:text-fg")}
          >
            {t("nav.faq")}
          </Link>
          <Link
            to="/journal"
            className={
              "px-3 py-2 text-sm " + (active(path, "/journal") ? "text-copper" : "text-muted hover:text-fg")
            }
          >
            {t("nav.journal")}
          </Link>
          <PassLink />
          <LocaleSelect locale={locale} setLocale={setLocale} label={t("language.label")} />
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <LocaleSelect locale={locale} setLocale={setLocale} label={t("language.label")} />
          <PassLink />
          <Link to="/journal" className={"text-sm " + (active(path, "/journal") ? "text-copper" : "text-muted")}>
            {t("nav.journal")}
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
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
      <footer className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-8 md:pb-10">
        <a href={t("legal.privacyPolicyUrl")} className="text-sm text-faint">
          {t("legal.privacyPolicy")}
        </a>
      </footer>
    </div>
  );
}

function LocaleSelect({
  locale,
  setLocale,
  label,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="max-w-28 bg-transparent py-2 text-sm text-muted md:max-w-none"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_NAMES[code]}
          </option>
        ))}
      </select>
    </label>
  );
}

function PassLink() {
  const { t } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = usePassHydrated();
  const status = usePassStatus();
  const on = active(path, "/pass");
  const label = !hydrated
    ? t("nav.pass")
    : status.phase === "life"
      ? t("nav.lifetime")
      : status.phase === "paid"
        ? t("nav.pass")
        : status.phase === "trial"
          ? t("nav.daysFree", { count: status.daysLeft })
          : t("nav.pass");
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
