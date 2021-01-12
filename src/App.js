import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
class App extends Component {
  constructor() {
    super();

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

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
  );

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
