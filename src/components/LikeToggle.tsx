import { Heart, LoaderCircle } from "lucide-react";
import { Puppy } from "../types";
import { Dispatch, SetStateAction, useState } from "react";
import { toggleLikedStatus } from "../queries";


export function LikeToggle ({ 
    puppy, 
    setPuppies, 
}: { 
    puppy: Puppy;
    setPuppies: Dispatch<SetStateAction<Puppy[]>>;
 }) {

    const [pending, setPending] = useState(false);

    return (
        <button 
            className="group" 
            // click button
            onClick={async () => {

                setPending(true);

                const updatedPuppy = await toggleLikedStatus(puppy.id);

                setPuppies((prevPups) => {
                    return prevPups.map((puppy) =>
                    
                        puppy.id === updatedPuppy.id ? updatedPuppy : puppy,
                    );
                });
                setPending(false);
                // Setting time buffer of 1.5s when user likes a post
                // setTimeout(() => {

                //     // if puppy is already liked, remove liked state
                //     if (liked.includes(id)) {
                //         setLiked(liked.filter(pupId => pupId !== id));
                //     } else {
                //         // otherwise, add puppy to liked array
                //         setLiked([...liked, id]);
                //     }
                    
                //     setPending(false);
                // }, 1500);
            }}
            >

            {/* creating pending UI (progress indicator) */}
            {pending ? (
                <LoaderCircle className="animate-spin stroke-slate-300" />
             ) : (

                <Heart 
                    className={
                        puppy.likedBy.includes(1)
                        // setting styles for like button 
                        ? "fill-pink-500 stroke-none"
                        : "stroke-slate-200 group-hover:stroke-slate-300"
                    }
                />
            )}
        </button>
    );
}