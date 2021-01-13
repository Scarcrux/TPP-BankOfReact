import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import ShowCredits from './ShowCredits'

class Credits extends Component {
    constructor(props) {
        super(props) 
        this.state = {

            userData: []

            }
    }

    async componentDidMount () {

        try {
          let userData = await axios.get (
              'https://moj-api.herokuapp.com/credits'
          )
          this.setState ({userData: userData.data})
      } catch (error) {
          console.error(error)
        }
      }

    render () {

        return (<div>
            <h1>Credits</h1>
            <div><Link to = "/">Home</Link></div>
            <div>
                {this.state.userData.map((elem) => {return (<ShowCredits  description = {elem.description}
                                                                                amount = {elem.amount}
                                                                                date = {elem.date}/>)})}
            </div>
            </div>)
    }
}

export default Credits