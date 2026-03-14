import Script from "next/script";
import { fetchStrapi } from "@/src/lib/strapi";
import type {
    GlobalSettings,
    HomePage,
    StrapiSingleResponse,
} from "@/src/types/strapi";
import type { Metadata } from "next";
import { HeroBanner } from "@/src/components/hero-banner";
import { AboutSection } from "@/src/components/about-section";
import { BrandsSection } from "@/src/components/brands-section";
import { FaqSection } from "@/src/components/faq-section";
import { CertificatesSection } from "@/src/components/certificates-section";
import { DeliveryMap } from "@/src/components/delivery-map";
import { ContactSection } from "@/src/components/contact-section";

const PUBLIC_STRAPI_URL =
    process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

function getStrapiMediaUrl(url?: string | null) {
    if (!url) return undefined;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${PUBLIC_STRAPI_URL}${url}`;
}

async function getGlobal() {
    return fetchStrapi<StrapiSingleResponse<GlobalSettings>>(
        "/api/global"
    );
}

async function getHomePage() {
    return fetchStrapi<StrapiSingleResponse<HomePage>>(
        "/api/home-page"
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const homeRes = await getHomePage();
    const home = homeRes.data;
    const seo = home.seo;

    const ogImageUrl = getStrapiMediaUrl(seo?.ogImage?.url);

    return {
        title:
            seo?.metaTitle ||
            home.hero?.title ||
            home.title ||
            "Главная страница",
        description:
            seo?.metaDescription ||
            home.hero?.subtitle ||
            home.subtitle ||
            "",
        keywords: seo?.keywords || "",
        robots: seo?.robots || "index,follow",
        alternates: seo?.canonicalUrl
            ? { canonical: seo.canonicalUrl }
            : undefined,
        openGraph: {
            title:
                seo?.ogTitle ||
                seo?.metaTitle ||
                home.hero?.title ||
                home.title ||
                "",
            description:
                seo?.ogDescription ||
                seo?.metaDescription ||
                home.hero?.subtitle ||
                home.subtitle ||
                "",
            images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        },
        twitter: {
            card: ogImageUrl ? "summary_large_image" : "summary",
            title:
                seo?.ogTitle ||
                seo?.metaTitle ||
                home.hero?.title ||
                home.title ||
                "",
            description:
                seo?.ogDescription ||
                seo?.metaDescription ||
                home.hero?.subtitle ||
                home.subtitle ||
                "",
            images: ogImageUrl ? [ogImageUrl] : [],
        },
    };
}

export default async function Home() {
    const [globalRes, homeRes] = await Promise.all([
        getGlobal(),
        getHomePage(),
    ]);

    const global = globalRes.data;
    const home = homeRes.data;
    const seo = home.seo;

    const jsonLd =
        seo?.jsonLd && typeof seo.jsonLd === "object"
            ? JSON.stringify(seo.jsonLd)
            : null;

    return (
        <>
            {jsonLd ? (
                <Script
                    id="home-jsonld"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: jsonLd }}
                />
            ) : null}

            <main className="min-h-screen">
                {/* Hero */}
                <HeroBanner hero={home.hero} global={global} />

                {/* About Company */}
                <AboutSection />

                {/* Delivery Map */}
                <DeliveryMap />

                {/* Partners */}
                <BrandsSection brands={home.partners} />

                {/* FAQ */}
                <FaqSection />

                {/*/!* Certificates *!/*/}
                {/*<CertificatesSection />*/}

                {/* Contact Form */}
                <ContactSection global={global} />
            </main>
        </>
    );
}
