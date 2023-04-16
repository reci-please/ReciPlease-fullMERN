import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/ids/${userID}`
        );
        setUsername(response.data.username);
        setRecipes(response.data.recipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [userID]);

  const [expandedRecipeID, setExpandedRecipeID] = useState("");

  const handleExpandRecipe = (recipeID) => {
    setExpandedRecipeID(recipeID === expandedRecipeID ? "" : recipeID);
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>Username: {username}</h2>
      <h2>Recipes Authored:</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <div
              className="recipe-header"
              onClick={() => handleExpandRecipe(recipe.id)}
            >
              <h3>{recipe.name}</h3>
              <button>+</button>
            </div>
            {expandedRecipeID === recipe.id && (
              <div className="recipe-details">
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Servings: {recipe.servings}</p>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.ingredientId}>
                      {ingredient.quantity} {ingredient.name}
                    </li>
                  ))}
                </ul>
                <h4>Instructions:</h4>
                <p>{recipe.instructions}</p>
                <p>Cooking Time: {recipe.cookingTime}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

//export default Profile;
