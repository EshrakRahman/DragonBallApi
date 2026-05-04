import { useState } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import type { Size } from "@/schemas/productSchema.ts";

type Props = { sizes?: Size[]; onSizeChange?: (sizeId: number | null) => void };

export default function ChooseSize({ sizes = [], onSizeChange }: Props) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    if (sizes.length === 0) return null;

    const handleSelect = (sizeId: number) => {
        setSelectedSize(sizeId);
        onSizeChange?.(sizeId);
    };

    return (
        <section className="choose-size flex flex-col gap-3">
            <p className="font-normal text-base text-black/60">Choose Size</p>
            <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                    <Badge
                        key={size.id}
                        onClick={() => handleSelect(size.id)}
                        className={`px-4 md:px-5 py-4 md:py-4 text-sm md:text-base cursor-pointer transition-colors ${
                            selectedSize === size.id
                                ? "bg-black text-white hover:bg-black/90"
                                : "bg-[#F0F0F0] text-black/60"
                        }`}
                    >
                        {size.name}
                    </Badge>
                ))}
            </div>
        </section>
    );
}
