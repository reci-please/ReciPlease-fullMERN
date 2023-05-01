import { useState } from 'react';
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import RequiredIngredients from "../components/required-ingredients";
import ExcludedIngredients from "../components/excluded-ingredients";
import DisplayResults from '../components/display-results';
import Form from "../components/multiform";

export const SearchRelated = () => {
    // const [cookies,] = useCookies(["access_token"]);
    // const userID = useGetUserID();
    // const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        required: [],
        excluded: []
    });

    // Page 0: Required Ingredients
    // Page 1: Excluded Ingredients
    // Page 2: Confirmation Page
    // Page 3: Search Results
    const stepCount = 3;
    const formQuestions = ["Are there any ingredients you want to include?",
        "Are there any ingredients or allergens you want to avoid?",
        "Alright, lets confirm your choices:", "Search Results"]

    const PageDisplay = () => {
        if (page === 0) {
            return <RequiredIngredients formData={formData} setFormData={setFormData}/>;
        } else if (page === 1) {
            return <ExcludedIngredients formData={formData} setFormData={setFormData}/>;
        } else if (page === 2) {
            return (<Form formData={formData}/>);
        } else if (page === 3) {
            return <DisplayResults recipes= {recipes}/>;
        } else {
            setPage(() => 0)
            return <RequiredIngredients formData={formData} setFormData={setFormData}/>;
        }

    }

    const onSubmit = async () => {
        // event.preventDefault();
        recipes.length = 0;

        try {
            //await axios.post("http://localhost:3001/search", {formData})
             //   .then(response => setRecipes(response.data));
            
            await axios.post("https://reciplease-j0mk.onrender.com/search", {formData})
                .then(response => setRecipes(response.data));
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmitRelated = async () => {
        // event.preventDefault();
        recipes.length = 0;
        console.log("Here 1");
        try {
          //  await axios.post("http://localhost:3001/search-related", {formData})
           //     .then(response => setRecipes(response.data));
            
            await axios.post("https://reciplease-j0mk.onrender.com/search-related", {formData})
                .then(response => setRecipes(response.data));
        } catch (err) {
            console.log("Error 1")
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
                             style={{width: `${(100/(stepCount - 1)) * page}%`, height: `auto`}}></div>
                    </div>
                    <div id="qbox-container">
                        <div id="steps-container" className="row">
                            <div className="step">
                                <div className="q-header"><h4 className="search-multi">{formQuestions[page]}</h4></div>
                                <div className="q-body form-check ps-0 q-box">{PageDisplay()}</div>
                            </div>
                            <div id="q-box__buttons">
                                <button id="prev-btn" type="button"
                                        hidden={(page === 0)}
                                        onClick={() => {
                                            setPage((currPage) => currPage - 1)}
                                        }>Previous
                                </button>
                                <button id="next-btn" type="button"
                                        hidden={(page === stepCount)}
                                        onClick={() => {
                                            if (page === stepCount - 1) {
                                                onSubmit();
                                            }
                                            setPage((currPage) => currPage + 1);
                                        }}>
                                    {page === stepCount - 1 ? "Submit" : "Next"}
                                </button>
                                <button id="related-search" type="button"
                                        hidden={(page != stepCount || recipes.length > 0)}
                                        onClick={() => {
                                            if (page === stepCount) {
                                                onSubmitRelated();
                                            }
                                        }}>
                                Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};