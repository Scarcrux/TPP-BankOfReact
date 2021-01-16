import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import AddCreditsPage from './components/AddCreditsPage';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
        
      }
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
  
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const CreditsComponent = () => (<Credits />)
    const DebitsComponent = () => (<Debits />)
    const AddCreditsComponent = () => (<AddCreditsPage />)
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
