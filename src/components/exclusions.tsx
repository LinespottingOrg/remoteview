import { exclusions } from "@/data/exclusions";

export function Exclusions() {
  return (
    <section id="exclusions" className="mt-12">
      <h2 className="font-serif text-2xl text-fg">What this course will not do</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Five exclusions. Each one is a line, and a reason the line stays. The method is easy to point at a life.
        This course refuses that use.
      </p>
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
