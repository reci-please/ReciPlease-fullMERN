import React, {useState} from "react";

function WantedIngredients({formData, setFormData}) {

    const [inputValue, setInputValue] = useState("");
    const [requiredIngr, setRequiredIngr] = useState(formData.seeking);

    // function handleInputChange(event) {
    //     setInputValue(event.target.value);
    // }

    const handleInputChange = ({target:{value}}) => setInputValue(value);

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(inputValue !== "") {
                setRequiredIngr([inputValue, ...requiredIngr]);
                setInputValue("");
            }
        } else if (event.key === "Backspace" && inputValue === "" && requiredIngr.length !== 0) {
            setInputValue(requiredIngr[0]);
            setRequiredIngr(requiredIngr.slice(1, requiredIngr.length));
            event.preventDefault();
        }
        setFormData({...formData, seeking: requiredIngr});
    }

    const onSubmit = async (event) => {
        setFormData({...formData, seeking: requiredIngr})
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
                      <ul>
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

export default WantedIngredients;