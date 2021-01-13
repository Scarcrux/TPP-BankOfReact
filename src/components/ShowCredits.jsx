import React from 'react'

const display = (props) => {
    return (

        <div className = "description">
            description: {props.description}
            <div className ="amount">
                amount: {props.amount}
                <div className="date">
                    date: {props.date}
                </div>
            </div>
        </div>
    )
}

export default display