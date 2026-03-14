import type { AboutCompanyComponent } from "@/src/types/strapi";

type AboutSectionProps = {
    data?: AboutCompanyComponent | null;
};

const fallbackStats = [
    { value: "7 880 000+", label: "Произведенных квадратных метров" },
    { value: "14+", label: "Лет на рынке" },
    { value: "24/7", label: "Доставляем" },
];

const fallbackFeatures = [
    {
        icon: "\u26A1",
        title: "Лояльная система скидок",
        description: "Для дилеров действует выгодная система условий: новым партнёрам предоставляется скидка 10%, предусмотрены скидки за объём, бонусная программа, регулярные розыгрыши и специальные скидки на комплектующие.",
    },
    {
        icon: "\uD83D\uDD12",
        title: "Многоступенчатая проверка качества",
        description: "Проверка качества действует на всех этапах производства: при раскрое, приварке гарпуна и комплектации заказа.",
    },
    {
        icon: "\uD83D\uDCC8",
        title: "Индивидуальный подход",
        description: "Предлагаем гибкие условия для партнёров: несколько видов гарпуна и упаковки на выбор, разные варианты багета, большой ассортимент профилей и комплектующих, индивидуальные скидки, а также возможность срочного изготовления и доставки.",
    },
];

export function AboutSection({ data }: AboutSectionProps) {
    const eyebrow = data?.eyebrow || "О компании";
    const title = data?.title || "Наши принципы: качество, надежность, клиентоориентированность";
    const description =
        data?.description ||
        "С 2012г занимаемся прямыми поставками натяжных потолков и комплектующих от производителя. Более 500м2 производственных площадей, выпускаем более 5000м2 полотен в смену, штат более 30 сотрудников.";
    const stats = data?.stats?.length ? data.stats : fallbackStats;
    const features = data?.features?.length ? data.features : fallbackFeatures;

    return (
        <section className="px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                        {eyebrow}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {title}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-white/50">
                        {description}
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={[
                                "bg-white/[0.03] px-6 py-10 text-center transition hover:bg-white/[0.06]",
                                i === 0 ? "col-span-2" : "",
                            ].join(" ")}
                        >
                            <p className="text-3xl font-bold text-white sm:text-4xl">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-sm text-white/40">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Features grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-3">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                        >
                            {feature.icon && (
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl transition group-hover:bg-white/15">
                                    {feature.icon}
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-white">
                                {feature.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/50">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
