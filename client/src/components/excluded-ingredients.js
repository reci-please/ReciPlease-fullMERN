import React, {useState} from "react";

function ExcludedIngredients({formData, setFormData}) {

    const [inputValue, setInputValue] = useState("");
    var excludedIngr = formData.excluded;

    const handleInputChange = ({target:{value}}) => setInputValue(value);

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(inputValue !== "") {
                excludedIngr.unshift(inputValue);
                setInputValue("");
            }
        } else if (event.key === "Backspace" && inputValue === "" && excludedIngr.length !== 0) {
            setInputValue(excludedIngr[0]);
            excludedIngr = excludedIngr.slice(1, excludedIngr.length);
            event.preventDefault();
        }
        setFormData({...formData, excluded: excludedIngr});
    }

    const onSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <div className="q-box__question">
                <form onSubmit={onSubmit} className="row align-items-center">
                    <input className="form-control"
                           id="q_2_input"
                           name="q_2"
                           type="text"
                           placeholder="Add allergens"
                           value={inputValue}
                           onChange={handleInputChange}
                           onKeyDown={handleKeyPress}/>
                    <div className="m-auto overflow-auto list-flow">
                        <ul>
                            {excludedIngr.map((ingr, index) => (
                                <li className="form-control form-list-items" key={index}>{ingr}</li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default ExcludedIngredients;