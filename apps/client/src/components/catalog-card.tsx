import Link from "next/link";

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    badge?: string;
    imageUrl?: string;
    slug: string;
};

type CatalogCardProps = {
    product: Product;
};

function formatPrice(price: number) {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
    }).format(price);
}

export function CatalogCard({ product }: CatalogCardProps) {
    return (
        <Link
            href={`/catalog/${product.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
        >
            <div className="relative aspect-square overflow-hidden bg-white/5">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl text-white/10">
                        &#9744;
                    </div>
                )}
                {product.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                    {product.category}
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">
                    {product.name}
                </h3>
                <div className="mt-auto flex items-baseline gap-3 pt-4">
                    <span className="text-lg font-bold text-white">
                        {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm text-white/40 line-through">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
