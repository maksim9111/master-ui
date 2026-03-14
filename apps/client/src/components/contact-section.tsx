import type { ContactFormComponent, GlobalSettings } from "@/src/types/strapi";
import { ContactForm } from "./contact-form";

type ContactSectionProps = {
    data?: ContactFormComponent | null;
    global: GlobalSettings;
};

export function ContactSection({ data, global }: ContactSectionProps) {
    const eyebrow = data?.eyebrow || "Обратная связь";
    const title = data?.title || "";
    const subtitle =
        data?.subtitle ||
        "Оставьте заявку для консультации.";

    return (
        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Text + contacts */}
                    <div className="flex flex-col justify-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                            {eyebrow}
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                            {title}
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-white/50">
                            {subtitle}
                        </p>


                    </div>

                    {/* Form */}
                    <div>
                        <ContactForm />
                    </div>
                    <div className="space-y-6">
                        {global.phone && (
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                                    <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.15em] text-white/30">Телефон</p>
                                    <a
                                        href={`tel:${global.phone.replace(/[^\d+]/g, "")}`}
                                        className="text-base font-semibold text-white transition hover:text-white/80"
                                    >
                                        {global.phone}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
