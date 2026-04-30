import {Rating} from "@/components/reui/rating"
import {useState} from "react";

type Props = {
    ratings: number;
}
export function Ratings({ratings}: Props) {
    const [rating, setRating] = useState(ratings)

    return (
        <div className=" flex w-full max-w-xs  items-center gap-4">
            <Rating
                rating={rating}
                onRatingChange={setRating}
            />
            <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-semibold">
                    {rating.toFixed(1)}
                </span>

                / 5
            </p>
        </div>
    )
}
