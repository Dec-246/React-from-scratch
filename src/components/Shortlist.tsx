import React from "react";
import { type Puppy } from "../types";


// export function Shortlist() {
//   return (
//     <div>
//       <h2 className="flex items-center gap-2 font-medium">
//         <span>Your shortlist</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width={24}
//           height={24}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={2}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="lucide lucide-heart inline-block size-6 fill-pink-500 stroke-pink-500"
//         >
//           <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//         </svg>
//       </h2>

//       <ul className="mt-4 flex flex-wrap gap-4">
//         <li className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">
//           <img
//             height={32}
//             width={32}
//             alt="Chase"
//             className="aspect-square w-8 object-cover"
//             src="/images/2.jpg"
//           />
//           <p className="px-3 text-sm text-slate-800">Chase</p>
//           <button className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width={24}
//               height={24}
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-x size-4 stroke-slate-400 group-hover:stroke-red-400"
//             >
//               <path d="M18 6 6 18" />
//               <path d="m6 6 12 12" />
//             </svg>
//           </button>
//         </li>

//         <li className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">
//           <img
//             height={32}
//             width={32}
//             alt="Leia"
//             className="aspect-square w-8 object-cover"
//             src="/images/3.jpg"
//           />
//           <p className="px-3 text-sm text-slate-800">Leia</p>
//           <button className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width={24}
//               height={24}
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-x size-4 stroke-slate-400 group-hover:stroke-red-400"
//             >
//               <path d="M18 6 6 18" />
//               <path d="m6 6 12 12" />
//             </svg>
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }


// defining types for React component
export function Shortlist({ 
  id,
  puppies,
  liked,
}: { 
  id: Puppy["id"]
  puppies: Puppy[] // puppies list returns array of Puppy
  liked: Puppy["id"][] // receives liked value (number array)
}) {
  return (
    
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <h1><b>Shortlist</b></h1>
      {puppies.map((puppy) => (
        <LikedPuppyCard
        id= {puppy.id}
        key={puppy.id} 
        puppy={puppy} 
        liked={liked}  
        />
      ))}

    </ul>
  );
}

type LikedPuppyCardProps = {
  puppy: Puppy;
  id: Puppy["id"];
  liked: Puppy["id"][];
};

function LikedPuppyCard({ puppy, liked }: LikedPuppyCardProps) {
  if (liked.includes(puppy.id)) {
    return (
      <li key={puppy.id} className="overflow-clip rounded-lg bg-white shadow-md ring ring-black/5 hover:-translate-y-0.5">
            
            <img
              className="aspect-square object-cover"
              alt={puppy.name}
              src={puppy.imagePath}
              width={50}
              height={50}
            />
  
            <div className="gap flex items-center justify-between p-4 text-sm" style={{ width: 25, height:25}}>


              <div className="flex items-center gap-2">
                <p className="font-semibold">{puppy.name}</p>
                <span className="text-slate-300">·</span>
                <p className="text-slate-500">{puppy.vibe}</p>
              </div>
  
            </div>
      </li>
    )    
  } else {
    return;
  }
}