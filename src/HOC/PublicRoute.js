import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

function PublicRoute({ children, ...rest }) {
    const isUserLoggedIn = useSelector(state => state.user.authenticated);
    if (isUserLoggedIn) {
        return <Redirect to='/' />
    } else {
        return <Route {...rest}>{children}</Route>
    }
}

export default PublicRoute
