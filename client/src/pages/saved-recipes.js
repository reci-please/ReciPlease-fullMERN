import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";



export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();


    useEffect(() => {
        

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
                );
                const temp = response.data;
                setSavedRecipes(temp);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSavedRecipe();
    }, []);

   
    return (
        <div>
            <h1>Saved Recipes</h1>
            <ul>
            {savedRecipes.map((recipe) => 
                    <li key={recipe.id}>
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>
                    
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>{ recipe.servings} Servings</p>
                    <div className="instructions">
                        <h3>Ingredients:</h3>
                        

                        
                        <ul>
            {recipe.ingredients.map((ingredient) => 
                    <li key={ingredient.ingredientId}>
                        
                    <h4>{ingredient.ingredientId}</h4>
                    <p>{ingredient.quantity}</p>
                        
                    </li>
                )}
                        </ul>
                        <p>{recipe.instructions}</p>
                        </div>
                        <p>Cooking Time: {recipe.cookingTime}</p>
                    </li>
                )}
            </ul>
        </div>
    )

    /*
    return (
        <div>
            <h1> Saved Recipes </h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                    {savedRecipes.includes(recipe._id) && <h1> ALREADY SAVED</h1>}
                    <div>
                            <h2>{recipe.name}</h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                </li>
                ))}
                
            </ul>
        </div>)
        */
}