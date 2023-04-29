import React from 'react'

function Form({formData}) {

    return (
        <div className="row align-items-baseline m-auto overflow-auto list-flow">
            <div className="col">
                <h5>Your required ingredients:</h5>
                <ul>
                    {formData.required.map((ingr, index) => (
                        <li className="" key={index}>{ingr}</li>
                    ))}
                </ul>
            </div>
            <div className="col">
                <h5>Your excluded ingredients:</h5>
                <ul>
                    {formData.excluded.map((ingr, index) => (
                        <li className="" key={index}>{ingr}</li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default Form