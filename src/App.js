import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import AddCreditsPage from './components/AddCreditsPage';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
      error: null,
      isLoaded: false,
      creditsTotal: 0,
      debitsTotal: 0,
      credits: [],
      debits: [],
    }
  }

  componentDidMount() {
    Promise.all([
      fetch(`https://moj-api.herokuapp.com/credits`).then(data => data.json()),
      fetch(`https://moj-api.herokuapp.com/debits`).then(data => data.json())
      ])
      .then(
        (data) => {
          this.setState({
            credits: data[0],
            debits: data[1],
            isLoaded: true
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .then((data) => {
        let credits = this.state.credits.reduce((acc, item) => acc + item.amount, 0)
        console.log(credits);
        let debits = this.state.debits.reduce((acc, item) => acc + item.amount, 0)
        console.log(debits)
        this.setState({
          creditsTotal: credits,
          debitsTotal: debits,
          accountBalance: credits - debits})
        console.log(this.state.accountBalance)
      }
    )
  }

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);

    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
  );

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route path="/AddCreditsPage" render={AddCreditsComponent}/>
          <Route path="/credits" render ={CreditsComponent}/>
          <Route path="/login" render={LogInComponent}/>
          <Route path="/userProfile" render={UserProfileComponent}/>
          <Route path="/Debits" render={DebitsComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
