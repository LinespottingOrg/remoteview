import { exclusions } from "@/data/exclusions";
import { useI18n } from "@/lib/i18n";

export function Exclusions() {
  const { t } = useI18n();
  return (
    <section id="exclusions" className="mt-12">
      <h2 className="font-serif text-2xl text-fg">{t("exclusions.title")}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t("exclusions.lede")}</p>
      <ol className="mt-6 divide-y divide-line border-y border-line">
        {exclusions.map((item, index) => (
          <li key={item.id} className="py-5">
            <p className="text-xs font-medium uppercase tracking-widest text-copper">
              {String(index + 1).padStart(2, "0")} · {item.label}
            </p>
            <h3 className="mt-2 font-serif text-xl text-fg">{item.rule}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{item.why}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
