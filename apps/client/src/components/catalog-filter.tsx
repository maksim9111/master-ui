"use client";

type CatalogFilterProps = {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
};

export function CatalogFilter({
    categories,
    activeCategory,
    onCategoryChange,
}: CatalogFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                        activeCategory === category
                            ? "border-white bg-white text-black"
                            : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
