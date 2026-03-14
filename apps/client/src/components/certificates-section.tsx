import type { CertificateItem, CertificatesComponent } from "@/src/types/strapi";

type CertificatesSectionProps = {
    data?: CertificatesComponent | null;
};

const fallbackCertificates: CertificateItem[] = [
    { title: "ISO 9001:2015", issuer: "Bureau Veritas", year: "2023" },
    { title: "Microsoft Gold Partner", issuer: "Microsoft", year: "2024" },
    { title: "Google Cloud Partner", issuer: "Google", year: "2024" },
    { title: "Bitrix24 Gold Partner", issuer: "1С-Битрикс", year: "2023" },
    { title: "AWS Select Partner", issuer: "Amazon", year: "2024" },
    { title: "Сертификат ФСТЭК", issuer: "ФСТЭК России", year: "2023" },
];

export function CertificatesSection({ data }: CertificatesSectionProps) {
    const eyebrow = data?.eyebrow || "Сертификаты";
    const title = data?.title || "Подтверждённая экспертиза";
    const items = data?.items?.length ? data.items : fallbackCertificates;

    return (
        <section className="border-y border-white/10 bg-white/[0.02] px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        {title}
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((cert, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                        >
                            {/* Decorative corner */}
                            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/[0.03] transition group-hover:bg-white/[0.05]" />

                            {cert.image?.url ? (
                                <img
                                    src={cert.image.url}
                                    alt={cert.image.alternativeText || cert.title}
                                    className="mb-6 h-16 w-auto object-contain"
                                />
                            ) : (
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 transition group-hover:bg-white/15">
                                    <svg
                                        className="h-7 w-7 text-white/40"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                        />
                                    </svg>
                                </div>
                            )}

                            <h3 className="text-base font-semibold text-white">
                                {cert.title}
                            </h3>
                            {cert.issuer && (
                                <p className="mt-1 text-sm text-white/40">
                                    {cert.issuer}
                                </p>
                            )}
                            {cert.year && (
                                <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/30">
                                    {cert.year}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
