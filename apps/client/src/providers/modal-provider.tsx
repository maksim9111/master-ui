"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CallbackModal } from "@/src/components/callback-modal";

export type ModalType = "callback" | null;

type ModalContextValue = {
    activeModal: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
    telegramBotUrl: string | null;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}

type ModalProviderProps = {
    children: ReactNode;
    telegramBotUrl?: string | null;
};

export function ModalProvider({ children, telegramBotUrl }: ModalProviderProps) {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = useCallback((type: ModalType) => {
        setActiveModal(type);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    return (
        <ModalContext.Provider
            value={{ activeModal, openModal, closeModal, telegramBotUrl: telegramBotUrl ?? null }}
        >
            {children}
            {activeModal === "callback" && <CallbackModal />}
        </ModalContext.Provider>
    );
}
