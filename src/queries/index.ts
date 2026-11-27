import { Puppy } from "../types";

// TODO: Fetch puppies from an API
export async function getPuppies() {

      try {
        const response = await fetch("http://127.0.0.1:8000/api/puppies", {
          headers: {
            accept: "application/json",
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
        }

        const {data} = await response.json();
        
        // set them to state
        return data;
      } catch (error) {
        throw (error);
      }
}

export async function toggleLikedStatus(id: Puppy["id"]) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/puppies/${id}/like`, 
      {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const { data } = await response.json();
    return data;
    
  } catch (error) {
    throw error;
  }
}