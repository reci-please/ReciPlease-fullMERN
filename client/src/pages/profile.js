import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useGetUserName } from "../hooks/getGetUserName";
import "./profile.css"; // import the CSS file


export const Profile = () => {
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
  const userName = useGetUserName();

  useEffect(() => {
    const fetchAuthoredRecipes = async () => {
    console.log("in profile, userName is ")
    console.log(userName)
      try {
        const response = await axios.get(
         // `http://localhost:3001/recipes/authoredRecipes/ids/${userID}`
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
          );
        console.log("Responsive recipes")
        console.log(response.data)
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
          setRecipes([]);
        }
        
        console.log("client side recipes")
        console.log(recipes)
      } catch (err) {
        console.error(err);
      }
    };
    fetchAuthoredRecipes();
  }, [userID]);

  const [expandedRecipeID, setExpandedRecipeID] = useState("");

  const handleExpandRecipe = (recipeID) => {
    setExpandedRecipeID(recipeID === expandedRecipeID ? "" : recipeID);
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      <h2>Username: {userName}</h2>
       <h2>Recipes Authored:</h2>
       <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <div
              className="recipe-header"
              onClick={() => handleExpandRecipe(recipe.id)}
            >
              <img
                className="recipe-image"
                src={recipe.imageUrl}
                alt={recipe.name}
              />
              <h3 style={{ float: "left", marginLeft: "10px", wordWrap: "break-word" }}>{recipe.name}</h3>              <button>+</button>
            </div>
            {expandedRecipeID === recipe.id && (
              <div className="recipe-details">
                <p>Servings: {recipe.servings}</p>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.ingredientId}>
                      {ingredient.quantity}
                      {ingredient.name}
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
