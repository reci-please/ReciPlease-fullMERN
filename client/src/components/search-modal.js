import React from 'react'

function Modal(setIsOpen) {

    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Dialog</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsOpen(false)}>
                    </button>
                    <div className={styles.modalContent}>
                        Are you sure you want to delete the item?
                    </div>
                </div>
            </div>
        </>
    )

}

export default Modal