export type StrapiMedia = {
    id: number;
    documentId?: string;
    url: string;
    alternativeText?: string | null;
    name?: string;
    width?: number;
    height?: number;
};

export type StrapiSingleResponse<T> = {
    data: T;
    meta: Record<string, unknown>;
};

export type NavItem = {
    id?: number;
    label: string;
    href: string;
};

export type SocialLink = {
    id?: number;
    label: string;
    href: string;
    iconName?: string;
};

export type FooterComponent = {
    id?: number;
    menuItems?: NavItem[];
    socialLinks?: SocialLink[];
    copyright?: string;
};

export type SeoComponent = {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    robots?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: StrapiMedia | null;
    jsonLd?: Record<string, unknown> | null;
};

export type HeroComponent = {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    phoneLabel?: string;
    phoneValue?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
};

export type AboutCompanyComponent = {
    id?: number;
    eyebrow?: string;
    title?: string;
    description?: string;
    features?: { icon?: string; title: string; description: string }[];
    image?: StrapiMedia | null;
    stats?: { value: string; label: string }[];
};

export type BrandItem = {
    id?: number;
    alt?: string | null;
    logo?: StrapiMedia | null;
};

export type LogoBrandsComponent = {
    id?: number;
    eyebrow?: string;
    title?: string;
    partners?: BrandItem[];
};

export type FaqItem = {
    id?: number;
    question: string;
    answer: string;
};

export type FaqComponent = {
    id?: number;
    eyebrow?: string;
    title?: string;
    items?: FaqItem[];
};

export type CertificateItem = {
    id?: number;
    title: string;
    issuer?: string;
    year?: string;
    image?: StrapiMedia | null;
};

export type CertificatesComponent = {
    id?: number;
    eyebrow?: string;
    title?: string;
    items?: CertificateItem[];
};

export type DeliveryMapComponent = {
    id?: number;
    eyebrow?: string;
    title?: string;
    description?: string;
    regions?: { name: string; isActive?: boolean }[];
};

export type ContactFormComponent = {
    id?: number;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
};

export type GlobalSettings = {
    id: number;
    documentId: string;
    siteName: string;
    siteDescription: string;
    phone?: string;
    secondaryPhone?: string | null;
    email?: string | null;
    address?: string | null;
    workHours?: string | null;
    telegramBotUrl?: string | null;
    logo?: StrapiMedia | null;
    favicon?: StrapiMedia | null;
    header?: HeaderComponent | null;
    footer?: FooterComponent | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type HomePage = {
    id: number;
    documentId: string;
    title?: string;
    subtitle?: string;
    seo?: SeoComponent | null;
    hero?: HeroComponent | null;
    partners?: BrandItem[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type HeaderComponent = {
    id?: number;
    menuItems?: NavItem[];
    ctaText?: string;
    ctaLink?: string;
};

export type CallbackRequest = {
    id: number;
    documentId: string;
    phone: string;
    source?: string | null;
    createdAt: string;
};
