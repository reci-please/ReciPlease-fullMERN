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
                setSavedRecipes(response.data);
                console.log(response);
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
                            <p>{recipe.authorId}</p>
                            <button>Save</button>
                        </div>
                    <h4>Ingredients</h4>
                    <p>{recipe.ingredients}</p>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>{ recipe.servings}</p>
                        <div className="instructions">
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