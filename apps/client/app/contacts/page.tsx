import type { Metadata } from "next";
import { HeroSection } from "@/src/components/hero-section";
import { ContactForm } from "@/src/components/contact-form";
import { ContactInfo } from "@/src/components/contact-info";

export const metadata: Metadata = {
    title: "Контакты",
    description: "Свяжитесь с нами любым удобным способом.",
};

const contactItems = [
    {
        icon: "\uD83D\uDCDE",
        label: "Телефон",
        value: "+7 (495) 123-45-67",
        href: "tel:+74951234567",
    },
    {
        icon: "\u2709\uFE0F",
        label: "Email",
        value: "info@example.com",
        href: "mailto:info@example.com",
    },
    {
        icon: "\uD83D\uDCCD",
        label: "Адрес",
        value: "г. Москва, ул. Тверская, д. 1, офис 42",
    },
    {
        icon: "\uD83D\uDD52",
        label: "Режим работы",
        value: "Пн-Пт: 09:00 - 18:00",
    },
];

const socialLinks = [
    { name: "Telegram", href: "#" },
    { name: "WhatsApp", href: "#" },
    { name: "VK", href: "#" },
];

export default function ContactsPage() {
    return (
        <main className="min-h-screen">
            <HeroSection
                eyebrow="Контакты"
                title="Давайте обсудим ваш проект"
                subtitle="Оставьте заявку, и мы свяжемся с вами в течение 24 часов. Или выберите удобный способ связи ниже."
            />

            {/* Form + Info */}
            <section className="px-6 pb-24">
                <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>

                    <div className="space-y-8 lg:col-span-2">
                        <ContactInfo items={contactItems} />

                        {/* Social Links */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                Мы в соцсетях
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map placeholder */}
            <section className="border-t border-white/10">
                <div className="relative h-80 w-full bg-white/5">
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center">
                            <p className="text-4xl text-white/10">{"\uD83D\uDDFA\uFE0F"}</p>
                            <p className="mt-4 text-sm text-white/30">
                                Здесь будет карта
                            </p>
                            <p className="mt-1 text-xs text-white/20">
                                г. Москва, ул. Тверская, д. 1
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-6 py-24">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-12 text-center">
                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                            FAQ
                        </p>
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Частые вопросы
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Сколько стоит разработка проекта?",
                                a: "Стоимость зависит от сложности и объёма работ. Оставьте заявку, и мы подготовим индивидуальное предложение в течение 2 рабочих дней.",
                            },
                            {
                                q: "Какие сроки разработки?",
                                a: "Типичный проект занимает от 4 до 12 недель. Точные сроки определяются после анализа требований и составления технического задания.",
                            },
                            {
                                q: "Предоставляете ли вы поддержку после запуска?",
                                a: "Да, мы предлагаем пакеты технической поддержки и сопровождения. Также первый месяц после запуска гарантийная поддержка включена в стоимость.",
                            },
                            {
                                q: "С какими технологиями вы работаете?",
                                a: "React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB и другие современные технологии. Стек подбирается индивидуально под задачи проекта.",
                            },
                        ].map((item) => (
                            <div
                                key={item.q}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                            >
                                <h3 className="text-sm font-semibold text-white">
                                    {item.q}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/60">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
