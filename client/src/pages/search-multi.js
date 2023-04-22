import { useState } from 'react';
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Form from "../components/multiform";
import WantedIngredients from "../components/want_ing";
import AvoidIngredients from "../components/allergen";

export const SearchMulti = () => {
    // const [cookies,] = useCookies(["access_token"]);
    // const userID = useGetUserID();
    // const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        seeking: [],
        avoiding: []
    });

    const stepCount = 2;
    const formQuestions = ["Are there any ingredients you want to include?",
                                "Are there any ingredients or allergens you want to avoid?",
                                "Alright, finding recipes for you!\nHit submit to confirm your choices."]

    const PageDisplay = () => {
        if (page === 0) {
            return <WantedIngredients formData={formData} setFormData={setFormData()}/>;
        } else if (page === 1) {
            return <AvoidIngredients formData={formData} setFormData={setFormData()}/>;
        } else if (page === 2) {
            return (<p>tester, should not see</p>);
        } else {
            setPage(() => 0)
            return <WantedIngredients formData={formData} setFormData={setFormData()}/>;
        }

    }

    return (
        <div className="search-multi">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="multi-form row g-0 justify-content-center">
                    <div className="progress">
                        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="50"
                             className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                             role="progressbar" style={{width: `${(100/stepCount) * page}%`}}></div>
                    </div>
                    <div id="qbox-container">
                        <div className="step">
                            <div className="q-header"><h4 className="search-multi">{formQuestions[page]}</h4></div>
                            <div className="q-body form-check ps-0 q-box">{PageDisplay()}</div>
                        </div>
                        <div id="q-box__buttons">
                            <button id="prev-btn" type="button"
                                    disabled={page === 0}
                                    onClick={() => {
                                        setPage((currPage) => currPage - 1)}
                                    }>Previous
                            </button>
                            <button id="next-btn" type="button"
                                onClick={() => {
                                    if (page === stepCount) {
                                        alert("FORM SUBMITTED");
                                        console.log(formData);
                                    } else {
                                        setPage((currPage) => currPage + 1);
                                    }
                                }}
                            >
                                {page === stepCount ? "Submit" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchMulti;

    // return (
    //     <div className="Search">
    //         <h2>Search</h2>
    //         <form>
    //
    //             <input
    //                 type="text"
    //                 placeholder="Add Ingredients"
    //                 value={inputValue}
    //                 onChange={handleInputChange}
    //                 onKeyDown={handleKeyPress}
    //             />
    //             <ul>
    //                 {ingredients.map((ingr, index) => (
    //                     <li key={index}>{ingr}</li>
    //                 ))}
    //             </ul>
    //
    //             <button type='submit' onClick={onSubmit}>Search</button>
    //         </form>
    //         <br></br>
    //         <div>
    //             <h2>Search Results</h2>
    //             {recipes.map((recipe) => (
    //                 <div className="recipe-box" key={recipe.id}>
    //                     <h3>{recipe.name}</h3>
    //                     <img src={recipe.imageUrl} alt={recipe.name}/>
    //                     <p>Servings: {recipe.servings}</p>
    //                     <p>Cooking Time: {recipe.cookingTime} minutes</p>
    //                     <p>Instructions: {recipe.instructions}</p>
    //                     <p>Ingredients:</p>
    //                     <table tag="ingredient-table" border="1">
    //                         <thead>
    //                         <tr>
    //                             <th>Ingredient</th>
    //                             <th>Quantity</th>
    //                         </tr>
    //                         </thead>
    //                         <tbody>
    //                         {recipe.ingredients.map((ingredient) => (
    //                             <tr key={ingredient.ingredientId}>
    //                                 <td><p>{ingredient.ingredientId}</p></td>
    //                                 <td><p>{ingredient.quantity}</p></td>
    //                             </tr>
    //                         ))}
    //                         </tbody>
    //
    //                     </table>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )