
import axios from "axios";
import { useEffect, useState } from "react";
import {ScrollRestoration, useParams} from "react-router-dom";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import {Box, Rating} from "@mui/material";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantMenu';
import * as PropTypes from "prop-types";


function StarIcon(props) {
    return null;
}

export const FullRecipe = () => {
    const navigate = useNavigate();
    const id = useParams().recipeId.toString();
    //const userID = useGetUserID();
    const userID = window.localStorage.getItem("userID");
    const username = window.localStorage.getItem("username");
    
    
    const [currRecipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [avgScore, setAvgScore] = useState(0.0);

    const [userRating, setUserRating] = useState(0.0);
    const [userReview, setUserReview] = useState("");
    const [showSelfComment, setSCVis] = useState(false);


    const [toDelete, setToDelete] = useState({
        id: id,
        ingredients: ingredients,
        numIngredients: ingredients.length,
    });

    const [completeReview, setCompleteReview] = useState({
        reviewedById: username,
        recipeId: id,
        score: 0.0,
        fullReview: "",
    })

    //console.log(ingredients.length);
    //for (let i = 0; i < ingredients.length; i++) {
    //    console.log(ingredients[i].ingredientId);
    //}

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipe = await axios.get(`https://reciplease-j0mk.onrender.com/recipes/recipeId/${id}`);
                // const recipe = await axios.get(`http://localhost:3001/recipes/recipeId/${id}`);

                
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

        const fetchReviews = async () => {
            try {
                // const response = await axios.get(`http://localhost:3001/recipes/review/${id}`);
                const response = await axios.get(`https://reciplease-j0mk.onrender.com/recipes/review/${id}`);
                //let tempDataArray = response.data;
                let tempDataArray = [];

                for (let i = 0; i < response.data.length; i++) {
                    tempDataArray.push(response.data[i]);
                }
                
                setReviews(tempDataArray);

                for (let i = 0; i < tempDataArray.length; i++) {
                    if (tempDataArray[i].reviewedById === username) {
                        console.log("User Score: " + tempDataArray[i].score);
                        console.log("User Review: " + tempDataArray[i].review.toString());
                        setUserRating(tempDataArray[i].score);
                        setUserReview(tempDataArray[i].review);
                        setCompleteReview({ ...completeReview, ['score']: tempDataArray[i].score });
                        setCompleteReview({ ...completeReview, ['fullReview']: tempDataArray[i].review });
                        return;
                    }
                }

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
            // await axios.delete(`http://localhost:3001/recipes/${id}`);
            await axios.delete(`https://reciplease-j0mk.onrender.com/recipes/${id}`);
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
                // await axios.post("http://localhost:3001/recipes/review", completeReview);
                await axios.post("https://reciplease-j0mk.onrender.com/recipes/review", completeReview);
                alert("review created");
            } else {
                // await axios.put("http://localhost:3001/recipes/review", completeReview);
                await axios.put("https://reciplease-j0mk.onrender.com/recipes/review", completeReview);
                alert("review updated");
            }

            //window.history.pushState(`/recipe/${id}`);
            //window.location.reload();
            navigate("/");

        } catch (err) { 
            console.error(err);
        }
    }

    return (
    <div className="recipes min-vw-100 w-80">
        <div className="container-fluid">
            <div className="row m-2 justify-content-center align-items-end d-sm-flex" style={{display: "table-row"}}>
                <div className="ind-recipes mb-0 gap-0 px-3 py-3 mw-100 mh-100 pb-2" style={{"width":"fit-content", display: "table-cell"}}>
                    <div className="px-4">
                        <h1>{currRecipe.name}</h1>
                        <h3>Cooking Time: {currRecipe.cookingTime} minutes  |  Serves: {currRecipe.servings} {currRecipe.servings === 1 ? "Person" : "People"}</h3>
                        <h6>Cooking Skill: {currRecipe.skillLvl}</h6>

                    </div>
                </div>
                <div className="ind-recipes gap-0 px-3 py-3 mw-100 mh-100 pb-2" style={{"width":"fit-content", display: "table-cell"}}>
                    <div className="px-4 mh-100">
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Box><h4>Average Score:</h4></Box>
                                <Rating
                                    sx={{ ml: 2 }}
                                    name="read-only"
                                    size="large"
                                    value={avgScore}
                                    readOnly
                                    precision={0.25}
                                    emptyIcon={<RestaurantOutlinedIcon fontSize="inherit" />}
                                    icon={<RestaurantMenuIcon fontSize="inherit" />}
                                />
                                <Box sx={{ ml: 2 }}>{avgScore}</Box>
                            </Box>
                        </div>
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Box><h4>Your Score:</h4></Box>
                                <Rating
                                    sx={{ ml: 2 }}
                                    id="score"
                                    name="score"
                                    value={userRating}
                                    precision={1}
                                    size="large"
                                    emptyIcon={<RestaurantOutlinedIcon fontSize="inherit" />}
                                    icon={<RestaurantMenuIcon fontSize="inherit" />}
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                        setUserRating(newValue);
                                        setSCVis(true);
                                        console.log("going to handle:");
                                        handleChange(event);
                                    }}
                                />
                                {userRating !== null ? (
                                    <Box sx={{ ml: 2 }}>{userRating}</Box>
                                ) : <Box sx={{ ml: 2 }}>Enter a Rating</Box>}
                            </Box>
                            {showSelfComment !== false && (
                                <div>
                                    <Box><label htmlFor="userReview"><h5 style={{marginBottom: 0}}>{userReview.length === 0 ? "Any Thoughts?" : "What's Changed?"}</h5></label></Box>
                                    <Box>
                                        <textarea
                                            cols={40}
                                            id="fullReview"
                                            name="fullReview"
                                            defaultValue={userReview}
                                            onChange={handleChange}
                                            className="p-1"
                                        ></textarea>
                                    </Box>
                                    <button type="submit" className="mb-0" onClick={onSubmit} style={{ textAlign: "center", width: "fit-content"}} defaultValue={userReview}>Submit Review</button>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <div className="row m-2 justify-content-center">
                <div className="recipes ind-recipes-instructions m-sm-1 col-sm-7 p-2 35">
                        <h3 className="align-content-center">Instructions:</h3>
                        <h5 style={{"text-align":"left", "padding":"0.2rem", "white-space": "pre-wrap"}}>{currRecipe.instructions}</h5>
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


            {/*<label htmlFor="score">Score: </label>*/}
            {/*<input type="number" id="score" name="score" onChange={handleChange}/> /5*/}


            {/*<label htmlFor="fullReview">Any thoughts?</label>*/}
            {/*<input type="text" id="fullReview"  name="fullReview" onChange={handleChange}/>*/}

            <section>
                <div className="container p-3">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <h3 className="mb-2">Recent comments</h3>
                            <div className="card text-dark">
                                {reviews.map((review) => (
                                    <div>
                                        <div className="card-body p-4">
                                            <div className="d-flex flex-start">
                                                <div style={{textAlign: "left"}}>
                                                    <h6 className="fw-bold mb-1">{review.reviewedById}</h6>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <Rating
                                                            name="read-only"
                                                            value={review.score}
                                                            readOnly
                                                            precision={0.25}
                                                            emptyIcon={<RestaurantOutlinedIcon fontSize="inherit" />}
                                                            icon={<RestaurantMenuIcon fontSize="inherit" />}
                                                        />
                                                    </div>
                                                    <p className="mb-0" style={{"white-space": "pre-line"}}>
                                                        {review.review}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="my-0"/>
                                    </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {(currRecipe.authorId === userID) && <button onClick={deleteRecipe} style={{ backgroundColor: "red", fontSize: "25px" }}>Delete</button>}
        </div>
    </div>
    );
};