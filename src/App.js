import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {authenticate, logout, getUser } from './helpers.js';

const  App = (props) => {

  const [state, setState] = useState( {
    username: '',
    password: ''
  })

  const username = state.username
  const password = state.password

  function handleChange(stateProperty) {
    return function(event) {
      setState({ ...state, [stateProperty]: event.target.value })
    };
};

    const handleSubmit = event => {
      event.preventDefault();        

        fetch('http://localhost:4000/users/login', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
              alert('User logged in successfully.')
              // authenticate(response)
            } else {
              alert('User Not Found! Create a user first to log in.')
            }
            return response.json()
        }).then(data => {
          console.log(data)
          // authenticate user and store token and user name in session storage
          // authenticate(data)

          // console.log(data.accessToken)
          // console.log(data.username)

          sessionStorage.setItem('token', JSON.stringify(data.accessToken))
          sessionStorage.setItem('user', JSON.stringify(data.username))
          // JSON.parse(sessionStorage.getItem('token'))
          props.history.push('/')
        })
        .catch(error => console.log(error))
    }

  return (
    
    <div className="container">
      { !getUser() && (
        <div>        
          <div>Log In</div>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" value={username} name="username" onChange={handleChange('username')}></input>

            <label>Password</label>
            <input type="password" value={password} onChange={handleChange('password')} name="password"></input>

            <button>Sign In</button>

          </form>
          <Link to="/signup">Don't have an account yet? Signup.</Link>
        </div>
      )}

      { getUser() && (
        <div>Hello <span style={{color:"red"}}>{getUser()}</span>! You are logged in already. <span onClick={() => logout(() => props.history.push('/'))}> Logout</span></div>
      )}

    </div>
  );
}

export default withRouter(App);
