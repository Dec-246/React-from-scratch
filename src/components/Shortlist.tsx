import { type Puppy } from "../types";
import { Dispatch, SetStateAction, useState } from "react";
import { Heart, LoaderCircle, X } from "lucide-react";
import { toggleLikedStatus } from "../queries";


// defining types for React component
export function Shortlist({ 
  puppies, 
  setPuppies 
}: { 
  puppies: Puppy[], 
  setPuppies: Dispatch<SetStateAction<Puppy[]>>; 
}) {
  
  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span><b>Shortlist</b></span>
        <Heart className="fill-pink-500 stroke-pink-500" />
      </h2>

      <ul className="mt-4 flex flex-wrap gap-4">
        {puppies
        .filter((pup) => pup.likedBy.includes(1))
        .map((puppy) => (
          <LikedPuppyCard
          key={puppy.id} 
          puppy={puppy} 
          setPuppies={setPuppies}
          />
        ))}
      </ul>
    </div>
  );
}

type LikedPuppyCardProps = {
  puppy: Puppy;
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
};

function LikedPuppyCard({ puppy, setPuppies }: LikedPuppyCardProps) {
  return (
    <li 
      key={puppy.id} 
      className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">

      <img
        className="aspect-square w-8 object-cover"
        alt={puppy.name}
        src={puppy.imageUrl}
        width={32}
        height={32}
      />

      <p className="px-3 text-sm text-slate-800">{puppy.name}</p>

      <DeleteButton id={puppy.id} setPuppies={setPuppies} />
    </li>
  );
}


function DeleteButton ({
  id, 
  setPuppies,
}: {
    id: Puppy["id"], 
    setPuppies: Dispatch<SetStateAction<Puppy[]>>; 
  }) {
  const [pending, setPending] = useState(false);

  return (
    <button 
          // receive puppy id, kepp all puppies except for one that matches ID aa we want to remove that one.
            onClick={async () => {
              setPending(true);
              const updatedPuppy = await toggleLikedStatus(id);
              setPuppies((prevPups) => {
                return prevPups.map((puppy) =>
                  puppy.id === updatedPuppy.id ? updatedPuppy : puppy,
                );
              });
              setPending(false);
            }}
              className="group h-full border-1 border-slate-100 px-2 hover:bg-slate-100"
              disabled={pending}
            >

              {pending ? (
                <LoaderCircle className="size-4 animate-spin stroke-slate-300" />
              ) : (
                <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" />

              )}
            {/* X refers to the class called 'x' in the Lucide React library */}
      
    </button>
  );
}