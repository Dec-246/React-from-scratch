import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { puppies as puppiesData} from "./data/puppies";
import { type Puppy } from "./types";

import { Suspense, use, useEffect, useState } from "react";
import { LikedContext } from "./context/liked-context";
import { LoaderCircle } from "lucide-react";
import { getPuppies } from "./queries";
import { ErrorBoundary } from "react-error-boundary";

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
        <ErrorBoundary 
        fallbackRender={({ error }) => (
          // if error, red box
          <div className="mt-12 bg-red p-6 shadow ring ring-black/5">
            <p className="text-red-500">
              {error.message}: {error.details}
            </p>
          </div>
        )}
        >

          {/* using fallback prop to provide loading indicator whilst data loads */}
          <Suspense 
            fallback={
              // whilst loading, white box
              <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
                <LoaderCircle className="animate-spin stroke-slate-300" />
              </div>
          }>

            <ApiPuppies />
          </Suspense>
        </ErrorBoundary>
      
      <LikedContext value={{ liked, setLiked }}>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist liked={liked} setLiked={setLiked} puppies={puppies} />
        </div>

        {/* passing state to component */}
        <PuppiesList 
          searchQuery={searchQuery} 
          puppies={puppies}
          liked={liked} 
          setLiked={setLiked} 
        /> 
      </LikedContext>

      <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
    </main>
  );
}

const puppyPrmoise = getPuppies();

function ApiPuppies () {
  const apiPuppies = use(puppyPrmoise);
  return (
    // if succeeds, green box
    <div className="mt-12 bg-green p-6 shadow ring ring-black/5">
      <pre>{JSON.stringify(apiPuppies, null, 2)}</pre>
    </div>
  ); 
}