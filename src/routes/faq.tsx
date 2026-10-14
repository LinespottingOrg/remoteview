import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { faq, patentLinks } from "@/data/faq";
import { sources } from "@/data/archive";
import { Shell, Kicker } from "@/components/shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState("patent");

  return (
    <Shell>
      <Kicker>{t("faq.kicker")}</Kicker>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight font-medium text-fg md:text-5xl">
        {t("faq.title")}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("faq.lede")}</p>

      <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
        {faq.map((item) => {
          const on = open === item.id;
          return (
            <div key={item.id} id={item.id}>
              <button
                type="button"
                onClick={() => setOpen(on ? "" : item.id)}
                className="flex min-h-14 w-full items-baseline justify-between gap-4 py-4 text-left"
              >
                <span className="font-serif text-xl text-fg">{item.q}</span>
                <span className="text-xs uppercase tracking-widest text-copper">{on ? t("faq.close") : t("faq.open")}</span>
              </button>
              {on ? (
                <div className="space-y-3 pb-5">
                  {item.a.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="max-w-2xl text-sm leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <section className="mt-14 max-w-3xl" id="patents">
        <h2 className="font-serif text-2xl text-fg">{t("faq.patentsTitle")}</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {patentLinks.map((item) => (
            <li key={item.id} className="py-4">
              <a href={item.href} className="text-base text-copper" target="_blank" rel="noreferrer">
                {item.label}
              </a>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-serif text-2xl text-fg">{t("faq.shelfTitle")}</h2>
        <ul className="mt-4 space-y-4">
          {sources.map((source) => (
            <li key={source.title} className="border-t border-line pt-4">
              {source.href ? (
                <a href={source.href} className="text-base text-copper" target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              ) : (
                <p className="text-base text-fg">{source.title}</p>
              )}
              <p className="mt-1 text-sm leading-relaxed text-muted">{source.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
