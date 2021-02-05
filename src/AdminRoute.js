import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "./helpers.js";

require('dotenv').config()

// checking if User isAdmin from express
export const isAdmin = () => {
    if(window !== 'undefined') {
        if (sessionStorage.getItem('email')) {
            const userEmail = JSON.parse(sessionStorage.getItem('email'))

            fetch(`${process.env.DATABASE}/admin`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: userEmail
            }
            })
            .then(response => {
            return response
            })
            .then(data => {
                if (data.isAdmin){
                    alert("User is an admin!")
                    return true
                } else if (!data.isAdmin) {
                    alert("User is not an admin!")
                    return false
                }
            })
            .catch(error => console.log('ERROR'))

        } else {
            alert("Can't find user!")
            return false;
        }
    }
};



const AdminRoute = ({ component: Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render={(props) =>
            !isAdmin() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
            }
        />
  )
};

export default AdminRoute;
