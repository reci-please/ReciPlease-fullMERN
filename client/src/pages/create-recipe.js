import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = useGetUserID();

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "mole",
    servings: 1,
    instructions: "yes",
    imageUrl:
      "https://www.firstdayofhome.com/wp-content/uploads/2021/05/Chicken-Mole-Recipe-featureimg.jpg",
    cookingTime: 120,
    authorId: userID,
    ingredients: [],
    quantities: [],
    numIngredients: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleNumbers = (event) => {
    let name = event.target.name;
    let num = parseInt(event.target.value);
    console.log(event.target.name);
    console.log(num);
    setRecipe({ ...recipe, [name]: num });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
    let num = "numIngredients";
    setRecipe({ ...recipe, [num]: ingredients.length });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const addQuantity = () => {
    setRecipe({ ...recipe, quantities: [...recipe.quantities, ""] });
  };

  const handleQuantityChange = (event, idx) => {
    const { value } = event.target;
    const quantities = recipe.quantities;
    quantities[idx] = value;
    setRecipe({ ...recipe, quantities });

    console.log(recipe.quantities);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      //await axios.post(`http://localhost:3001/recipes/${userID}`, recipe, { headers: { authorization:  cookies.access_token} });
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe Created");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="login-box">
      <h2>Create Recipe</h2>
      <form>
        <div className="user-box">
          <input type="text" onChange={handleChange} />
          <label htmlFor="name">Name</label>
        </div>

        <div className="user-box">
          <input
            type="number"
            id="servings"
            name="servings"
            onChange={handleNumbers}
          />
          <label htmlFor="servings">Servings</label>
        </div>

        <div className="user-box">
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              className="input"
              key={idx}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          ))}
          <label htmlFor="ingredients">Ingredients</label>
        </div>
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>

        <div className="user-box">
          {recipe.quantities.map((quantity, idx) => (
            <input
              className="input"
              key={idx}
              type="text"
              name="quantities"
              value={quantity}
              onChange={(event) => handleQuantityChange(event, idx)}
            />
          ))}
          <label htmlFor="quantities">Quantities</label>
        </div>
        <button onClick={addQuantity} type="button">
          Add Quantity
        </button>

        <div>
          <div>
            <label className="text-title" htmlFor="instructions">Instructions</label>
          </div>
          <div>
            <textarea
            className="instructions"
              name="instructions"
              id="instructions"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="user-box">
          <input
            className="input"
            type="text"
            id="imageurl"
            name="imageUrl"
            onChange={handleChange}
          />
          <label htmlFor="imageUrl">Image URL</label>
        </div>

        <div className="user-box">
          <input
            className="input"
            type="number"
            id="cookingTime"
            name="cookingTime"
            onChange={handleNumbers}
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        </div>

        {/* <button className="submit" type="submit" href="#">
           Create Recipe
         </button> */}

        <a className="submit" type="submit" href="#" onClick={onSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Create Recipe
        </a>
      </form>
    </div>

    // <div className="create-recipe">
    //   <form onSubmit={onSubmit}>
    //     <h2 className="title">Create Recipe</h2>
    //     <div className="user-box">
    //     <input
    //         type="text"
    //       onChange={handleChange}
    //     />
    //     <label htmlFor="name">Name</label>
    //     </div>

    //     <label htmlFor="servings">Servings</label>
    //     <input
    //       className="input"
    //       type="number"
    //       id="servings"
    //       name="servings"
    //       onChange={handleNumbers}
    //     />

    //     <label htmlFor="ingredients">Ingredients</label>
    //     {recipe.ingredients.map((ingredient, idx) => (
    //       <input
    //         className="input"
    //         key={idx}
    //         type="text"
    //         name="ingredients"
    //         value={ingredient}
    //         onChange={(event) => handleIngredientChange(event, idx)}
    //       />
    //     ))}
    //     <button onClick={addIngredient} type="button">
    //       Add Ingredient
    //     </button>

    //     <label htmlFor="quantities">Quantities</label>
    //     {recipe.quantities.map((quantity, idx) => (
    //       <input
    //       className="input"
    //         key={idx}
    //         type="text"
    //         name="quantities"
    //         value={quantity}
    //         onChange={(event) => handleQuantityChange(event, idx)}
    //       />
    //     ))}
    //     <button onClick={addQuantity} type="button">
    //       Add Quantity
    //     </button>

    //     <label htmlFor="instructions">Instructions</label>
    //     <textarea
    //       name="instructions"
    //       id="instructions"
    //       onChange={handleChange}
    //     ></textarea>

    //     <label htmlFor="imageUrl">Image URL</label>
    //     <input
    //       className="input"
    //       type="text"
    //       id="imageurl"
    //       name="imageUrl"
    //       onChange={handleChange}
    //     />

    //     <label htmlFor="cookingTime" >Cooking Time (minutes)</label>
    //     <input
    //       className="input"
    //       type="number"
    //       id="cookingTime"
    //       name="cookingTime"
    //       onChange={handleNumbers}
    //     />

    //     <button className="submit" type="submit">
    //       Create Recipe
    //     </button>
    //   </form>
    // </div>
  );

  //return (
  //    <div className='create-recipe'>
  //        <h2>Create Recipe</h2>
  //        <form onSubmit={onSubmit}>
  //        <button type='submit'>Create Recipe</button></form>
  //    </div>
  //)
};

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
