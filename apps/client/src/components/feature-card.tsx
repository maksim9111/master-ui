type FeatureCardProps = {
    icon: string;
    title: string;
    description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
                {description}
            </p>
        </div>
    );
}
