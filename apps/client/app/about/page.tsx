import type { Metadata } from "next";
import { HeroSection } from "@/src/components/hero-section";
import { FeatureCard } from "@/src/components/feature-card";
import { TeamCard } from "@/src/components/team-card";
import { CallbackButton } from "@/src/components/callback-button";

export const metadata: Metadata = {
    title: "О компании",
    description: "Узнайте больше о нашей команде, миссии и ценностях.",
};

const features = [
    {
        icon: "\u26A1",
        title: "Скорость",
        description:
            "Мы реализуем проекты в кратчайшие сроки, не жертвуя качеством. Каждый этап оптимизирован для максимальной эффективности.",
    },
    {
        icon: "\u2728",
        title: "Качество",
        description:
            "Безупречное внимание к деталям на каждом этапе. Мы используем только проверенные технологии и лучшие практики.",
    },
    {
        icon: "\uD83D\uDD12",
        title: "Надёжность",
        description:
            "Гарантируем стабильную работу и поддержку. Наши решения проходят многоуровневое тестирование перед запуском.",
    },
    {
        icon: "\uD83C\uDFAF",
        title: "Точность",
        description:
            "Глубоко погружаемся в задачи клиента. Понимаем бизнес-цели и предлагаем решения, которые работают.",
    },
    {
        icon: "\uD83D\uDE80",
        title: "Инновации",
        description:
            "Следим за трендами и внедряем передовые технологии. Ваш продукт будет на шаг впереди конкурентов.",
    },
    {
        icon: "\uD83E\uDD1D",
        title: "Партнёрство",
        description:
            "Строим долгосрочные отношения с клиентами. Ваш успех — наш приоритет на каждом этапе сотрудничества.",
    },
];

const team = [
    {
        name: "Александр Петров",
        role: "CEO & Основатель",
        bio: "15 лет опыта в IT-индустрии. Руководил разработкой продуктов для крупнейших компаний России.",
    },
    {
        name: "Мария Иванова",
        role: "Технический директор",
        bio: "Архитектор высоконагруженных систем. Эксперт в облачных технологиях и микросервисной архитектуре.",
    },
    {
        name: "Дмитрий Сидоров",
        role: "Ведущий дизайнер",
        bio: "Создаёт интерфейсы, которые любят пользователи. Фанат минимализма и продуманной типографики.",
    },
    {
        name: "Елена Козлова",
        role: "Менеджер проектов",
        bio: "Обеспечивает слаженную работу команды и соблюдение сроков. Сертифицированный Scrum Master.",
    },
];

const stats = [
    { value: "150+", label: "Проектов" },
    { value: "12", label: "Лет опыта" },
    { value: "40+", label: "Специалистов" },
    { value: "98%", label: "Довольных клиентов" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <HeroSection
                eyebrow="О компании"
                title="Создаём цифровые продукты, которые меняют правила игры"
                subtitle="Мы — команда инженеров, дизайнеров и стратегов, объединённых общей целью: делать технологии простыми и доступными для каждого."
            />

            {/* Stats */}
            <section className="border-y border-white/10 bg-white/5">
                <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-6 py-10 text-center">
                            <p className="text-3xl font-bold text-white sm:text-4xl">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-sm text-white/50">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                            Наши принципы
                        </p>
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Почему выбирают нас
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="border-y border-white/10 bg-white/5 px-6 py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                        Миссия
                    </p>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Технологии для людей
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-white/60">
                        Мы верим, что технологии должны упрощать жизнь, а не усложнять её.
                        Каждый наш продукт создаётся с мыслью о конечном пользователе —
                        интуитивный, быстрый и красивый. Мы не гонимся за трендами ради
                        трендов. Мы выбираем решения, которые действительно работают и
                        приносят ценность бизнесу наших клиентов.
                    </p>
                </div>
            </section>

            {/* Team */}
            <section className="px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                            Команда
                        </p>
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Люди, которые делают это возможным
                        </h2>
                    </div>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        {team.map((member) => (
                            <TeamCard key={member.name} {...member} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/10 bg-white/5 px-6 py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Готовы начать проект?
                    </h2>
                    <p className="mt-4 text-lg text-white/60">
                        Свяжитесь с нами, и мы обсудим вашу идею.
                    </p>
                    <CallbackButton
                        className="mt-8 inline-flex rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
                    >
                        Связаться с нами
                    </CallbackButton>
                </div>
            </section>
        </main>
    );
}
