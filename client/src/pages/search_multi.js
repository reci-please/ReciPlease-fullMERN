import { useState } from 'react';
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const SearchMulti = () => {
    const [cookies , ] = useCookies(["access_token"]);
    const userID = useGetUserID();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const progress = (value) => {
        document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
    }

    let step = document.getElementsByClassName('step');
    let prevBtn = document.getElementById('prev-btn');
    let nextBtn = document.getElementById('next-btn');
    let submitBtn = document.getElementById('submit-btn');
    let form = document.getElementsByTagName('form')[0];
    let preloader = document.getElementById('preloader-wrapper');
    let bodyElement = document.querySelector('body');
    let succcessDiv = document.getElementById('success');

    form.onsubmit = () => { return false }

    let current_step = 0;
    let stepCount = 2;
    step[current_step].classList.add('d-block');
    if(current_step === 0){
        prevBtn.classList.add('d-none');
        submitBtn.classList.add('d-none');
        nextBtn.classList.add('d-inline-block');
    }


    function onNext () {
        current_step++;
        let previous_step = current_step - 1;
        if(( current_step > 0) && (current_step <= stepCount)){
            prevBtn.classList.remove('d-none');
            prevBtn.classList.add('d-inline-block');
            step[current_step].classList.remove('d-none');
            step[current_step].classList.add('d-block');
            step[previous_step].classList.remove('d-block');
            step[previous_step].classList.add('d-none');
            if (current_step === stepCount){
                submitBtn.classList.remove('d-none');
                submitBtn.classList.add('d-inline-block');
                nextBtn.classList.remove('d-inline-block');
                nextBtn.classList.add('d-none');
            }
        } else {
            if(current_step > stepCount){
                form.onsubmit = () => { return true }
            }
        }
        progress((100 / stepCount) * current_step);
    };


    function onPrev () {
        if(current_step > 0){
            current_step--;
            let previous_step = current_step + 1;
            prevBtn.classList.add('d-none');
            prevBtn.classList.add('d-inline-block');
            step[current_step].classList.remove('d-none');
            step[current_step].classList.add('d-block')
            step[previous_step].classList.remove('d-block');
            step[previous_step].classList.add('d-none');
            if(current_step < stepCount){
                submitBtn.classList.remove('d-inline-block');
                submitBtn.classList.add('d-none');
                nextBtn.classList.remove('d-none');
                nextBtn.classList.add('d-inline-block');
                prevBtn.classList.remove('d-none');
                prevBtn.classList.add('d-inline-block');
            }
        }

        if(current_step === 0){
            prevBtn.classList.remove('d-inline-block');
            prevBtn.classList.add('d-none');
        }
        progress((100 / stepCount) * current_step);
    };


    function onSub () {
        preloader.classList.add('d-block');

        const timer = ms => new Promise(res => setTimeout(res, ms));

        timer(3000)
            .then(() => {
                bodyElement.classList.add('loaded');
            }).then(() =>{
            step[stepCount].classList.remove('d-block');
            step[stepCount].classList.add('d-none');
            prevBtn.classList.remove('d-inline-block');
            prevBtn.classList.add('d-none');
            submitBtn.classList.remove('d-inline-block');
            submitBtn.classList.add('d-none');
            succcessDiv.classList.remove('d-none');
            succcessDiv.classList.add('d-block');
        })

    };

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(inputValue !== "") {
                setIngredients([inputValue, ...ingredients]);
                setInputValue("");
            }
        } else if (event.key === "Backspace" && inputValue === "" && ingredients.length !== 0) {
            setInputValue(ingredients[0]);
            setIngredients(ingredients.slice(1, ingredients.length));
            event.preventDefault();
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // console.log("Ingredients Requested: ", ingredients);
            // console.log("Ingredients Type: " + typeof(ingredients));
            // console.log("Ingredients Type Decons: " + typeof({ingredients}));

            await axios.post("http://localhost:3001/search", { ingredients })
            .then(response => setRecipes(response.data));

            // recipes.forEach((rec) => {
            //     console.log("Recipe: " + rec);
            //     console.log("Recipe Stringify: " + JSON.stringify(rec));
            // })

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="search-multi">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row g-0 justify-content-center">
                    <div className="col-lg mx-0 px-0">
                        <div className="progress">
                            <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="50" className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: 0%"></div>
                        </div>
                        <div id="qbox-container">
                            <form className="needs-validation" id="form-wrapper" method="post" name="form-wrapper" noValidate="">
                                <div id="steps-container">
                                    <div className="step">
                                        <h4 className="search-multi">Are there any ingredients you want to include?</h4>
                                        <div className="form-check ps-0 q-box">
                                            <div className="q-box__question">
                                                <input className="form-check-input question__input" id="q_1_yes" name="q_1" type="radio" value="Yes">
                                                    <label className="form-check-label question__label" htmlFor="q_1_yes">Yes</label>
                                                </input>
                                            </div>
                                            <div className="q-box__question">
                                                <input checked className="form-check-input question__input" id="q_1_no" name="q_1" type="radio" value="No">
                                                    <label className="form-check-label question__label" htmlFor="q_1_no">No</label>
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <h4 className="search-multi">Are there any ingredients or allergens you want to
                                            avoid?</h4>
                                        <div className="form-check ps-0 q-box">
                                            <div className="q-box__question">
                                                <input className="form-check-input question__input" id="q_2_yes" name="q_2" type="radio" value="Yes">
                                                    <label className="form-check-label question__label" htmlFor="q_2_yes">Yes</label>
                                                </input>
                                            </div>
                                            <div className="q-box__question">
                                                <input checked className="form-check-input question__input" id="q_2_no" name="q_2" type="radio" value="No">
                                                    <label className="form-check-label question__label" htmlFor="q_2_no">No</label>
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <div className="mt-1">
                                            <div className="closing-text">
                                                <h4 className="search-multi">Alright, finding recipes for you! <br></br>Hit submit to confirm your choices.</h4>
                                                <h5 className="search-multi">Preferred Ingredients:</h5>
                                                <p>[List Goes Here]</p>
                                                <h5 className="search-multi">Avoided Ingredients:</h5>
                                                <p>[List Goes Here]</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="success">
                                        <div className="mt-5">
                                            <h4 className="search-multi">Here are our top reccomendations for you:</h4>
                                            <p>[Insert list here]</p>
                                            <a className="back-link" href="">See all your reccomendations ➜</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="q-box__buttons">
                                    <button id="prev-btn" type="button" onClick={onPrev}>Previous</button>
                                    <button id="next-btn" type="button" onClick={onNext}>Next</button>
                                    <button id="submit-btn" type="submit" onClick={onSub}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="preloader-wrapper">
                <div id="preloader"></div>
                <div className="preloader-section section-left"></div>
                <div className="preloader-section section-right"></div>
            </div>
        </div>
    )
}