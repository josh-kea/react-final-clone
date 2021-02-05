import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {authenticate, getToken, logout, getUser } from './helpers.js';

const  App = (props) => {

  const [state, setState] = useState( {
    email: '',
    password: ''
  })

  const email = state.email
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
                email: email,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
              alert('User Found!')
            } else {
              alert('User Not Found! Create a user first to log in.')
            }
            return response.json()
        }).then(data => {

          sessionStorage.setItem('token', JSON.stringify(data.token))
          sessionStorage.setItem('email', JSON.stringify(data.email))
          // JSON.parse(sessionStorage.getItem('token'))
          props.history.push('/')
        })
        .catch(error => console.log(error))
    }

  return (
    
    <div className="container">
      { !getToken() && (
        <div>        
          <div>Log In</div>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} name="email" onChange={handleChange('email')}></input>

            <label>Password</label>
            <input type="password" value={password} onChange={handleChange('password')} name="password"></input>

            <button>Sign In</button>

          </form>
          <Link to="/signup">Don't have an account yet? Signup.</Link>
        </div>
      )}

      { getToken() && (
        <div>Hello <span style={{color:"red"}}>{getUser()}</span>! You are logged in already. <span onClick={() => logout(() => props.history.push('/'))}> Logout</span></div>
      )}

    </div>
  );
}

export default withRouter(App);
