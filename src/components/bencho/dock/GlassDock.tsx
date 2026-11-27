"use client";

import "./GlassDock.css";
import "../bencho-tokens.css";
import { useLayoutEffect, useRef, useState, type ComponentType } from "react";

/* ══ dock, distance based magnification ═══════════════════
   Adapted from the bencho.dev Dock block (MIT). The items are
   links passed in by the caller rather than a fixed demo set,
   and a touch is left to the browser so a tap simply follows
   the link.

   Scale falls off with distance from the cursor rather than
   applying only to the hovered item, which is what stops it
   reading as a row of buttons that happen to grow. */

export type DockItem = {
  key: string;
  label: string;
  href: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;
  external?: boolean;
};

const stillness = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function GlassDock({
  items,
  label = "Links",
  /* what the glyph under the cursor grows to */
  magnify = 1.32,
  /* how many neighbours either side feel it */
  spread = 2,
  /* how far the nearest glyph rises out of the bar */
  lift = 8,
  /* the name that appears over whatever is under the cursor */
  labels = true,
}: {
  items: DockItem[];
  label?: string;
  magnify?: number;
  spread?: number;
  lift?: number;
  labels?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [still] = useState(stillness);
  /* The bar reads the pointer, the items do not: the index comes
     from the nearest item centre to the pointer's x, measured
     rather than derived, because magnified items are not all the
     same width. */
  const bar = useRef<HTMLElement | null>(null);

  const at = (clientX: number) => {
    const els = bar.current?.querySelectorAll(".gdock-item");
    if (!els?.length) return null;
    let best = 0;
    let gap = Infinity;
    els.forEach((el, i) => {
      const b = el.getBoundingClientRect();
      const d = Math.abs(clientX - (b.left + b.width / 2));
      if (d < gap) { gap = d; best = i; }
    });
    return best;
  };

  return (
    <nav
      className="gdock"
      aria-label={label}
      ref={bar}
      onPointerMove={(e) => { if (e.pointerType === "mouse") setHover(at(e.clientX)); }}
      onPointerLeave={() => setHover(null)}
      onFocus={(e) => {
        const i = Array.from(bar.current?.querySelectorAll(".gdock-item") ?? []).indexOf(e.target as Element);
        setHover(i >= 0 ? i : null);
      }}
      onBlur={() => setHover(null)}
    >
      {items.map(({ key, label: name, href, Icon, external }, i) => {
        const d = hover === null ? 99 : Math.abs(i - hover);
        /* a raised cosine over the reach: 1 under the cursor,
           easing to 0 at the edge of the reach */
        const f = still || d > spread ? 0 : (1 + Math.cos((Math.PI * d) / (spread + 1))) / 2;
        const scale = 1 + (magnify - 1) * f;
        return (
          <a
            key={key}
            className="gdock-item"
            href={href}
            aria-label={name}
            data-near={d <= 1 ? d : undefined}
            {...(external ? { target: "_blank", rel: "noopener" } : {})}
          >
            {/* the glyph magnifies, not the link, so the tip and
                the hit area stay put */}
            <span
              className="gdock-glyph"
              style={{ transform: `translateY(${-lift * f}px) scale(${scale})` }}
            >
              <Icon size={20} strokeWidth={2} aria-hidden={true} />
            </span>
          </a>
        );
      })}
      {labels && <DockTip bar={bar} at={hover} items={items} />}
    </nav>
  );
}

/* ── one tip that travels ────────────────────────────────
   Not a label per icon blinking on and off, but one pill that
   slides along to whichever icon is under the pointer and
   changes width to fit the new word as it goes. It keeps the
   last word while it fades, so leaving the dock does not empty
   it mid-fade. */
function DockTip({
  bar,
  at,
  items,
}: {
  bar: React.RefObject<HTMLElement | null>;
  at: number | null;
  items: DockItem[];
}) {
  const [last, setLast] = useState(0);
  const [place, setPlace] = useState<{ x: number; w: number } | null>(null);
  const word = useRef<HTMLSpanElement>(null);
  /* the first placing must not slide in from the bar's left edge */
  const [ready, setReady] = useState(false);
  if (at !== null && at !== last) setLast(at);

  useLayoutEffect(() => {
    const nav = bar.current;
    const item = nav?.querySelectorAll<HTMLElement>(".gdock-item")[last];
    const text = word.current;
    if (!nav || !item || !text) return;
    /* offsetLeft is layout, so the glyph's own scale does not skew it */
    const w = Math.ceil(text.scrollWidth) + 24;
    setPlace({ x: item.offsetLeft + item.offsetWidth / 2 - w / 2, w });
  }, [last, bar]);

  useLayoutEffect(() => {
    if (!place || ready) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [place, ready]);

  return (
    <span
      className="gdock-tip"
      aria-hidden="true"
      data-on={at !== null && !!place}
      data-ready={ready || undefined}
      style={place ? { width: place.w, transform: `translateX(${place.x}px)` } : undefined}
    >
      <span ref={word}>{items[last].label}</span>
    </span>
  );
}
