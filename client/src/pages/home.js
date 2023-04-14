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
                if (!(savedRecipes.includes(response.data[i].recipeId))) { 
                    savedRecipes.push(response.data[i].recipeId);
                }
                
            }
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


    

    const SaveRecipe = async (recipeID) => {
        try {

            const id = userID;
            const recipe = recipeID;

            await axios.put(`http://localhost:3001/recipes/saveRecipe/${id}/${recipe}`);
            const temp = savedRecipes;
            temp.push(recipeID);
            setSavedRecipes(temp);
        } catch (err) {
            console.error(err);
        }
    }

    
    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
            <h1> Recipes </h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                    {savedRecipes.includes(recipe.id) && <h1> ALREADY SAVED</h1>}
                    <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={() => SaveRecipe(recipe.id)} disabled={isRecipeSaved(recipe.id)}>
                                {isRecipeSaved(recipe.id) ? "Saved": "Save"}
                            </button>
                            
                    </div>
                    <div className="instructions">
                            
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <h5>Cooking Time: {recipe.cookingTime} (minutes)</h5>
                        <p>{recipe.instructions}</p>
                </li>
                ))}
                
            </ul>
        </div>)
        
}