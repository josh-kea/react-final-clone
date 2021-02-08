import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../../helpers'
import './AdminNav.css'

const AdminNav = (props) => {
    return(
    <nav className="navbar">
        <ul>
            <li >
                <Link to="/admin" className="admin-badge">Product Research X</Link>
            </li>
            <li>
                <Link to="/admin/products/new">Add New Product</Link>
            </li>

            {!getUser() && (
                <li>
                    <Link to="/login">Login</Link>
                </li>
            )}

            {getUser() && (
                <li>
                    <p onClick={() => logout(() => props.history.push('/'))}>Logout</p>
                </li>
            )}

        </ul>

    </nav> 
    )
}


export default withRouter(AdminNav);