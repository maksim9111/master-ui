type HeroSectionProps = {
    eyebrow?: string;
    title: string;
    subtitle?: string;
};

export function HeroSection({ eyebrow, title, subtitle }: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden px-6 py-24 sm:py-32">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 to-transparent" />
            <div className="mx-auto max-w-4xl text-center">
                {eyebrow && (
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                        {eyebrow}
                    </p>
                )}
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
