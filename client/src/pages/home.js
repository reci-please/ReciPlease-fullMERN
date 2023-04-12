import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';
import { SavedRecipes } from "./saved-recipes";



export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies , ] = useCookies(["access_token"]);

    const userID = useGetUserID();


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
                
                
            } catch (err) {
                console.error(err);
            }
        };

        const pushToArray = (response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (!(savedRecipes.includes(response.data[i].id))) { 
                    savedRecipes.push(response.data[i].id);
                }
                
            }
            console.log(savedRecipes);
        }

        
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);

                pushToArray(response);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();

        if (cookies.access_token) { fetchSavedRecipe() };
    }, []);


    

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", { recipeID, userID },
                { headers: { authorization:  cookies.access_token} });
            setSavedRecipes(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    
    const isRecipeSaved = (id) => savedRecipes.includes(id);

    /*
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => 
                    <li key={recipe.id}>
                        {SavedRecipes.includes(recipe.id) && <h1>ALREADY SAVED</h1>}
                        <div>
                            <h2>{recipe.name}</h2>
                            <p>{recipe.authorId}</p>
                            <button>Save</button>
                        </div>
                        
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

    */

    return (
        <div>
            <h1> Recipes </h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                    {savedRecipes.includes(recipe.id) && <h1> ALREADY SAVED</h1>}
                    <div>
                            <h2>{recipe.name}</h2>
                            
                            <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe.id)}>
                                {isRecipeSaved(recipe) ? "Saved": "Save"}
                            </button>
                            
                    </div>
                    <div className="instructions">
                            <p>{recipe.instructions}</p>
                            <p>{recipe.id}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                </li>
                ))}
                
            </ul>
        </div>)
        
}