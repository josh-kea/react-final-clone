import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../helpers'
import './NavbarMain.css'

const NavbarMain = (props) => {
    return(
    <nav id="NavbarMain">
        <div className="nav-container">

                <Link to="/" className="logo">Product Research X</Link>


            {!getUser() && (
                <div className="row-end-btns">
                    <Link className="login-btn" to="/login">Login</Link>
                    <Link className="signup-btn"to="/signup">Sign Up</Link>
                </div>

            )}

            {getUser() && (
                <div>
                    <p className="login-btn" onClick={() => logout(() => props.history.push('/'))}>Logout</p>
                </div>
            )}
        </div>

    </nav> 
    )
}


export default withRouter(NavbarMain);