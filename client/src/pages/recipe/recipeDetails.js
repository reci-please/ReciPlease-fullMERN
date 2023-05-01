
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const FullRecipe = () => {
    
    const id = useParams().recipeId.toString();
    const [currRecipe, setRecipe] = useState();
    console.log("hwllo");

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                
                
                const recipe = await axios.get(`https://reciplease-j0mk.onrender.com/recipes/recipeId/${id}`);
                console.log("hello");
                //const recipe = await axios.get(`http://localhost:3001/recipes/recipeId`, {id});
                setRecipe(recipe);
            } catch (err) {
                console.err(err);
            }
            
        };
    }, []);

    


    return (
        <div className="recipes">
            <h1>{ id }</h1>
        </div>
    );
};