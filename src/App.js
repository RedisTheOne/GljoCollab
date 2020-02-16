import React from 'react';
import Container from './components/Container';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './components/Login';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Container} />
        <Route exact path="/user/login" component={LogIn} />
        <Route exact path="/user/createAccount" component={CreateAccount} />
      </Router>
    </div>
  );
}

export default App;
