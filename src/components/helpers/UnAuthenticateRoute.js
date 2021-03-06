import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnAuthenticatedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isLoggedIn ? (
        <Redirect
          to={{
            pathname: "/users/events",
            state: { from: props.location }
          }}
        />
      ) : (
          <Component {...props} {...rest} />
        )
    }
    }
  />
);

export default UnAuthenticatedRoute