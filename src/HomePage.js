
import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {authenticate, verifyToken, logout, getUser } from './helpers.js';
import NavbarMain from './NavbarMain'
import heroImage from './hero-image-2.svg';
import { ReactComponent as Shopify } from './shopify.svg';
import { ReactComponent as Aliexpress } from './aliexpress.svg';
import { ReactComponent as Ebay } from './ebay.svg';
import { ReactComponent as Amazon } from './amazon.svg';
import { ReactComponent as Woocommerce } from './woocommerce.svg';
import HomeAllProducts from './HomeAllProducts'

import './HomePage.css';

const  HomePage = (props) => {
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
            if (!response.ok) {
              alert('User Not Found! Create a user first to log in.')
            }

            return response.json()
        }).then(data => {
          
          // Set JWT token in sessionStorage, to verify later
          sessionStorage.setItem('token', JSON.stringify(data.authToken))

          if (data.isAdmin) {
            props.history.push('/admin')
          } else {
            props.history.push('/')
          }
        })
        .catch(error => console.log(error))
    }

  return (
    
    <div >
      <NavbarMain></NavbarMain>
      <div className="page-container">
        <div className="page-wrapper">

          <div className="hero-wrapper medium-width">
            <div className="hero-headers">
            <h2 className="hero-subheader">Dropshipping<br></br><span className="accent-purple">made easy</span>.</h2>
              <h2 className="hero-header">Product Research X is a curation of the best new products, every day.</h2>
              
            </div>

            <div className="hero-image">
              <img src={heroImage}></img>
            </div>
          </div>

          <div className="home-banners bg-primary">
            <div className="home-banners-wrapper medium-width">
              <div><Shopify></Shopify></div>
              <div><Aliexpress></Aliexpress></div>
              <div><Amazon></Amazon></div>
              <div><Woocommerce></Woocommerce></div>
              <div><Ebay></Ebay></div>

            </div>
          </div>

          <div className="home-products-section medium-width">
          <h2 className="home-products-header">Our Latest Curated <span className="accent-purple">Winning</span> Products</h2>
          <HomeAllProducts></HomeAllProducts>
          </div>

        </div>
      </div>

    </div>
  );
}

export default withRouter(HomePage);
