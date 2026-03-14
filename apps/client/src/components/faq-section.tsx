"use client";

import { useState } from "react";
import type { FaqComponent } from "@/src/types/strapi";

type FaqSectionProps = {
    data?: FaqComponent | null;
};

const fallbackItems = [
    {
        question: "Как узнать точную цену на продукцию?",
        answer: "Вы можете отправить нам список нужных позиций, объёмы и параметры заказа. После этого мы подготовим точный расчёт и при необходимости подскажем более выгодные варианты по цене и комплектации.",
    },
    {
        question: "Как оформить доставку?",
        answer: "Оставьте номер телефона, и мы свяжемся с вами, чтобы уточнить детали заказа и согласовать доставку.",
    },
    {
        question: "За что предоставляются скидки?",
        answer: "Скидки могут зависеть от суммы заказа, объёма закупки, частоты заказов и формата сотрудничества. Точные условия рассчитываются индивидуально.",
    },
    {
        question: "Есть ли скидки для оптовых клиентов?",
        answer: "Да, для оптовых клиентов, постоянных партнёров и профессиональных монтажников могут действовать отдельные цены и персональные условия сотрудничества.",
    },
    {
        question: "Начисляются ли бонусы?",
        answer: "Да, бонусы начисляются при оплате наличными. 3% от вносимой суммы копится на вашем бонусном счёте.",
    },
    {
        question: "Как использовать бонусы?",
        answer: "Бонусами вы можете оплатить до 20% от стоимости заказа.",
    },
    {
        question: "Как вступить в программу лояльности?",
        answer: "Чтобы вступить в программу лояльности, достаточно оставить заявку или обратиться к менеджеру. Мы расскажем об условиях участия, доступных преимуществах и порядке подключения.",
    },
    {
        question: "Можно ли получить индивидуальные условия сотрудничества?",
        answer: "Да, если у вас регулярные заказы, крупные объёмы или вы работаете как партнёр, мы можем предложить персональные условия, специальные цены и дополнительные бонусы.",
    },
];

function FaqItem({
    question,
    answer,
    isOpen,
    onToggle,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 py-6 text-left transition"
            >
                <span className="text-base font-semibold text-white sm:text-lg">
                    {question}
                </span>
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-white/60 transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-white/10" : ""
                    }`}
                >
                    +
                </span>
            </button>
            <div
                className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <p className="max-w-3xl text-sm leading-relaxed text-white/50">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function FaqSection({ data }: FaqSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const eyebrow = data?.eyebrow || "FAQ";
    const title = data?.title || "Ответы на частые вопросы";
    const items = data?.items?.length ? data.items : fallbackItems;

    return (
        <section className="px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-4xl">
                <div className="mb-16 text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        {title}
                    </h2>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8">
                    {items.map((item, i) => (
                        <FaqItem
                            key={i}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === i}
                            onToggle={() =>
                                setOpenIndex(openIndex === i ? null : i)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
