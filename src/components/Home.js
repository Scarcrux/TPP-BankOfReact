import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './bank.css';

class Home extends Component {
  render() {
    return (
        <div class ="div">
          <img src="https://image.shutterstock.com/image-vector/bank-icon-logo-vector-260nw-399995245.jpg" alt="bank"/>
          <h1>Bank of React</h1>

          <Link to="/userProfile">User Profile</Link>
          <div><Link to="/Credits">Credits</Link></div>
          <div><Link to="/Debits">Debits</Link></div>

          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;
