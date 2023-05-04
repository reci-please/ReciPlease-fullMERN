
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../../components/rating";
import Dropdown from "../../components/dropdown";



export const FullRecipe = () => {
    
    const id = useParams().recipeId.toString();
    const [currRecipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const options = [
        { value: "beginner", label: "beginner" },
        { value: "intermediate", label: "intermediate" },
        { value: "advanced", label: "advanced" }
      ];

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                
                
                const recipe = await axios.get(`https://reciplease-j0mk.onrender.com/recipes/recipeId/${id}`);
                //const recipe = await axios.get(`http://localhost:3001/recipes/recipeId/${id}`);
                setRecipe(recipe.data);
                setIngredients(recipe.data.ingredients);
            } catch (err) {
                console.err(err);
            }
            
        };

        fetchRecipe();
    }, []);

    


    return (
        <div className="recipes">
            <Dropdown placeHolder="Select skill level" options={options} />
            <h1>{currRecipe.name}</h1>
            <img src={currRecipe.imageUrl} alt="whatever the food is" />
            <p>Time: { currRecipe.cookingTime} minutes</p>
            <p>Cooking Skill: {currRecipe.skillLvl}</p>
            <h2>Servings: {currRecipe.servings}</h2>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredientId}>
                        <p>{ingredient.ingredientId} : { ingredient.quantity}</p>
                    </li>
                
          
        ))}
            </ul>
            <h3>Instructions</h3>
            <p>{currRecipe.instructions}</p>
            <Rating />

        </div>
    );
};