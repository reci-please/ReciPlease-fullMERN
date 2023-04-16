import { useState } from 'react';
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


export const CreateRecipe = () => {
    const [cookies , ] = useCookies(["access_token"]);
    const userID = useGetUserID();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [servings, setServings] = useState(0);
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [cookingTime, setCookingTime] = useState(0);
    const authorId = userID;
    const [ingredients, setIngredients] = useState([]);
    const [numIngredients, setNumIngredients] = useState(0);


    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleServings = (event) => {
        setServings(event.target.value);
    }

    const handleInstructions = (event) => {
        setInstructions(event.target.value);
    }

    const handleImageUrl = (event) => {
        setImageUrl(event.target.value);
    }

    const handleCookingTime = (event) => {
        setCookingTime(event.target.value);
    }


    const handleIngredients = (event) => {
        setIngredients(...ingredients, event.target.value);
    }

    const handleNumIngredients = (event) => {
        setNumIngredients(event.target.value);
    }

    //const [recipe, setRecipe] = useState({
    //    name : "new recipe",
    //    servings: 3,
    //    instructions : "cook",
    //    imageUrl : "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg",
    //    cookingTime : 10,
    //    authorId : userID,
    //    ingredients : ["pepper", "chile"],
    //    numIngredients : 2,
    //})
    
    //const handleChange = (event) => {
    //    const { name, value } = event.target;
    //    setRecipe({ ...recipe, [name]: value });
    //};
    

    
    const onSubmit = async (event) => {
       event.preventDefault();
       try {
           //await axios.post(`http://localhost:3001/recipes/${userID}`, recipe, { headers: { authorization:  cookies.access_token} });
           await axios.post("http://localhost:3001/recipes", {name, servings, instructions, imageUrl, cookingTime, authorId, ingredients, numIngredients});
           alert("Recipe Created");
           navigate("/");
       } catch (err) {
           console.error(err);
       }
   };


          return (
           <div className="create-recipe">
           <h2>Create Recipe</h2>
           <form onSubmit={onSubmit}>
               <label htmlFor="name">Name</label>
               <input type="text" id="name" name="name" onChange={handleName} />
                   <label htmlFor="servings">Servings</label>
                   <input type='number' id='servings' name='servings' onChange={handleServings} />
               <label htmlFor="instructions">Instructions</label>
               <textarea name="instructions" id="instructions" onChange={handleInstructions}></textarea>
               <label htmlFor="imageUrl">Image URL</label>
               <input type="text" id="imageurl" name="imageUrl" onChange={handleImageUrl}/>
               <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                      <input type="number" id="cookingTime" name="cookingTime" onChange={handleCookingTime} />
               <label htmlFor="numIngredients">Number of Ingredients</label>
                   <input type="number" id="numIngredients" name="numIngredients" onChange={handleNumIngredients} />

                   <button type='submit'>Create Recipe</button>
            
           </form>
           </div>
       )
    
    //return (
    //    <div className='create-recipe'>
    //        <h2>Create Recipe</h2>
    //        <form onSubmit={onSubmit}>
    //        <button type='submit'>Create Recipe</button></form>
    //    </div>
    //)
}


//export const CreateRecipe = () => {
//    const [cookies , ] = useCookies(["access_token"]);
//    const userID = useGetUserID();
//
//    const [recipe, setRecipe] = useState({
//        name: "",
//        servings: 0,
//        instructions: "",
//        imageUrl: "",
//        cookingTime: 0,
//        authorId: userID,
//        ingredients: [],
//        numIngredients: 0,
//
//    });
//
//    const navigate = useNavigate();
//
//    const handleChange = (event) => {
//        const { name, value } = event.target;
//        setRecipe({ ...recipe, [name]: value });
//
//    };
//
//    const handleIngredientChange = (event, idx) => {
//        const { value } = event.target;
//        const ingredients = recipe.ingredients;
//        ingredients[idx] = value;
//        setRecipe({ ...recipe, ingredients });
//        
//
//    };
//
//    const addIngredient = () => {
//        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
//    };
//
//    const onSubmit = async (event) => {
//        event.preventDefault();
//        try {
//            //await axios.post(`http://localhost:3001/recipes/${userID}`, recipe, { headers: { authorization:  cookies.access_token} });
//            await axios.post("http://localhost:3001/recipes", recipe, { headers: { authorization:  cookies.access_token} });
//            alert("Recipe Created");
//            navigate("/");
//        } catch (err) {
//            console.error(err);
//        }
//    };
//
//
//    /*
//    return (
//        <div className="create-recipe">
//        <h2>Create Recipe</h2>
//        <form onSubmit={onSubmit}>
//            <label htmlFor="name">Name</label>
//            <input type="text" id="name" name="name" onChange={handleChange} />
//                <label htmlFor="ingredients">Ingredients</label>
//                <input type='text' id='ingredients' name='ingredients' onChange={handleChange} />
//                <label htmlFor="servings">Servings</label>
//                <input type='number' id='servings' name='servings' onChange={handleChange} />
//            <label htmlFor="instructions">Instructions</label>
//            <textarea name="instructions" id="instructions" onChange={handleChange}></textarea>
//            <label htmlFor="imageUrl">Image URL</label>
//            <input type="text" id="imageurl" name="imageUrl" onChange={handleChange}/>
//            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
//                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
//                
//                <button type='submit'>Create Recipe</button>
//
//        </form>
//        </div>
//    )
//*/
//
//    
//    return (
//        <div className="create-recipe">
//        <h2>Create Recipe</h2>
//        <form onSubmit={onSubmit}>
//            <label htmlFor="name">Name</label>
//            <input type="text" id="name" name="name" onChange={handleChange} />
//                <label htmlFor="ingredients">Ingredients</label>
//                {recipe.ingredients.map((ingredient, idx) => (
//                    <input
//                        key={idx}
//                        type="text"
//                        name='ingredients'
//                        value={ingredient}
//                        onChange={(event) => handleIngredientChange(event, idx)} />
//                ))}
//                <button onClick={addIngredient} type='button'>Add Ingredient</button>
//                <label htmlFor="servings">Servings</label>
//                <input type="number" id="servings" name="servings" onChange={handleChange} />
//                <label htmlFor="numIngredients">Number of Ingredients</label>
//                <input type="number" id="numIngredients" name="numIngredients" onChange={handleChange} />
//            
//            <label htmlFor="instructions">Instructions</label>
//            <textarea name="instructions" id="instructions" onChange={handleChange}></textarea>
//            <label htmlFor="imageUrl">Image URL</label>
//            <input type="text" id="imageurl" name="imageUrl" onChange={handleChange}/>
//            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
//                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
//                
//                <button type='submit'>Create Recipe</button>
//
//        </form>
//        </div>
//    )
//    
//}