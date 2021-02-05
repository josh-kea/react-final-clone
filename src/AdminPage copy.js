import React, { useState, useEffect } from "react";
import { isAdmin } from './helpers.js';
import { Link, withRouter } from 'react-router-dom';

require("dotenv").config();

const AdminPage = (props) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const email = state.email;
  const password = state.password;

  function handleChange(stateProperty) {
    return function (event) {
      setState({ ...state, [stateProperty]: event.target.value });
    };
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // ------------------------------------------- Start Fetch
    // fetch(`${process.env.EXPRESS_SERVER}/admin`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       alert("User Found!");
    //     } else {
    //       alert("User Not Found! Create a user first to log in.");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const user = data;
    //     console.log(data)
    //     user.isAdmin && alert("User is an Admin")
    //     !user.isAdmin && alert("User is not an Admin")
    //     setState({...state, isAdmin: user.isAdmin })

    //     props.history.push("/");
    //   })
    //   .catch((error) => console.log(error));
    // ------------------------------------------ End Fetch
  };

  return (
    <div className="container">
      {!isAdmin() && (
        <div>
            <div>You are not an admin.</div>
            <Link to="/">Back to home page.</Link>
            
        </div>
      )}

      {isAdmin() && (
          <div>Congrats! You are an admin.</div>
      )}
    </div>
  );
};

export default AdminPage;
