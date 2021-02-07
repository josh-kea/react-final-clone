import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../helpers'
import './AdminLeftPanel.css'

const AdminLeftPanel = (props) => {
    // console.log(props.activePanel);

    return(
    <div id="AdminLeftPanel">

            <div className="left-panel-list">

                {/* When activePanel is Home */}

                {props.activePanel === "Home" ? (
                        <Link to="/admin" className="active-panel">Home</Link>
                    ) : (
                        <Link to="/admin">Home</Link>
                    )
                }

                {/* When activePanel is Products */}


                {props.activePanel === "Products" ? (
                       <Link to="/admin/products" className="active-panel">Products</Link>
                    ) : (
                        <Link to="/admin/products">Products</Link>
                    )
                }

                {/* When activePanel is Users */}

                {props.activePanel === "Users" ? (
                       <Link to="/admin/users" className="active-panel">Users</Link>
                    ) : (
                        <Link to="/admin/users">Users</Link>
                    )
                }


            </div>


    </div>
    )
}


export default withRouter(AdminLeftPanel);