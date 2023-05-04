
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
        // <div className="recipes">
        //     <h1>{currRecipe.name}</h1>
        //     <img src={currRecipe.imageUrl} alt="whatever the food is" />
        //     <p>Time: { currRecipe.cookingTime} minutes</p>
        //     <p>Cooking Skill: {currRecipe.skillLvl}</p>
        //     <h2>Servings: {currRecipe.servings}</h2>
        //     <ul>
        //         {ingredients.map((ingredient) => (
        //             <li key={ingredient.ingredientId}>
        //                 <p>{ingredient.ingredientId} : { ingredient.quantity}</p>
        //             </li>
        //
        //
        // ))}
        //     </ul>
        //     <h3>Instructions</h3>
        //     <p>{currRecipe.instructions}</p>
        // </div>

        <div className="recipes min-vw-100 w-80">
        <div className="container-fluid">
            </div>
            <div className="row m-2">
                <div className="ind-recipes container-xl m-auto align-items-center justify-content-start gap-0 px-3 py-3 mw-100" style={{"width":"fit-content"}}>
                    <div className="px-4">
                        <h1>{currRecipe.name}</h1>
                            <h3>Cooking Time: {currRecipe.cookingTime} minutes  |  Serves: {currRecipe.servings} {currRecipe.servings === 1 ? "Person" : "People"}</h3>
                            <h6>Cooking Skill: {currRecipe.skillLvl}</h6>
                    </div>
                </div>
            </div>
            <div className="row m-2 justify-content-center">
                <div className="recipes ind-recipes-instructions m-sm-1 col-sm-7 p-2 35">
                        <h3 className="align-content-center">Instructions:</h3>
                        <h5 style={{"text-align":"left", "padding":"0.2rem"}}>{currRecipe.instructions}</h5>
                </div>
                <div className="recipes ind-recipes-instructions m-sm-1 col-sm-4 p-2">
                    <div className="row p-2">
                        <img src={currRecipe.imageUrl} alt="whatever the food is" alt={currRecipe.name}/>
                    </div>
                    <h3>Ingredients:</h3>
                    <div className="row p-2">
                        <ul style={{columns: '2'}}>
                            {ingredients.map((ingredient) => (
                                <li className="m-2" key={ingredient.ingredientId}>
                                    <p>{ingredient.ingredientId}:</p>
                                    <p>{ ingredient.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};