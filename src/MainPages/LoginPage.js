import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { verifyToken, logout, getUser } from '../helpers';
import './LoginPage.css'

const LoginPage = (props) => {

  const [state, setState] = useState( {
    email: '',
    password: '',
    message: ''
  })

  const handleFormLoginUser = (event) => {
      const { email, password } = state

        fetch(`http://localhost:4000/users/login`, {
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
            return response.json()
        })
        .then(data => {
            if (data.authToken) {
                sessionStorage.setItem('token', JSON.stringify(data.authToken))
                props.history.push('/')
            } else {
                setState({ message: data.message})
            }

        })
        .catch(error => console.log('ERROR'))

    event.preventDefault();
    
}


  function handleChange(name) {
    return function(event) {
      setState({ ...state, [name]: event.target.value })
    };
  };

  useEffect(() => {
    console.log("UseEffect Mounted")
    if (verifyToken()) props.history.push('/')       
  })

  return (
    
    <div className="container">
      { !verifyToken() && (
        <div className="edit-user-modal">
                <div className="modal-form-wrapper">
                    <div className="modal-form-header">
                        <p>Login</p>
                        <Link to="/signup" className="sign-in-btn">Don't have an account? Sign up.</Link>
                    </div>
                    <form className="modal-form" onSubmit={handleFormLoginUser} id="LoginForm">
                        <div className="form-row">
                            <div className="row-wrapper">
                                <p>Email</p>
                                <input value={state.email} onChange={handleChange('email')} type="email" placeholder="Email" required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row-wrapper">
                                <p>Password</p>
                                <input value={state.password} onChange={handleChange('password')} type="password" placeholder="Your password" required/>
                            </div>
                        </div>
                        <div className="form-row">
                            
                            <div className="row-wrapper  row-end">
                                <div className="signup-message">{state.message}</div>
                                <div className="form-btn" onClick={() => props.history.push('/')}>Cancel</div>
                                <button className="form-btn">Log In</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

      )}

      { verifyToken() && (
        <div>Hello <span style={{color:"red"}}>{getUser()}</span>! You are logged in already. <span onClick={() => logout(() => props.history.push('/'))}> Logout</span></div>
      )}

    </div>
  );
}

export default withRouter(LoginPage);
