import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Admin from './Admin';
import Signin from './Signin'
import Signup from './Signup';
import Header from './Header';
function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Admin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
