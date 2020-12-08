import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
    const { path } = props;
    const token = localStorage.getItem('token');
    if (token) {

        return <Route path={path}>
            {props.children}
        </Route>
    } else {
        return <Redirect to='/signin' />
    }
}

export default PrivateRoute
