import { useState } from 'react';
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const Search = () => {
    const [cookies , ] = useCookies(["access_token"]);
    const userID = useGetUserID();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [ingredients, setIngredients] = useState([]);

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(inputValue !== "") {
                setIngredients([inputValue, ...ingredients]);
                setInputValue("");
            }
        } else if (event.key === "Backspace" && inputValue === "" && ingredients.length !== 0) {
            setInputValue(ingredients[0]);
            setIngredients(ingredients.slice(1, ingredients.length));
            event.preventDefault();
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // console.log("Ingredients Requested: ", ingredients);
            // console.log("Ingredients Type: " + typeof(ingredients));
            // console.log("Ingredients Type Decons: " + typeof({ingredients}));

            await axios.post("http://localhost:3001/search", { ingredients })
            .then(response => setRecipes(response.data));

            // recipes.forEach((rec) => {
            //     console.log("Recipe: " + rec);
            //     console.log("Recipe Stringify: " + JSON.stringify(rec));
            // })

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="Search">
            <h2>Search</h2>
            <form>

                <input
                    type="text"
                    placeholder="Add Ingredients"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <ul>
                    {ingredients.map((ingr, index) => (
                        <li key={index}>{ingr}</li>
                    ))}
                </ul>

                <button type='submit' onClick={onSubmit}>Search</button>
            </form>
            <br></br>
            <div>
                <h2>Search Results</h2>
                {recipes.map((recipe) => (
                    <div className="recipe-box" key={recipe.id}>
                        <h3>{recipe.name}</h3>
                        <img src={recipe.imageUrl} alt={recipe.name}/>
                        <p>Servings: {recipe.servings}</p>
                        <p>Cooking Time: {recipe.cookingTime} minutes</p>
                        <p>Instructions: {recipe.instructions}</p>
                        <p>Ingredients:</p>
                        <table tag="ingredient-table" border="1">
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipe.ingredients.map((ingredient) => (
                                    <tr key={ingredient.ingredientId}>
                                        <td><p>{ingredient.ingredientId}</p></td>
                                        <td><p>{ingredient.quantity}</p></td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                ))}
            </div>
        </div>
    )
}