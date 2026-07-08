
import { Rating } from "@/components/reui/rating.tsx";
import type { Review } from "@/schemas/productSchema.ts";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
    review: Review;
};

export default function ReviewCard({ review }: Props) {
    const getInitials = (name?: string | null) => {
        if (!name) return "VC";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <article className="group relative flex flex-col justify-between rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-200 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-4">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                    <Rating rating={review.rating} size="sm" />
                    <span className="text-[11px] font-medium text-zinc-400">
                        {review.created_at ? review.created_at.split(" ")[0] : ""}
                    </span>
                </div>

                {/* Review Content */}
                <div>
                    {review.title && (
                        <h4 className="font-primary text-base font-bold text-zinc-900 mb-1 leading-tight group-hover:text-primary transition-colors duration-300">
                            {review.title}
                        </h4>
                    )}
                    <p className="font-primary text-sm leading-relaxed text-zinc-600 line-clamp-4">
                        "{review.body}"
                    </p>
                </div>
            </div>

            {/* User and Product Info Footer */}
            <div className="mt-6 flex flex-col gap-4 border-t border-zinc-50 pt-4">
                {/* User Details */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 text-[13px] font-bold text-white shadow-inner">
                        {getInitials(review.user_name)}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-primary text-sm font-semibold text-zinc-900">
                                {review.user_name || "Verified Customer"}
                            </span>
                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <Check className="h-2 w-2 stroke-[3]" />
                            </span>
                        </div>
                        <span className="text-[11px] font-medium text-zinc-400">Verified Buyer</span>
                    </div>
                </div>

                {/* Associated Product Link */}
                {review.product && (
                    <Link
                        to={`/products/${review.product.slug}`}
                        className="flex items-center justify-between rounded-xl bg-zinc-50 p-2.5 transition-colors duration-200 hover:bg-zinc-100 group/link"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            {review.product.image ? (
                                <img
                                    src={review.product.image}
                                    alt={review.product.name}
                                    className="h-8 w-8 rounded-lg object-cover border border-zinc-200"
                                />
                            ) : (
                                <div className="h-8 w-8 rounded-lg bg-zinc-200" />
                            )}
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Reviewed Product</p>
                                <p className="truncate text-xs font-semibold text-zinc-800">{review.product.name}</p>
                            </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-zinc-800 shrink-0 ml-2" />
                    </Link>
                )}
            </div>
        </article>
    );
}