import React from "react";
import { type Puppy } from "../types";
import { Dispatch, SetStateAction } from "react";
import { Heart, X } from "lucide-react";
import { puppies } from "../data/puppies";
import { useLiked } from "../context/liked-context";


// defining types for React component
export function Shortlist({
  puppies,
}: { 
  puppies: Puppy[];
}) {

  const {liked, setLiked} = useLiked();

  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span><b>Shortlist</b></span>
        <Heart className="fill-pink-500 stroke-pink-500" />
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {puppies
        .filter(pup => liked
        .includes(pup.id))
        .map((puppy) => (
          <LikedPuppyCard
            id= {puppy.id}
            key={puppy.id} 
            puppy={puppy} 
            liked={liked}  
            setLiked={setLiked}
          />
        ))}

      </ul>
    </div>
  );
}

type LikedPuppyCardProps = {
  puppy: Puppy;
  id: Puppy["id"];
  liked: Puppy["id"][];
  setLiked: Dispatch<SetStateAction<Puppy["id"][]>>;
};

function LikedPuppyCard({ puppy, liked, setLiked }: LikedPuppyCardProps) {
  if (liked.includes(puppy.id)) {
    return (
      <li 
        key={puppy.id} 
        className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">
            
        <img
          className="aspect-square w-8 object-cover"
          alt={puppy.name}
          src={puppy.imagePath}
          width={32}
          height={32}
        />
            
        <p className="px-3 text-sm text-slate-800">{puppy.name}</p>

        <button 
        // receive puppy id, kepp all puppies except for one that matches ID aa we want to remove that one.
        onClick={() => setLiked(liked.filter((id) => id !== puppy.id))}
        className="group h-full border-1 border-slate-100 px-2 hover:bg-slate-100">

          {/* X refers to the class called 'x' in the Lucide React library */}
          <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" />
    
        </button>
      </li>
    );
  } 
}