import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../../helpers'
import './AllProducts.css'

const AllProducts = (props) => {
    const [products, setProducts] = useState([]);

    return(
    <div id="AllProducts">

            <div className="left-panel-list">

                {/* When activePanel is Home */}

                {props.activePanel == "Home" ? (
                        <Link to="/admin" className="active-panel">Home</Link>
                    ) : (
                        <Link to="/admin">Home</Link>
                    )
                }

                {/* When activePanel is Products */}


                {props.activePanel == "Products" ? (
                       <Link to="/admin/products" className="active-panel">Products</Link>
                    ) : (
                        <Link to="/admin/products">Products</Link>
                    )
                }

                {/* When activePanel is Users */}

                {props.activePanel == "Users" ? (
                       <Link to="/admin/users" className="active-panel">Users</Link>
                    ) : (
                        <Link to="/admin/users">Users</Link>
                    )
                }


            </div>


    </div>
    )
}


export default withRouter(AllProducts);