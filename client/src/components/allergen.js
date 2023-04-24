import React, {useState} from "react";

function AvoidIngredients({formData, setFormData}) {

    const [avoidValue, setAvoidValue] = useState("");
    // const [allergens, setAllergens] = useState(formData.avoiding);
    var allergens = formData.avoiding;

    const handleInputChange = ({target:{value}}) => setAvoidValue(value);

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(avoidValue !== "") {
                // setAllergens([avoidValue, ...allergens]);
                allergens.unshift(avoidValue);
                setAvoidValue("");
            }
        }else if (event.key === "Backspace" && avoidValue === "" && allergens.length !== 0) {
            setAvoidValue(allergens[0]);
            // setAllergens(allergens.slice(1, allergens.length));
            allergens = allergens.slice(1, allergens.length);
            event.preventDefault();
        }
        setFormData({...formData, avoiding: allergens});
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
                           value={avoidValue}
                           onChange={handleInputChange}
                           onKeyDown={handleKeyPress}/>
                    <div className="m-auto overflow-auto list-flow">
                        <ul>
                            {allergens.map((ingr, index) => (
                                <li className="form-control form-list-items" key={index}>{ingr}</li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default AvoidIngredients;