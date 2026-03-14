"use client";

import { useModal } from "@/src/providers/modal-provider";
import type { ReactNode } from "react";

type CallbackButtonProps = {
    children: ReactNode;
    className?: string;
};

export function CallbackButton({ children, className }: CallbackButtonProps) {
    const { openModal } = useModal();

    return (
        <button
            type="button"
            onClick={() => openModal("callback")}
            className={className}
        >
            {children}
        </button>
    );
}
