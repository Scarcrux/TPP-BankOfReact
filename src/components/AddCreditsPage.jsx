import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Credits from './Credits'

class AddCreds extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            description: "",
            amount: "",
            date: ""
            }

            this.credState = this.state
    }

    addCredits = () => {

        console.log ("Base Credits", this.credState)
        console.log ("Credits", this.state)

        this.credState = this.state
        let cObj = {description: this.state.description, amount: this.state.amount, date: this.state.date}
      }

    handleChange = event => {

        this.setState({[event.target.name]: event.target.value })
      }

    render() {
        return (<div>
            <h4>Add Credits</h4>
            <div><Link to="/">Home</Link></div>
            <div><Link to="/Credits">Back</Link></div>

            <div>
                <div>
                    <label htmlFor="des">Write Description: </label>
                    <input
                        className="deschange"
                        type="text"
                        id="des"
                        name="description"
                        onChange={this.handleChange}>
                    </input>
                </div>
                <div>
                <label htmlFor="am">Write Amount: </label>
                <input
                    className="amountchange"
                    id="am"
                    type="number"
                    name="amount"
                    onChange={this.handleChange}>
                </input>
                </div>
                <div>
                <label htmlFor="dt">Write Date: </label>
                <input
                    className="datechange"
                    id="dt"
                    type="date"
                    name="date"
                    onChange={this.handleChange}>
                </input>
                </div>
            </div>
            <button className="addButton" onClick={this.addCredits}>Add</button>
        </div>);
    }

}

export default AddCreds;
