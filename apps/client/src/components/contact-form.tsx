"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "");
    let normalized = digits;
    if (normalized.startsWith("7") || normalized.startsWith("8")) {
        normalized = normalized.slice(1);
    }
    normalized = normalized.slice(0, 10);

    if (normalized.length === 0) return "+7 ";
    if (normalized.length <= 3) return `+7 (${normalized}`;
    if (normalized.length <= 6) return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3)}`;
    if (normalized.length <= 8) return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`;
    return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6, 8)}-${normalized.slice(8)}`;
}

function getDigitCount(formatted: string): number {
    const digits = formatted.replace(/\D/g, "");
    if (digits.startsWith("7") || digits.startsWith("8")) return digits.length - 1;
    return digits.length;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
    const [phone, setPhone] = useState("+7 ");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const digitCount = getDigitCount(phone);
    const isPhoneComplete = digitCount === 10;

    function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value;
        if (raw.replace(/\D/g, "").length === 0) {
            setPhone("+7 ");
            return;
        }
        setPhone(formatPhone(raw));
        if (status === "error") setStatus("idle");
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!isPhoneComplete) {
            setStatus("error");
            setErrorMessage("Введите полный номер телефона");
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch("/api/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Произошла ошибка");
            }

            setStatus("success");
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Произошла ошибка");
        }
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                    Спасибо за обращение!
                </h3>
                <p className="mt-2 text-sm text-white/60">
                    Мы свяжемся с вами в ближайшее время.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
        >
            <div>
                <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-white/80"
                >
                    Телефон
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:bg-white/10 ${
                        status === "error"
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-white/30"
                    }`}
                />
                {status === "error" ? (
                    <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
                ) : (
                    <p className="mt-2 text-xs text-white/30">{digitCount}/10 цифр</p>
                )}
            </div>

            <button
                type="submit"
                disabled={status === "loading" || !isPhoneComplete}
                className="w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
            >
                {status === "loading" ? "Отправка..." : "Перезвоните мне"}
            </button>
        </form>
    );
}
