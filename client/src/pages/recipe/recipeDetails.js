
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const FullRecipe = () => {
    
    const id = useParams().recipeId.toString();
    const [currRecipe, setRecipe] = useState(null);
    console.log(id);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipe = await axios.get("https://reciplease-j0mk.onrender.com/recipes/recipes/recipeId", id);
                console.log(recipe);
                setRecipe(recipe);
            } catch (err) {
                console.err(err);
            }
            
        }
    }, []);

    


    return (
        <div className="recipes">
            <h1>{ id }</h1>
        </div>
    );
};