import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import ShowCredits from './ShowCredits'
import './bank.css';
import AccountBalance from './AccountBalance'
import AddCreditsPage from './AddCreditsPage'
import Convoluted from './Convoluted'
import display from './ShowCredits';

class Debits extends Component {
    constructor(props) {
        super(props) 
        this.state = {

            userData: [],
            credsData: [],
            description: " ",
            amount: 0,
            date: " ",
            display: false

            }
    }

    async componentDidMount () {

        try {
          let response = await axios.get (
              'https://moj-api.herokuapp.com/debits'
          )
          this.setState ({userData: response.data,
                         amount: response.data.forEach((elem) => {return (elem.amount += this.state.amount)})})
      } catch (error) {
          console.error(error)
        }
      }

     async incrementCount () {

        let amount = 0

        fetch ('https://moj-api.herokuapp.com/debits')
        .then((response) => response.json())
        .then((response) => console.log(response.forEach((elem) => {console.log(elem.amount)})))
        .catch ((error) => console.error(error))
     
  }

      addDebits = () => {

        this.baseDes = this.state.description
        this.baseAm = this.state.amount
        this.baseDate = this.state.date

        const newCred = {id: "", description: this.baseDes, amount: this.baseAm, date: this.baseDate }
        const userData = [...this.state.userData, newCred]
        this.setState({userData})
        this.setState({display: false})


      }

      displayDebs = () => {
        this.setState ({display: true})
      }

    handleChange = event => {

        this.setState ({[event.target.name]: event.target.value })
      } 

    render () {

      if (this.state.display) {
      
        return (<div>
          <h4>Add Debits</h4>
          <div><Link to="/">Home</Link></div>
          <div><Link to="/Credits">Back</Link></div>

          <div>
              <div>
                  <label htmlFor="des">Write Description:</label>
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
          <button className="addButton" onClick={this.addDebits}>Add</button>
      </div>)
       } else { return (
        <div>
            <h1>Debits</h1>
            <h2>{console.log(this.state.amount)}</h2>
            <div><Link to = "/">Home</Link></div>
            <button class ="button" onClick={this.displayDebs}>Add Debits</button>
            <div>
                {this.state.userData.map((elem) => {return (<ShowCredits  description = {elem.description}
                                                                                amount = {elem.amount}
                                                                                date = {elem.date}/>)})}
            </div>
            </div>
            )
      }
                
    }
}

export default Debits