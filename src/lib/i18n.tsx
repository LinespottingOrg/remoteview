import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "remoteview-locale";

export const LOCALES = [
  "ar",
  "bn",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "fi",
  "fr",
  "he",
  "hi",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "ms",
  "nl",
  "no",
  "pl",
  "pt",
  "pt-BR",
  "ro",
  "ru",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-Hans",
  "zh-Hant",
] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  ar: "العربية",
  bn: "বাংলা",
  cs: "Čeština",
  da: "Dansk",
  de: "Deutsch",
  el: "Ελληνικά",
  en: "English",
  es: "Español",
  fi: "Suomi",
  fr: "Français",
  he: "עברית",
  hi: "हिन्दी",
  hu: "Magyar",
  id: "Bahasa Indonesia",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  ms: "Bahasa Melayu",
  nl: "Nederlands",
  no: "Norsk",
  pl: "Polski",
  pt: "Português",
  "pt-BR": "Português (Brasil)",
  ro: "Română",
  ru: "Русский",
  sv: "Svenska",
  th: "ไทย",
  tr: "Türkçe",
  uk: "Українська",
  vi: "Tiếng Việt",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};

type Catalog = Record<string, string>;
type Vars = Record<string, string | number>;

const modules = import.meta.glob("../../i18n/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Catalog>;

const catalogs: Record<string, Catalog> = {};
for (const [path, catalog] of Object.entries(modules)) {
  const locale = path.split("/").pop()?.replace(/\.json$/, "") ?? "";
  catalogs[locale] = catalog;
}

const english: Catalog = catalogs.en ?? {};

export function matchLocale(input: string | null | undefined): Locale {
  if (!input) return "en";
  const raw = input.replace(/_/g, "-");
  const exact = LOCALES.find((locale) => locale.toLowerCase() === raw.toLowerCase());
  if (exact) return exact;
  const lower = raw.toLowerCase();
  if (lower === "zh" || lower.startsWith("zh-cn") || lower.startsWith("zh-sg") || lower.startsWith("zh-hans")) {
    return "zh-Hans";
  }
  if (
    lower.startsWith("zh-tw") ||
    lower.startsWith("zh-hk") ||
    lower.startsWith("zh-mo") ||
    lower.startsWith("zh-hant")
  ) {
    return "zh-Hant";
  }
  if (lower.startsWith("pt-br")) return "pt-BR";
  if (lower === "nb" || lower === "nn" || lower.startsWith("no")) return "no";
  const base = lower.split("-")[0] ?? "";
  const byBase = LOCALES.find((locale) => locale.toLowerCase() === base);
  return byBase ?? "en";
}

export function translate(locale: Locale, key: string, vars?: Vars): string {
  const template = catalogs[locale]?.[key] ?? english[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name: string) =>
    vars[name] === undefined || vars[name] === null ? "" : String(vars[name]),
  );
}

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Vars) => string;
};

const I18nContext = createContext<I18nValue>({
  locale: "en",
  setLocale: () => {},
  t: (key, vars) => translate("en", key, vars),
});

function applyDocument(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    const next = matchLocale(saved || navigator.language);
    setLocaleState(next);
    applyDocument(next);
  }, []);

  const value = useMemo<I18nValue>(() => {
    return {
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* private mode */
        }
        applyDocument(next);
      },
      t: (key, vars) => translate(locale, key, vars),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
