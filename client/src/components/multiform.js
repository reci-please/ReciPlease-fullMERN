import React from 'react'

function Form({formData}) {

    return (
        <div className="row align-items-baseline m-auto overflow-auto list-flow">
            <div className="col">
                <h5>Your requested ingredients:</h5>
                <ul>
                    {formData.seeking.map((ingr, index) => (
                        <li className="" key={index}>{ingr}</li>
                    ))}
                </ul>
            </div>
            <div className="col">
                <h5>Ingredients you want to avoid:</h5>
                <ul>
                    {formData.avoiding.map((ingr, index) => (
                        <li className="" key={index}>{ingr}</li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default Form