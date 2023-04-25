import React, {useState} from "react";

function RequiredIngredients({formData, setFormData}) {

    const [inputValue, setInputValue] = useState("");

    var requiredIngr = formData.required;

    const handleInputChange = ({target:{value}}) => setInputValue(value);

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(inputValue !== "") {
                requiredIngr.unshift(inputValue);
                setInputValue("");
            }
        } else if (event.key === "Backspace" && inputValue === "" && requiredIngr.length !== 0) {
            setInputValue(requiredIngr[0]);
            requiredIngr = requiredIngr.slice(1, requiredIngr.length);
            event.preventDefault();
        }
        setFormData({...formData, required: requiredIngr});
    }

    const onSubmit = async (event) => {
        event.preventDefault();
    };

    return (
      <div>

          <div className="q-box__question">
              <form onSubmit={onSubmit} className="row align-items-center">
                  <input className="form-control"
                         id="q_1_input"
                         name="q_1"
                         type="text"
                         placeholder="Add Ingredients"
                         value={inputValue}
                         onChange={handleInputChange}
                         onKeyDown={handleKeyPress}/>
                  <div className="m-auto overflow-auto list-flow">
                      <ul className="align-items-center p-2">
                          {requiredIngr.map((ingr, index) => (
                              <li className="form-control form-list-items" key={index}>{ingr}</li>
                          ))}
                      </ul>
                  </div>
              </form>
          </div>

      </div>
    );

}

export default RequiredIngredients;