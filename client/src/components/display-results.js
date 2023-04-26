import React, {useState} from "react";

function DisplayResults({recipes}) {

    return (
        <div>
            <div className="q-box__question recipes">
                {recipes.length === 0 ? <h5>No recipes found</h5> : ""}
                <ul className="items">
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default DisplayResults;