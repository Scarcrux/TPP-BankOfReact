import React from 'react'


const display = (obj) => {
    return (

        <div className = "des">
            description: {obj.description}
            <div className ="am">
                amount: {obj.amount}
                <div className="dt">
                    date: {obj.date}
                </div>
            </div>
        </div>
    )
}

export default display