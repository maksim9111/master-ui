type ContactInfoItem = {
    icon: string;
    label: string;
    value: string;
    href?: string;
};

type ContactInfoProps = {
    items: ContactInfoItem[];
};

export function ContactInfo({ items }: ContactInfoProps) {
    return (
        <div className="space-y-6">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                        {item.icon}
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                            {item.label}
                        </p>
                        {item.href ? (
                            <a
                                href={item.href}
                                className="mt-1 block text-sm text-white transition hover:text-white/80"
                            >
                                {item.value}
                            </a>
                        ) : (
                            <p className="mt-1 text-sm text-white">{item.value}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
