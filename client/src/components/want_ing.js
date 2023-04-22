import React, {useState} from "react";

function WantedIngredients({formData, setFormData}) {

    const [wantValue, setWantValue] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const handleInputChange = (event) => {
        setWantValue(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if(wantValue !== "") {
                setIngredients([wantValue, ...ingredients]);
                setWantValue("");
                setFormData({...formData, seeking: ingredients});
            }
        } else if (event.key === "Backspace" && wantValue === "" && ingredients.length !== 0) {
            setWantValue(ingredients[0]);
            setIngredients(ingredients.slice(1, ingredients.length));
            setFormData({...formData, seeking: ingredients});
            event.preventDefault();
        }
    }

    return (
      <div>

          <div className="q-box__question">
              <input className="form-check-input question__input"
                     id="q_1_input"
                     name="q_1"
                     type="text"
                     placeholder="Add Ingredients"
                     value={wantValue}
                     onChange={() => handleInputChange}
                     onKeyDown={() => handleKeyPress}/>
              <ul>
                  {formData.ingredients.map((ingr, index) => (
                      <li className="form-check-input question__input" key={index}>{ingr}</li>
                  ))}
              </ul>
          </div>

      </div>
    );

}

export default WantedIngredients;