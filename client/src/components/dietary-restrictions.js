import React, {useState} from "react";

function DietaryRestrictions({formData, setFormData, dietRestricList}) {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (drLabel) => {
        if (selected.includes(drLabel)) {
            setSelected(selected.filter((item) => item !== drLabel));
        } else {
            setSelected([...selected, drLabel]);
        }
    };

    const onSubmit = async (event) => {
        setFormData({...formData, dietRestric: selected});
        event.preventDefault();
    };

    return (
        <div>
            <div className="q-box__question">
                <form onSubmit={onSubmit} className="row align-items-center">
                    {dietRestricList.map((drLabel) => (
                        <div key={drLabel}>
                            <label>
                                <input type="checkbox" name={drLabel} value={drLabel}
                                checked={selected.includes(drLabel)}
                                onChange={handleCheckboxChange(drLabel)}
                                />
                                {drLabel}
                            </label>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );

}

export default DietaryRestrictions;