import React from 'react'
import './bank.css';

const display = (props) => {
    return (

        <div class ="div">

        <div className = "description">
            description: {props.description}
            <div className ="amount">
                amount: {props.amount}
                <div className="date">
                    date: {props.date}
                </div>
            </div>
        </div>
        </div>
    )
}

export default display