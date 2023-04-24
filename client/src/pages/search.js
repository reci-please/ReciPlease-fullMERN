import { useState } from 'react';
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import WantedIngredients from "../components/want-ing";
import AvoidIngredients from "../components/allergen";
import Form from "../components/multiform";

export const Search = () => {
    // const [cookies,] = useCookies(["access_token"]);
    // const userID = useGetUserID();
    // const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        seeking: [],
        avoiding: []
    });

    const stepCount = 2;
    const formQuestions = ["Are there any ingredients you want to include?",
        "Are there any ingredients or allergens you want to avoid?",
        "Alright, lets confirm your choices:"]

    const PageDisplay = () => {
        if (page === 0) {
            return <WantedIngredients formData={formData} setFormData={setFormData}/>;
        } else if (page === 1) {
            return <AvoidIngredients formData={formData} setFormData={setFormData}/>;
        } else if (page === 2) {
            return (<Form formData={formData}/>);
        } else {
            setPage(() => 0)
            return <WantedIngredients formData={formData} setFormData={setFormData}/>;
        }

    }

    const onSubmit = async () => {
        // event.preventDefault();

        try {

            await axios.post("http://localhost:3001/search", {formData})
                .then(response => setRecipes(response.data));

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="search-multi">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row g-0 justify-content-center">
                    <div className="progress">
                        <div aria-valuemax="100"
                             aria-valuemin="0"
                             aria-valuenow="50"
                             className="progress-bar progress-bar-striped progress-bar-animated"
                             role="progressbar"
                             style={{width: `${(100/stepCount) * page}%`, height: `auto`}}></div>
                    </div>
                    <div id="qbox-container">
                        <div id="steps-container" className="row">
                            <div className="step">
                                <div className="q-header"><h4 className="search-multi">{formQuestions[page]}</h4></div>
                                <div className="q-body form-check ps-0 q-box">{PageDisplay()}</div>
                            </div>
                            <div id="q-box__buttons">
                                <button id="prev-btn" type="button"
                                        disabled={(page === 0)}
                                        onClick={() => {
                                            setPage((currPage) => currPage - 1)}
                                        }>Previous
                                </button>
                                <button id="next-btn" type="button"
                                        onClick={() => {
                                            if (page === stepCount) {
                                                // alert("FORM SUBMITTED");
                                                // console.log(formData);
                                                onSubmit();
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
        </div>
    );
}
    // const [cookies , ] = useCookies(["access_token"]);
    // const userID = useGetUserID();
    // const navigate = useNavigate();
//
//     const [recipes, setRecipes] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [requiredIngr, setRequiredIngr] = useState([]);
//     const [excludedIngr, setExcludedIngr] = useState([]);
//
//     function handleInputChange(event) {
//         setInputValue(event.target.value);
//     }
//
//     function handleKeyPress(event) {
//         if (event.key === "Enter") {
//             event.preventDefault();
//             if(inputValue !== "") {
//                 setRequiredIngr([inputValue, ...requiredIngr]);
//                 setInputValue("");
//             }
//         } else if (event.key === "Backspace" && inputValue === "" && requiredIngr.length !== 0) {
//             setInputValue(requiredIngr[0]);
//             setRequiredIngr(requiredIngr.slice(1, requiredIngr.length));
//             event.preventDefault();
//         } else if (event.key === "Escape") {
//             event.preventDefault();
//             if (inputValue !== "") {
//                 setExcludedIngr([inputValue, ...excludedIngr]);
//                 setInputValue("");
//             }
//         }
//     }
//
//     const onSubmit = async (event) => {
//         event.preventDefault();
//
//         try {
//             // console.log("Ingredients Requested: ", ingredients);
//             // console.log("Ingredients Type: " + typeof(ingredients));
//             // console.log("Ingredients Type Decons: " + typeof({ingredients}));
//
//             await axios.post("http://localhost:3001/search", { requiredIngr, excludedIngr })
//                 .then(response => setRecipes(response.data));
//
//             // recipes.forEach((rec) => {
//             //     console.log("Recipe: " + rec);
//             //     console.log("Recipe Stringify: " + JSON.stringify(rec));
//             // })
//
//         } catch (err) {
//             console.error(err);
//         }
//     };
//
//     return (
//         <div className="Search">
//             <h2>Search</h2>
//             <form>
//
//                 <input
//                     type="text"
//                     placeholder="Add Ingredients"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onKeyDown={handleKeyPress}
//                 />
//                 <ul>
//                     {requiredIngr.map((ingr, index) => (
//                         <li key={index}>{ingr}</li>
//                     ))}
//                 </ul>
//
//                 <button type='submit' onClick={onSubmit}>Search</button>
//             </form>
//             <br></br>
//             <div>
//                 <h2>Search Results</h2>
//                 {recipes.map((recipe) => (
//                     <div className="recipe-box" key={recipe.id}>
//                         <h3>{recipe.name}</h3>
//                         <img src={recipe.imageUrl} alt={recipe.name}/>
//                         <p>Servings: {recipe.servings}</p>
//                         <p>Cooking Time: {recipe.cookingTime} minutes</p>
//                         <p>Instructions: {recipe.instructions}</p>
//                         <p>Ingredients:</p>
//                         <table tag="ingredient-table" border="1">
//                             <thead>
//                             <tr>
//                                 <th>Ingredient</th>
//                                 <th>Quantity</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {recipe.ingredients.map((ingredient) => (
//                                 <tr key={ingredient.ingredientId}>
//                                     <td><p>{ingredient.ingredientId}</p></td>
//                                     <td><p>{ingredient.quantity}</p></td>
//                                 </tr>
//                             ))}
//                             </tbody>
//
//                         </table>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }