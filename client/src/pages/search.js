import { useState, useEffect } from "react";
import axios from "axios";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/recipes`); //name=${searchTerm}
        console.log("Response: ");
        console.log(response);
        if (Array.isArray(response.data)) {
            setSearchResults(response.data);
        } else {
            console.error("API response is not an array");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.elements.search.value);
  };

  return (
    <div className="Search">
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search for recipes" />
        <button type="submit">Search</button>
      </form>

      <h2>Search Results</h2>
      {searchResults.length === 0 && <p>No results found.</p>}
      {searchResults.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.instructions}</p>
          <img src={recipe.imageUrl} alt={recipe.name} />
          <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
        </div>
      ))}
    </div>
  );
};
