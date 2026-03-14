"use client";

import { useState } from "react";
import { HeroSection } from "@/src/components/hero-section";
import { CatalogCard, type Product } from "@/src/components/catalog-card";
import { CatalogFilter } from "@/src/components/catalog-filter";
import { useModal } from "@/src/providers/modal-provider";

const products: Product[] = [
    {
        id: 1,
        name: "Корпоративный сайт",
        category: "Веб-разработка",
        price: 250000,
        oldPrice: 320000,
        badge: "Популярное",
        slug: "corporate-website",
    },
    {
        id: 2,
        name: "Интернет-магазин",
        category: "Веб-разработка",
        price: 450000,
        badge: "Топ продаж",
        slug: "ecommerce",
    },
    {
        id: 3,
        name: "Мобильное приложение iOS",
        category: "Мобильная разработка",
        price: 800000,
        oldPrice: 950000,
        slug: "ios-app",
    },
    {
        id: 4,
        name: "Мобильное приложение Android",
        category: "Мобильная разработка",
        price: 750000,
        slug: "android-app",
    },
    {
        id: 5,
        name: "Кроссплатформенное приложение",
        category: "Мобильная разработка",
        price: 1200000,
        badge: "Премиум",
        slug: "cross-platform-app",
    },
    {
        id: 6,
        name: "UI/UX Дизайн",
        category: "Дизайн",
        price: 180000,
        slug: "ui-ux-design",
    },
    {
        id: 7,
        name: "Фирменный стиль",
        category: "Дизайн",
        price: 150000,
        oldPrice: 200000,
        slug: "brand-identity",
    },
    {
        id: 8,
        name: "CRM-система",
        category: "Веб-разработка",
        price: 600000,
        slug: "crm-system",
    },
    {
        id: 9,
        name: "SEO-оптимизация",
        category: "Маркетинг",
        price: 80000,
        slug: "seo-optimization",
    },
    {
        id: 10,
        name: "Контекстная реклама",
        category: "Маркетинг",
        price: 120000,
        oldPrice: 150000,
        badge: "Скидка",
        slug: "context-ads",
    },
    {
        id: 11,
        name: "Landing Page",
        category: "Веб-разработка",
        price: 90000,
        slug: "landing-page",
    },
    {
        id: 12,
        name: "SMM-продвижение",
        category: "Маркетинг",
        price: 100000,
        slug: "smm-promotion",
    },
];

const allCategories = [
    "Все",
    ...Array.from(new Set(products.map((p) => p.category))),
];

export default function CatalogPage() {
    const [activeCategory, setActiveCategory] = useState("Все");
    const { openModal } = useModal();

    const filtered =
        activeCategory === "Все"
            ? products
            : products.filter((p) => p.category === activeCategory);

    return (
        <main className="min-h-screen">
            <HeroSection
                eyebrow="Каталог"
                title="Наши услуги и решения"
                subtitle="Полный спектр digital-услуг для вашего бизнеса. От разработки до продвижения — всё в одном месте."
            />

            <section className="px-6 pb-24">
                <div className="mx-auto max-w-6xl">
                    {/* Filter */}
                    <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <CatalogFilter
                            categories={allCategories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                        <p className="text-sm text-white/40">
                            {filtered.length}{" "}
                            {filtered.length === 1
                                ? "услуга"
                                : filtered.length < 5
                                  ? "услуги"
                                  : "услуг"}
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((product) => (
                            <CatalogCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-lg text-white/40">
                                Нет услуг в этой категории
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/10 bg-white/5 px-6 py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Не нашли подходящее решение?
                    </h2>
                    <p className="mt-4 text-lg text-white/60">
                        Мы разработаем индивидуальное решение под ваши задачи.
                    </p>
                    <button
                        onClick={() => openModal("callback")}
                        className="mt-8 inline-flex rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
                    >
                        Обсудить проект
                    </button>
                </div>
            </section>
        </main>
    );
}
