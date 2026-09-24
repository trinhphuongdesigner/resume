"use client";

import { useEffect, useRef, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "history", label: "Work History" },
  { id: "knowledge", label: "Knowledge" },
  { id: "education", label: "Education" },
];

export default function DarkNav() {
  const [active, setActive] = useState("about");
  // Suppresses the observer from overriding the target section right after
  // a nav click, while the smooth-scroll animation is still catching up —
  // otherwise a short section briefly passing through the viewport mid-scroll
  // can flicker the active dot before landing on the intended one.
  const suppressed = useRef(false);
  const suppressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        if (suppressed.current) return;

        let topId: string | null = null;
        let topRatio = 0;
        for (const item of navItems) {
          const ratio = ratios.get(item.id) ?? 0;
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = item.id;
          }
        }
        if (topId) setActive(topId);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    setActive(id);

    suppressed.current = true;
    if (suppressTimer.current) clearTimeout(suppressTimer.current);
    suppressTimer.current = setTimeout(() => {
      suppressed.current = false;
    }, 800);

    // Use an absolute scroll target (not scrollIntoView) so short trailing
    // sections still scroll all the way to their own top even when they're
    // already partially visible in the viewport — scrollIntoView would
    // otherwise consider them "close enough" and not move the page at all.
    const targetTop = section.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  return (
    <nav className="dot-nav">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`dot-nav-item${active === item.id ? " active" : ""}`}
        >
          <span className="dot-nav-dot">
            <span className="dot-nav-ripple" />
          </span>
          <span className="dot-nav-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
