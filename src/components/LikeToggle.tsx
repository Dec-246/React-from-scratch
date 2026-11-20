import { Heart } from "lucide-react";
import { useState } from "react";

export function LikeToggle ({
    id,
    liked, 
    setLiked
}: {
    id: Puppy["id"];
    liked: Puppy["id"][];
    setLiked: Dispatch<SetStateAction<Puppy["id"][]>>;
}) {

    return (
        <button 
            className="group" 
            // click button
            onClick={() => {
                // if puppy is already liked, remove liked state
                if (liked.includes(id)) {
                    setLiked(liked.filter(pupId => pupId !== id));
                } else {
                    // otherwise, add puppy to liked array
                    setLiked([...liked, id]);
                }
            }}
            >
            <Heart 
            
            className={
                liked.includes(id) // does liked array inlude puppy ID
                // setting styles for like button 
                  ? "fill-pink-500 stroke-none"
                  : "stroke-slate-200 group-hover:stroke-slate-300"
                }
            />
        </button>
    );
}