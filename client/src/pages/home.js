import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';
import { SavedRecipes } from "./saved-recipes";



export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,] = useCookies(["access_token"]);
    const [numSaved, setNumSaved] = useState(0);

    const userID = useGetUserID();


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                const temp = response.data;
                setRecipes(temp);
                
            } catch (err) {
                console.error(err);
            }
        };

        const pushToArray = (response) => {
            for (let i = 0; i < response.length; i++) {
                if (!(savedRecipes.includes(response[i].id))) {
                    savedRecipes.push(response[i].id);
                }
                
            }
        }

        
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                pushToArray(response.data);
                setNumSaved(savedRecipes.length);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();

        if (cookies.access_token) { fetchSavedRecipe(); };
    }, []);


    

    const SaveRecipe = async (recipeID) => {
        try {

            const id = userID;
            const recipe = recipeID;

            await axios.put(`http://localhost:3001/recipes/saveRecipe/${id}/${recipe}`);
            const temp = savedRecipes;
            temp.push(recipeID);
            setSavedRecipes(temp);
            setNumSaved(numSaved + 1);
        } catch (err) {
            console.error(err);
        }
    }

    
    const isRecipeSaved = (id) => {
        let state = false;
        for (let i = 0; i < numSaved; i++) { 
            if (savedRecipes[i] === id) {
                state = true;
                break;
            }
        }

        return state;
    };

    return (
        <div>
            <h1> Recipes </h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                    {isRecipeSaved(recipe.id) && <h1> ALREADY SAVED</h1>}
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