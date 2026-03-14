import type { HeroComponent, GlobalSettings } from "@/src/types/strapi";
import { CallbackButton } from "@/src/components/callback-button";

type HeroBannerProps = {
    hero?: HeroComponent | null;
    global: GlobalSettings;
};

const MODAL_TRIGGERS = ["#callback", "#lead-form"];

function isModalTrigger(link?: string | null): boolean {
    return !!link && MODAL_TRIGGERS.includes(link);
}

export function HeroBanner({ hero, global }: HeroBannerProps) {
    const title = hero?.title || "Комплексные решения для вашего бизнеса";
    const subtitle =
        hero?.subtitle ||
        global.siteDescription ||
        "Разрабатываем, внедряем и сопровождаем IT-решения, которые помогают бизнесу расти и масштабироваться.";
    const eyebrow = hero?.eyebrow || global.siteName;

    return (
        <section className="relative overflow-hidden px-6 pb-32 pt-24 sm:pb-40 sm:pt-32">
            {/* Background image + overlay */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')",
                    }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />
                {/* Gradient fade to page bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#383838]/30 via-transparent to-[#383838]" />
            </div>

            <div className="mx-auto max-w-5xl text-center">
                <p className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
                    {eyebrow}
                </p>

                <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl">
                    {title}
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl">
                    {subtitle}
                </p>



                {/* Phone */}
                {(hero?.phoneValue || global.phone) && (
                    <div className="mt-16">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                            {hero?.phoneLabel || "Горячая линия"}
                        </p>
                        <a
                            href={`tel:${(hero?.phoneValue || global.phone || "").replace(/[^\d+]/g, "")}`}
                            className="mt-2 inline-block text-2xl font-semibold text-white/80 transition hover:text-white sm:text-3xl"
                        >
                            {hero?.phoneValue || global.phone}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
