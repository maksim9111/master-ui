import Link from "next/link";
import type { FooterComponent, GlobalSettings, NavItem, SocialLink } from "@/src/types/strapi";

type FooterProps = {
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

export function Footer({ global }: FooterProps) {
    const footer: FooterComponent | undefined = Array.isArray(global.footer)
        ? global.footer[0]
        : global.footer ?? undefined;
    const logoUrl = getMediaUrl(global.logo?.url);

    return (
        <footer className="border-t border-white/10 bg-black/10">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        {logoUrl ? (
                            <Link href="/">
                                <img
                                    src={logoUrl}
                                    alt={global.logo?.alternativeText || global.siteName}
                                    className="h-auto w-27.5 object-contain"
                                />
                            </Link>
                        ) : null}
                        {global.siteDescription ? (
                            <p className="mt-3 text-sm text-white/70">{global.siteDescription}</p>
                        ) : null}
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                            Меню
                        </p>
                        <nav className="mt-4 flex flex-col gap-3">
                            {footer?.menuItems?.map((item: NavItem, index: number) => (
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

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                            Контакты
                        </p>

                        <div className="mt-4 space-y-3 text-sm text-white/80">
                            {global.phone ? <p>{global.phone}</p> : null}
                            {global.secondaryPhone ? <p>{global.secondaryPhone}</p> : null}
                            {global.email ? <p>{global.email}</p> : null}
                            {global.address ? <p>{global.address}</p> : null}
                            {global.workHours ? <p>{global.workHours}</p> : null}
                        </div>

                        {footer?.socialLinks?.length ? (
                            <div className="mt-5 flex flex-wrap gap-3">
                                {footer.socialLinks.map((item: SocialLink, index: number) => (
                                    <a
                                        key={`${item.href}-${index}`}
                                        href={item.href}
                                        className="text-sm text-white/80 transition hover:text-white"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
                    {footer?.copyright || `© ${new Date().getFullYear()} ${global.siteName}`}
                </div>
            </div>
        </footer>
    );
}
