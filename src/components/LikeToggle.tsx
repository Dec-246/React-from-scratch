import { Heart } from "lucide-react";
import { type Puppy } from "../types";
import { useLiked } from "../context/liked-context";


export function LikeToggle ({
    id,
}: {
    id: Puppy["id"];
}) {

    const { liked, setLiked } = useLiked();

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