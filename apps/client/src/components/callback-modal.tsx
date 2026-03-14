"use client";

import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from "react";
import { useModal } from "@/src/providers/modal-provider";

type FormStatus = "idle" | "loading" | "success" | "error";

function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "");

    // Always work with 11-digit Russian number (7 + 10 digits)
    // Strip leading 7 or 8 to normalize
    let normalized = digits;
    if (normalized.startsWith("7") || normalized.startsWith("8")) {
        normalized = normalized.slice(1);
    }

    // Cap at 10 digits after country code
    normalized = normalized.slice(0, 10);

    if (normalized.length === 0) return "+7 ";
    if (normalized.length <= 3) return `+7 (${normalized}`;
    if (normalized.length <= 6) return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3)}`;
    if (normalized.length <= 8) return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`;
    return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6, 8)}-${normalized.slice(8)}`;
}

function getDigitCount(formatted: string): number {
    const digits = formatted.replace(/\D/g, "");
    // Subtract country code "7"
    if (digits.startsWith("7") || digits.startsWith("8")) {
        return digits.length - 1;
    }
    return digits.length;
}

export function CallbackModal() {
    const { closeModal, telegramBotUrl } = useModal();
    const [phone, setPhone] = useState("+7 ");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input on mount & lock body scroll
    useEffect(() => {
        inputRef.current?.focus();
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Close on Escape
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") closeModal();
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeModal]);

    function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value;

        // If user tries to clear everything, keep +7 prefix
        if (raw.replace(/\D/g, "").length === 0) {
            setPhone("+7 ");
            return;
        }

        setPhone(formatPhone(raw));
        if (status === "error") setStatus("idle");
    }

    const digitCount = getDigitCount(phone);
    const isPhoneComplete = digitCount === 10;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!isPhoneComplete) {
            setStatus("error");
            setErrorMessage("Введите полный номер телефона (10 цифр)");
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

    const tgUrl = telegramBotUrl || "https://t.me/m013stbot";

    return (
        <div className="animate-modal-overlay fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop — click closes modal */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeModal}
            />

            {/* Modal */}
            <div className="animate-modal-content relative w-full max-w-md rounded-2xl border border-white/10 bg-[#383838] p-8 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white"
                    aria-label="Закрыть"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {status === "success" ? (
                    <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white">Заявка отправлена!</h3>
                        <p className="mt-2 text-sm text-white/50">
                            Мы перезвоним вам в ближайшее время
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-6 rounded-xl bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
                        >
                            Закрыть
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-white">Обратный звонок</h3>
                        <p className="mt-1 text-sm text-white/50">
                            Оставьте номер и мы перезвоним вам
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6">
                            <div>
                                <input
                                    ref={inputRef}
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="+7 (___) ___-__-__"
                                    className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:bg-white/10 ${
                                        status === "error"
                                            ? "border-red-400/50 focus:border-red-400"
                                            : "border-white/10 focus:border-white/30"
                                    }`}
                                />
                                {status === "error" ? (
                                    <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
                                ) : (
                                    <p className="mt-2 text-xs text-white/30">
                                        {digitCount}/10 цифр
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading" || !isPhoneComplete}
                                className="mt-4 w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                            >
                                {status === "loading" ? "Отправка..." : "Перезвоните мне"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-xs text-white/30">или</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        {/* Telegram */}
                        <a
                            href={tgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                            Написать в Telegram
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
