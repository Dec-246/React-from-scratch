import { Heart, LoaderCircle } from "lucide-react";
import { type Puppy } from "../types";
import { useLiked } from "../context/liked-context";
import { useState } from "react";


export function LikeToggle ({
    id,
}: {
    id: Puppy["id"];
}) {

    const { liked, setLiked } = useLiked();
    const [pending, setPending] = useState(false);

    return (
        <button 
            className="group" 
            // click button
            onClick={() => {

                setPending(true);

                // Setting time buffer of 1.5s when user likes a post
                setTimeout(() => {

                    // if puppy is already liked, remove liked state
                    if (liked.includes(id)) {
                        setLiked(liked.filter(pupId => pupId !== id));
                    } else {
                        // otherwise, add puppy to liked array
                        setLiked([...liked, id]);
                    }
                    
                    setPending(false);
                }, 1500);
 
            }}
            >

            {/* creating pending UI (progress indicator) */}
            {pending ? (
                <LoaderCircle className="animate-spin stroke-slate-300" />
             ) : (

                <Heart 
                    className={
                        liked.includes(id) // does liked array inlude puppy ID
                        // setting styles for like button 
                        ? "fill-pink-500 stroke-none"
                        : "stroke-slate-200 group-hover:stroke-slate-300"
                    }
                />

            )}
        </button>
    );
}