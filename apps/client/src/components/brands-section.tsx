import type { BrandItem } from "@/src/types/strapi";

type BrandsSectionProps = {
    brands?: BrandItem[];
};

function getStrapiMediaUrl(url?: string | null) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;

    const baseUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
    return `${baseUrl}${url}`;
}

export function BrandsSection({ brands: brandItems }: BrandsSectionProps) {
    const eyebrow = "Партнёры";
    const title = "Нам доверяют ведущие компании";
    const brands = brandItems || [];

    if (!brands.length) {
        return null;
    }

    return (
        <section className="border-y border-white/10 bg-white/[0.02] px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/40">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        {title}
                    </h2>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 sm:grid-cols-3 lg:grid-cols-4">
                    {brands.map((brand, i) => {
                        const logoUrl = getStrapiMediaUrl(brand.logo?.url);

                        if (!logoUrl) return null;

                        return (
                            <div
                                key={brand.id ?? i}
                                className="flex items-center justify-center bg-white/[0.02] px-8 py-10 transition hover:bg-white/[0.05]"
                            >
                                <img
                                    src={logoUrl}
                                    alt={brand.alt || brand.logo?.alternativeText || "Логотип партнёра"}
                                    className="h-8 max-w-[140px] object-contain opacity-40 grayscale transition hover:opacity-70 hover:grayscale-0"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}