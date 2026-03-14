import type { DeliveryMapComponent } from "@/src/types/strapi";

type DeliveryMapProps = {
    data?: DeliveryMapComponent | null;
};

const defaultRegions = [
    { name: "Воронежская область", isActive: true },
    { name: "Белгородская область", isActive: true },
    { name: "Курская область", isActive: true },
    { name: "Липецкая область", isActive: true },
    { name: "Тамбовская область", isActive: true },
];

export function DeliveryMap({ data }: DeliveryMapProps) {
    const eyebrow = data?.eyebrow || "География";
    const title = data?.title || "Бесплатная доставка по Центрально-Чернозёмному региону";
    const description =
        data?.description ||
        "Собственная логистическая сеть обеспечивает быструю доставку по всем областям ЦЧР. Центральный склад расположен в Воронеже с филиалами в каждом областном центре.";
    const regions = data?.regions?.length ? data.regions : defaultRegions;

    const active = regions.filter((r) => r.isActive !== false);
    const extended = regions.filter((r) => r.isActive === false);

    return (
        <section className="px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        {title}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-white/50">
                        {description}
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Map SVG */}
                    <div className="flex items-center justify-center lg:col-span-3">
                        <div className="relative w-full max-w-lg">
                            <svg
                                viewBox="0 0 500 400"
                                className="w-full"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Background glow */}
                                <defs>
                                    <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="white" stopOpacity="0.05" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                                <ellipse cx="250" cy="200" rx="220" ry="180" fill="url(#mapGlow)" />

                                {/* Kursk */}
                                <path
                                    d="M100 160 L140 130 L180 140 L190 180 L160 210 L120 200 Z"
                                    fill="rgba(255,255,255,0.08)"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="1"
                                    className="transition hover:fill-white/15"
                                />
                                <text x="145" y="175" textAnchor="middle" className="fill-white/50 text-[10px]">
                                    Курская
                                </text>

                                {/* Belgorod */}
                                <path
                                    d="M120 200 L160 210 L170 260 L140 280 L100 250 Z"
                                    fill="rgba(255,255,255,0.08)"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="1"
                                    className="transition hover:fill-white/15"
                                />
                                <text x="138" y="248" textAnchor="middle" className="fill-white/50 text-[10px]">
                                    Белгородская
                                </text>

                                {/* Voronezh - central, highlighted */}
                                <path
                                    d="M190 180 L260 160 L310 200 L300 270 L240 290 L170 260 L160 210 Z"
                                    fill="rgba(255,255,255,0.12)"
                                    stroke="rgba(255,255,255,0.35)"
                                    strokeWidth="1.5"
                                    className="transition hover:fill-white/20"
                                />
                                <text x="235" y="225" textAnchor="middle" className="fill-white/70 text-[11px] font-semibold">
                                    Воронежская
                                </text>
                                {/* Voronezh city dot */}
                                <circle cx="235" cy="240" r="4" fill="white" opacity="0.6" />
                                <circle cx="235" cy="240" r="8" fill="white" opacity="0.1" />

                                {/* Lipetsk */}
                                <path
                                    d="M180 100 L250 80 L280 110 L260 160 L190 180 L180 140 Z"
                                    fill="rgba(255,255,255,0.08)"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="1"
                                    className="transition hover:fill-white/15"
                                />
                                <text x="225" y="135" textAnchor="middle" className="fill-white/50 text-[10px]">
                                    Липецкая
                                </text>

                                {/* Tambov */}
                                <path
                                    d="M280 110 L360 100 L380 160 L350 210 L310 200 L260 160 Z"
                                    fill="rgba(255,255,255,0.08)"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="1"
                                    className="transition hover:fill-white/15"
                                />
                                <text x="325" y="155" textAnchor="middle" className="fill-white/50 text-[10px]">
                                    Тамбовская
                                </text>

                                {/* Oryol - extended */}
                                <path
                                    d="M80 110 L140 80 L180 100 L180 140 L140 130 L100 160 Z"
                                    fill="rgba(255,255,255,0.03)"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="0.5"
                                    strokeDasharray="4 4"
                                    className="transition hover:fill-white/08"
                                />
                                <text x="130" y="115" textAnchor="middle" className="fill-white/25 text-[9px]">
                                    Орловская
                                </text>

                                {/* Penza - extended */}
                                <path
                                    d="M360 100 L420 80 L440 140 L400 180 L380 160 Z"
                                    fill="rgba(255,255,255,0.03)"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="0.5"
                                    strokeDasharray="4 4"
                                    className="transition hover:fill-white/08"
                                />
                                <text x="400" y="130" textAnchor="middle" className="fill-white/25 text-[9px]">
                                    Пензенская
                                </text>

                                {/* Saratov - extended */}
                                <path
                                    d="M380 160 L440 140 L460 220 L400 260 L350 210 Z"
                                    fill="rgba(255,255,255,0.03)"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="0.5"
                                    strokeDasharray="4 4"
                                    className="transition hover:fill-white/08"
                                />
                                <text x="410" y="205" textAnchor="middle" className="fill-white/25 text-[9px]">
                                    Саратовская
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Region list */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
                                Зона покрытия
                            </h3>

                            <div className="space-y-3">
                                {active.map((region, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-[#F3DF3A]/80" />
                                        <span className="text-sm text-white/80">
                                            {region.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {extended.length > 0 && (
                                <>
                                    <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
                                        Расширенная доставка
                                    </h3>
                                    <div className="space-y-3">
                                        {extended.map((region, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                                            >
                                                <div className="h-2 w-2 rounded-full bg-white/20" />
                                                <span className="text-sm text-white/40">
                                                    {region.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
