
"use client";

import { useState, useEffect, useCallback } from "react";

export function SectionIndicator() {
    const [sections, setSections] = useState<{ id: string; label: string }[]>(
        []
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const scan = useCallback(() => {
        const els = document.querySelectorAll("main > section");
        const list: { id: string; label: string }[] = [];
        els.forEach((el, i) => {
            const heading = el.querySelector("h1, h2, p[class*='uppercase']");
            const label =
                heading?.textContent?.trim().slice(0, 20) || String(i + 1);
            list.push({ id: "section-" + i, label });
        });
        setSections(list);
    }, []);

    const handleScroll = useCallback(() => {
        const els = document.querySelectorAll("main > section");
        if (!els.length) return;

        const viewportH = window.innerHeight;
        const center = viewportH * 0.4;
        let closest = 0;
        let minDist = Infinity;

        els.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const sc = rect.top + rect.height / 2;
            const dist = Math.abs(sc - center);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });

        setActiveIndex(closest);

        const activeEl = els[closest];
        if (activeEl) {
            const rect = activeEl.getBoundingClientRect();
            const p = (viewportH * 0.4 - rect.top) / rect.height;
            setProgress(Math.max(0, Math.min(1, p)));
        }
    }, []);

    useEffect(() => {
        scan();
        handleScroll();

        const observer = new MutationObserver(scan);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [scan, handleScroll]);

    if (sections.length < 2) return null;

    function scrollTo(index: number) {
        const els = document.querySelectorAll("main > section");
        els[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const fillPct =
        ((activeIndex + progress) / Math.max(sections.length - 1, 1)) * 100;

    return (
        <div className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
            <div className="relative flex flex-col items-center gap-4">
                {/* Track */}
                <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/10" />

                {/* Fill */}
                <div
                    className="absolute left-1/2 top-2 w-px -translate-x-1/2 bg-[#F3DF3A]/30 transition-all duration-500"
                    style={{
                        height: Math.min(fillPct, 100) + "%",
                        maxHeight: "calc(100% - 16px)",
                    }}
                />

                {sections.map((section, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    let dotClass =
                        "relative rounded-full transition-all duration-500 ";
                    if (isActive) {
                        dotClass +=
                            "h-3 w-3 bg-[#F3DF3A] shadow-[0_0_12px_rgba(243,223,58,0.5)]";
                    } else if (isPast) {
                        dotClass += "h-2 w-2 bg-white/40";
                    } else {
                        dotClass += "h-2 w-2 bg-white/15";
                    }

                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollTo(i)}
                            className="group relative z-10 flex items-center"
                            aria-label={section.label}
                        >
                            <div className={dotClass} />
                            <span className="pointer-events-none absolute left-6 -translate-x-2 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-xs font-medium text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                {section.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
