import Link from "next/link";
import type { GlobalSettings, HeaderComponent, NavItem } from "@/src/types/strapi";
import { CallbackButton } from "@/src/components/callback-button";

type HeaderProps = {
    global: GlobalSettings;
};

function getMediaUrl(url?: string | null) {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;

    const baseUrl =
        process.env.NEXT_PUBLIC_CMS_URL ||
        process.env.NEXT_PUBLIC_STRAPI_URL ||
        "http://localhost:1337";

    return `${baseUrl}${url}`;
}

export function Header({ global }: HeaderProps) {
    const header: HeaderComponent | undefined = global.header ?? undefined;
    const logoUrl = getMediaUrl(global.logo?.url);

    return (
        <header className="border-b border-white/10 bg-black/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={global.logo?.alternativeText || global.siteName}
                                className="h-auto w-27.5 object-contain"
                            />
                        ) : (
                            <span className="text-lg font-semibold text-white">
      {global.siteName}
    </span>
                        )}
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        {header?.menuItems?.map((item: NavItem, index: number) => (
                            <Link
                                key={`${item.href}-${index}`}
                                href={item.href}
                                className="text-sm text-white/80 transition hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {global.phone ? (
                        <a
                            href={`tel:${global.phone.replace(/[^\d+]/g, "")}`}
                            className="hidden text-sm text-white/80 transition hover:text-white md:inline"
                        >
                            {global.phone}
                        </a>
                    ) : null}

                    {header?.ctaText && header?.ctaLink ? (
                        header.ctaLink === "#callback" || header.ctaLink === "#lead-form" ? (
                            <CallbackButton
                                className="inline-flex rounded-xl bg-[#F3DF3A] px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
                            >
                                {header.ctaText}
                            </CallbackButton>
                        ) : (
                            <Link
                                href={header.ctaLink}
                                className="inline-flex rounded-xl bg-[#F3DF3A] px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
                            >
                                {header.ctaText}
                            </Link>
                        )
                    ) : null}
                </div>
            </div>
        </header>
    );
}