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
  }, []);

  const [expandedRecipeID, setExpandedRecipeID] = useState("");

  const handleExpandRecipe = (recipeID) => {
    setExpandedRecipeID(recipeID === expandedRecipeID ? "" : recipeID);
  };

  return (
    <div className="container">
      <div className="left-column">
      <h1>Profile</h1>
      <h2>Username: {userName}</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82DN9JU-hbIhhkPR-AX8KiYzA4fBMVwjLAG82fz7GLg&s" alt="Default Profile Pic" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus
          ligula. Suspendisse nulla est, malesuada vitae tellus a, sagittis
          malesuada enim. Maecenas ac tellus congue, blandit risus ut, bibendum
          leo. Nulla varius felis vel neque aliquam eleifend. Mauris quis nisi
          id urna luctus mollis. Your Bio Here ^^
        </p>
      </div>
      <div className="right-column">
        <h2>Recipes Authored:</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <div
                className="recipe-header"
                onClick={() => handleExpandRecipe(recipe.id)}
              >
                <img src={recipe.imageUrl} alt={recipe.name} />
                <h3>{recipe.name}</h3>
                <button>+</button>
              </div>
              {expandedRecipeID === recipe.id && (
                <div className="recipe-details">
                  <p>Servings: {recipe.servings}</p>
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.ingredientId}>
                        {ingredient.ingredientId} -- {ingredient.quantity}
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
    </div>
  );
};
