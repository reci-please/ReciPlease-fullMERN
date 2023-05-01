
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const FullRecipe = () => {
    
    const id = useParams().recipeId.toString();
    const [currRecipe, setRecipe] = useState([]);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                
                
                const recipe = await axios.get(`https://reciplease-j0mk.onrender.com/recipes/recipeId/${id}`);
                
                //const recipe = await axios.get(`http://localhost:3001/recipes/recipeId`, {id});
                setRecipe(recipe.data);
            } catch (err) {
                console.err(err);
            }
            
        };

        fetchRecipe();
    }, []);

    


    return (
        <div className="recipes">
            <h1>{currRecipe.name}</h1>
            <img src={currRecipe.imageUrl} alt="whatever the food is" />
            <p>{ currRecipe.cookingTime} minutes</p>
            <p>{currRecipe.skillLvl}</p>
            <h2>Servings: {currRecipe.servings}</h2>
            <p>{currRecipe.instructions}</p>
        </div>
    );
};