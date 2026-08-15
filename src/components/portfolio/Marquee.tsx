import { marqueeItems } from "./data";

export function Marquee() {
  return (
    <div className="tp-marquee border-y border-[var(--tp-line)] py-5">
      <div className="tp-marquee-track">
        <ul className="flex shrink-0 items-center">
          {marqueeItems.map((item) => (
            <li key={item} className="flex items-center">
              <span className="tp-mono-label whitespace-nowrap px-6">{item}</span>
              <span className="text-[var(--tp-accent)]">/</span>
            </li>
          ))}
        </ul>
        <ul className="flex shrink-0 items-center motion-reduce:hidden" aria-hidden="true">
          {marqueeItems.map((item) => (
            <li key={item} className="flex items-center">
              <span className="tp-mono-label whitespace-nowrap px-6">{item}</span>
              <span className="text-[var(--tp-accent)]">/</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
