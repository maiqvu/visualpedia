import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, handleAuthCheck, ...rest}) => (
    <Route {...rest} render={
      (props) => {
        return handleAuthCheck() ?
            <Component {...props} /> : <Redirect to='/login'/>;
      }
    }/>
);

export default PrivateRoute;