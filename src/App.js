import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Admin from './Admin';
import Signin from './Signin'
import Signup from './Signup';
import Header from './Header';
import PrivateRoute from './HOC/PrivateRoute';
import PublicRoute from './HOC/PublicRoute';
import { isUserLoggedIn } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux'

function App() {

  const authenticated = useSelector(state => state.user.authenticated);
  const dispatch = useDispatch();
  useEffect(() => {

    if (!authenticated) {
      dispatch(isUserLoggedIn())
    }

  }, [authenticated, dispatch])
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <PublicRoute path="/signin">
            <Signin />
          </PublicRoute>
          <PublicRoute path="/signup">
            <Signup />
          </PublicRoute>
          <PrivateRoute path="/">
            <Admin />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
