import { Heart } from "lucide-react";
import * as React from "react";

export function LikeToggle () {
    const [isLiked, setIsLiked] = React.useState(false); // [state value, state setting function]
    const [count, setCount] = React.useState(0);

    function handleClick() {
        setIsLiked(!isLiked); // setting the like button to opposite of what it is
        setCount(count + 1); // set state on click
    }

    return (
        <button className="group flex items-center gap-1" onClick={handleClick}>
            <Heart 
            
            className={
                isLiked // setting styles for like button 
                  ? "fill-pink-500 stroke-none"
                  : "stroke-slate-200 group-hover:stroke-slate-300"
                }
            />

            <span>{count}</span>
        </button>
    )
}