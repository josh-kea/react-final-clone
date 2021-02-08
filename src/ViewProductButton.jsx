import { render } from '@testing-library/react'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from './helpers'
import './ViewProductButton.css'

const ViewProductButton = (props) => {
    return (
        <div className="grid-item-btn-container">
            {!getUser() && (
                <Link className="grid-view-product-btn" to="/signup">Sign Up To View</Link>
            )}
            {
            getUser() && (
                <Link className="grid-view-product-btn" to={`/products/${props.slug}`}>View Product Details</Link>
            )}
        </div>
    )
}


export default withRouter(ViewProductButton);