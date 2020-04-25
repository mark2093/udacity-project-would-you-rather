import React from 'react';
import {Route, Redirect} from 'react-router-dom';



const PrivateRoute = ({component: Component, displayLogin, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            displayLogin===true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location.pathname}
                }}/>
        )}
    />
);

export default PrivateRoute;