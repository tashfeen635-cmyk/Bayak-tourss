import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { faqs } from "./data";

export function Faq() {
  return (
    <section id="faq" className="border-t border-[var(--tp-line)] py-24 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <Reveal>
          <header className="flex flex-col gap-6 border-b border-[var(--tp-line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="tp-eyebrow">FAQ</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Questions, answered.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--tp-muted)]">
              Quick answers to the questions people ask most.
            </p>
          </header>
        </Reveal>

        <div>
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 3) * 0.06}>
              <details className="group border-b border-[var(--tp-line)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-colors duration-200 hover:text-[var(--tp-accent)] [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[var(--tp-faint)] transition-transform duration-200 group-open:rotate-180 group-open:text-[var(--tp-accent)]" />
                </summary>
                <div className="max-w-2xl pb-6 text-base leading-relaxed text-[var(--tp-muted)]">
                  {faq.answer.split("\n\n").map((paragraph, j) => (
                    <p key={j} className={j > 0 ? "mt-4" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
