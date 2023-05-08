import React, {useState} from "react";

function DisplayResults({recipes}) {
    let failed = false;
    if (recipes === undefined || recipes === null) {
        failed = true;
    } else if (!Array.isArray(recipes)) {     
        failed = true;
    } else if (Array.isArray(recipes) && recipes.length === 0) {
        console.log("recipes is empty");
        failed = true;
    }
    if (failed) {
        return (
            <div>
                <div className="q-box__question recipes">   
                    <h5>No recipes found. <br></br><br></br>
                    Would you like to perform a near-match search?</h5>          
                </div>
            </div>
        )
    }
    //else
    return (
        <div>
            <div className="q-box__question recipes">
                <ul className="items">
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                        <h3>{recipe.name.toLocaleLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</h3>
                        <img src={recipe.imageUrl} alt={recipe.name}/>
                            <p>{recipe.servings} {recipe.servings === 1 ? 'Serving' : 'Servings'} </p>
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
                                            <td><p>{ingredient.ingredientId.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p></td>
                                            <td><p>{ingredient.quantity.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p></td>
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