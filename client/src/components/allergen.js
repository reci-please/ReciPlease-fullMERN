import React, {useState} from "react";

function AvoidIngredients({formData, setFormData}) {

    const [avoidValue, setAvoidValue] = useState("");
    const [allergens, setAllergens] = useState([]);

    const handleInputChange = (event) => {
        setAvoidValue(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if(avoidValue !== "") {
                setAllergens([avoidValue, ...allergens]);
                setAvoidValue("");
                setFormData({...formData, avoiding: allergens});
            }
        } else if (event.key === "Backspace" && avoidValue === "" && allergens.length !== 0) {
            setAvoidValue(allergens[0]);
            setAllergens(allergens.slice(1, allergens.length));
            setFormData({...formData, avoiding: allergens});
            event.preventDefault();
        }
    }

    return (
        <div>

            <div className="q-box__question">
                <input className="form-check-input question__input"
                       id="q_2_input"
                       name="q_2"
                       type="text"
                       placeholder="Add allergens"
                       value={avoidValue}
                       onChange={() => handleInputChange}
                       onKeyDown={() => handleKeyPress}/>
                <ul>
                    {allergens.map((ingr, index) => (
                        <li className="form-check-input question__input" key={index}>{ingr}</li>
                    ))}
                </ul>
            </div>

        </div>
    );

}

export default AvoidIngredients;