import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { puppies as puppiesData} from "./data/puppies";
import { type Puppy } from "./types";

import { useState } from "react";
import { LikedContext } from "./context/liked-context";

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
  const [searchQuery, setSearchQuery] = useState<string>("hello");

  const [puppies, setPuppies] = useState<Puppy[]>(puppiesData);


  return (
    <main>
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