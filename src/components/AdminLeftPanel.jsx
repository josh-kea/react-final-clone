import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../helpers'
import './AdminLeftPanel.css'

const AdminLeftPanel = (props) => {
    console.log(props.activePanel);

    return(
    <div id="AdminLeftPanel">

            <div className="left-panel-list">

                {props.activePanel == "Home" ? (
                        <Link to="/admin" className="active-panel">Home</Link>
                    ) : (
                        <Link to="/admin">Home</Link>
                    )
                }



                <Link to="/admin/products">Products</Link>

                

                <Link to="/admin/users">Users</Link>
            </div>


    </div>
    )
}


export default withRouter(AdminLeftPanel);