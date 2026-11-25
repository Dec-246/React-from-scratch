import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { puppies as puppiesData} from "./data/puppies";
import { type Puppy } from "./types";

import { useEffect, useState } from "react";
import { LikedContext } from "./context/liked-context";
import { LoaderCircle } from "lucide-react";

export function App() {
  return (
    <PageWrapper>
      <Container>
        <Header />
        <Main />
      </Container>
    </PageWrapper>
  );
}

function Main() {

// PASSING ARRAY OF PUPPY IDs
    // define 'liked puppies' state
  const [liked, setLiked] = useState<Puppy["id"][]>([1, 3]); // array of (number type) puppies liked

  // created search query string, passed it to search and puppy list
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [puppies, setPuppies] = useState<Puppy[]>(puppiesData);


  return (
    <main>
      <ApiPuppies />
      <LikedContext value={{ liked, setLiked }}>

        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist puppies={puppies} />
        </div>

        {/* passing state to component */}
        <PuppiesList searchQuery={searchQuery} puppies={puppies} /> 
      </LikedContext>

      <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
    </main>
  );
}

function ApiPuppies () {
  const [apiPuppies, setApiPuppies] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  useEffect(
    () => {
    // TODO: Fetch puppies from an API
    async function getPuppies() {
      setIsLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/puppies');
        
        if (!response.ok) {
          const errorData = await response.json();
          setError(`${errorData.message}: ${errorData.details}`);
          throw errorData;
        }

        const data = await response.json();
        
        // set them to state
        setApiPuppies(data.data);

      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    getPuppies();
  }, 
  [
    // define when to re-run the effect
  ],
);

return (
    <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
      {isLoading && <LoaderCircle className="animate-spin stroke-slate-300" />}
      {apiPuppies.length > 0 && (
        <pre>{JSON.stringify(apiPuppies, null, 2)}</pre>
      )}

      {error && <p className="text-red-500">{error}</p>}

    </div>
  );
}