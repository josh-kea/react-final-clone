import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin, getUser } from '../helpers';

// checking if User isAdmin from express


const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
