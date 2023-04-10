import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';

export const Profile = () => {
    const userID = useGetUserID();

    const [username, setUsername] = useState("");
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes () {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        async function fetchUserData() {
            // const res = await something
            const data = await res.json();
            setUsername(data.username);
        }
        fetchData();
        fetchRecipes();
    }, []);


    return (
        <div className="Profile">
        <h1>Profile</h1>
        
        <p>Username: {username}</p>
        
        <h2>Created Recipes</h2>
        <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                    {savedRecipes.includes(recipe._id) && <h1> ALREADY SAVED</h1>}
                    <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                                {isRecipeSaved(recipe._id) ? "Saved": "Save"}
                            </button>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                </li>
                ))}
                
            </ul>
        
        </div>
    )

}