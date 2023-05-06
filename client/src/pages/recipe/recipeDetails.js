
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";



export const FullRecipe = () => {
    const navigate = useNavigate();
    const id = useParams().recipeId.toString();
    //const userID = useGetUserID();
    const userID = window.localStorage.getItem("userID");
    const username = window.localStorage.getItem("username");
    
    
    const [currRecipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [avgScore, setAvgScore] = useState([]);



    const [toDelete, setToDelete] = useState({
        id: id,
        ingredients: ingredients,
        numIngredients: ingredients.length,
    });

    const [completeReview, setCompleteReview] = useState({
        reviewedById: username,
        recipeId: id,
        score: 0,
        fullReview: "",
    })

    //console.log(ingredients.length);
    //for (let i = 0; i < ingredients.length; i++) {
    //    console.log(ingredients[i].ingredientId);
    //}

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                
                

                //const recipe = await axios.get(`https://reciplease-j0mk.onrender.com/recipes/recipeId/${id}`);
                const recipe = await axios.get(`http://localhost:3001/recipes/recipeId/${id}`);

                
                //console.log(recipe.data);
                let tempAvgScore = recipe.data.avgScore;
                setRecipe(recipe.data);
                setIngredients(recipe.data.ingredients);
                if (tempAvgScore === 0) {
                    setAvgScore("unrated");
                } else {
                    setAvgScore(tempAvgScore);
                }

                
                //console.log(avgScore);
            } catch (err) {
                console.error(err);
            }
            
        };

        //const pushToArray = (response) => {
        //    for (let i = 0; i < response.length; i++) {
        //      if (!tempReviews.includes(response[i])) {
        //        tempReviews.push(response[i]);
        //      }
        //    }
        //  };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/review/${id}`);
                let tempDataArray = response.data;
                setReviews(tempDataArray);

            } catch (err) {
                console.error(err);
            }
        }

       

        fetchReviews();
        fetchRecipe();
    }, []);


    const deleteRecipe = async () => {
        const relationsDelete = [];

        for (let i = 0; i < ingredients.length; i++) {
            relationsDelete.push(ingredients[i].recipeId);
        }

        const numIngredients = ingredients.length;
        try {

            setToDelete({ ...toDelete, [ingredients]: relationsDelete });
            setToDelete({ ...toDelete, [numIngredients]: numIngredients });

            console.log("button activated");
            //console.log(relationsDelete);
            await axios.delete(`http://localhost:3001/recipes/${id}`);
            navigate("/");
            
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (event) => {
        let name = event.target.name;
        let value;
        if (name === "score") {
             value = parseInt(event.target.value);
        } else {
             value = event.target.value;
        }
        
        setCompleteReview({ ...completeReview, [name]: value });

        

    };


    const onSubmit = async (event) => {
        event.preventDefault();
        let hasReview = false;

        try {
            for (let i = 0; i < reviews.length; i++) {
                if (reviews[i].reviewedById === username) {
                    hasReview = true;
                    break;
                }
            }

            if (!hasReview) {
                await axios.post("http://localhost:3001/recipes/review", completeReview);
                alert("review created");
            } else {
                await axios.put("http://localhost:3001/recipes/review", completeReview);
                alert("review updated");
            }
            
            


        } catch (err) { 
            console.error(err);
        }
    }

    


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
                        <h4>Average Score: {avgScore}/5</h4>
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
                        <img src={currRecipe.imageUrl} alt={currRecipe.name}/>
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
            <div style={{ display: "flex", flexDirection: "column" }}>

            
                

            </div>
            
                
                <label htmlFor="score">Score: </label>
                <input type="number" id="score" name="score" onChange={handleChange}/> /5
                
                
                <label htmlFor="fullReview">Any thoughts?</label>
                <input type="text" id="fullReview"  name="fullReview" onChange={handleChange}/>
                
                
                
            <button type="submit" onClick={onSubmit} style={{ textAlign: "center", width: "100px" }}>Submit Review</button>
            
            <ul className="row p-2">
                {reviews.map((review) => (
                    <li key={review.reviewedById}>{review.reviewedById}: {review.score}, {review.review} </li>
                ))}
            </ul>

            {(currRecipe.authorId === userID) && <button onClick={deleteRecipe} style={{ backgroundColor: "red", fontSize: "25px" }}>Delete</button>}
            
            
            
            
        </div>
    );
};