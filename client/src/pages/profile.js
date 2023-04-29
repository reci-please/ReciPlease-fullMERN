import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import RequiredIngredients from "../components/required-ingredients";
import ExcludedIngredients from "../components/excluded-ingredients";
import Form from "../components/multiform";
import { useEffect } from "react";
import clock from '../components/img/clock.svg';

export const Profile = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();


    useEffect(() => {
        

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
                );
                const temp = response.data;
                setSavedRecipes(temp);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSavedRecipe();
    }, []);

   
    return (
        <div className="learn">
            <div className="buffer">
        <h1 className="header"> BECOME A BETTER CHEF </h1>
        <h2 className="arrow2"> →→→ </h2>{" "}
      </div>
            <ul className="items">
                    <li key={"9ed1ff45-2193-4724-b380-46dcf12349e6"}>
                        <div>
                            <h2>Cheesy Quesadilla</h2>
                        </div>
                    
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Quesadilla_2.jpg" alt={"recipe.name"} />
                        <p> 1 Serving</p>
                    <div>
                        <ul>
                    <li key="9ed1ff45-2193-4724-b380-46dcf12349e6">
                        
                    <p>1 pound of beef</p>
                    <p>1 head of lettuce</p>
                    <p>1 tomato</p>
                        
                    </li>
                        </ul>
                        <p> detailed instructions here!</p>
                        </div>
                        <h5><img className="clock" src={clock} alt="React Logo"/> 20 minutes</h5>
                    </li>





                    <h2 className="arrow">      →   →   →  </h2>{" "}






                    <li key={"9ed1ff45-2193-4724-b380-46dcf12349e6"}>
                        <div>
                            <h2>Now we'll learn to Barbecue!</h2>
                        </div>
                    
                        <img src="https://hips.hearstapps.com/hmg-prod/images/pop-bbq-smoker-643ec2c82ca4f.jpg?crop=0.889xw:1.00xh;0.0561xw,0&resize=1920:*" alt={"recipe.name"} />
                      
                    <div>
                        <ul>
                    <li key="9ed1ff45-2193-4724-b380-46dcf12349e6">
                        
                    </li>
                        </ul>
                        <p> input instructions / video on how to barbecue</p>
                        </div>
                    </li>








                    <h2 className="arrow">      →   →   →  </h2>{" "}










                    <li key="bf14a6e6-0206-4442-a9c0-58a7b7d11c7d">
                        <div>
                            <h2>Hamburger</h2>
                        </div>
                    
                        <img src="https://www.baltimoremagazine.com/wp-content/uploads/2019/06/burgerbros-013b.jpg" alt={"recipe.name"} />
                        <p> 1 Serving</p>
                    <div>
                        <ul>
                    <li key="9ed1ff45-2193-4724-b380-46dcf12349e6">
                        
                    <p>1 pound of beef</p>
                    <p>1 head of lettuce</p>
                    <p>1 tomato</p>
                        
                    </li>
                        </ul>
                        <p> detailed instructions here!</p>
                        </div>
                        <h5><img className="clock" src={clock} alt="React Logo"/> 35 minutes</h5>
                    </li>





                    <h2 className="arrow">      →   →   →  </h2>{" "}







                    <li key={"9ed1ff45-2193-4724-b380-46dcf12349e6"}>
                        <div>
                            <h2>let's learn to use a meat grinder!</h2>
                        </div>
                    
                        <img src="https://m.media-amazon.com/images/I/61t9lyvpPzL.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt={"recipe.name"} />
                      
                    <div>
                        <ul>
                    <li key="9ed1ff45-2193-4724-b380-46dcf12349e6">
                        
                    </li>
                        </ul>
                        <p> input instructions / video on how to use</p>
                        </div>
                    </li>




                    <h2 className="arrow">      →   →   →  </h2>{" "}



                    <li key="fa4d1235-2a5d-4e11-95fe-59ed3273a7b7">
                        <div>
                            <h2>Lasagna</h2>
                        </div>
                    
                        <img src="https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f.jpg" alt={"recipe.name"} />
                        <p> 1 Serving</p>
                    <div>
                        <ul>
                    <li key={"ingredient.ingredientId"}>
                        
                    <p>1 pound of beef</p>
                    <p>1 head of lettuce</p>
                    <p>1 tomato</p>
                        
                    </li>
                        </ul>
                        <p> detailed instructions here!</p>
                        </div>
                        <h5><img className="clock" src={clock} alt="React Logo"/> 60 minutes</h5>
                    </li>
                
            </ul>
        </div>
    )

    /*
    return (
        <div>
            <h1> Saved Recipes </h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                    {savedRecipes.includes(recipe._id) && <h1> ALREADY SAVED</h1>}
                    <div>
                            <h2>{recipe.name}</h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                </li>
                ))}
                
            </ul>
        </div>)
        */
}