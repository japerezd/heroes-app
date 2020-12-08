import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
// Si no esta autenticado, manda el componente el cual es el login
    return (
        <Route {...rest}
            component = { props => (
                (!isAuthenticated)
                    ? <Component {...props}/>
                    : <Redirect to="/"/>
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}