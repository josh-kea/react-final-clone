import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../../helpers'
import './AllUsers.css'

const AllUsers = (props) => {
    const [users, setUsers] = useState([]);


    function fetchUsers(){
        fetch(`http://localhost:4000/users`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        }).then(data => {

            setUsers(data)

          // JSON.parse(sessionStorage.getItem('token'))
          
        })
        .catch(error => console.log(error))
    }

    // Everytime component mounts, useEffect hook will run.
    useEffect(() => {
        fetchUsers();
    }, [])

    return(
    <div id="AllUsers">
        <h1>Users</h1>
        <div className="user-rows">
            <div className="total-users-row">
                <div>{users.length} Total Users</div>
                <div>Sort By</div>
            </div>
            {
                users.map((user, i) => {
                    return (
                        <Link to={`/admin/users/${user._id}`} className="user-row" key={user._id}>
                            <div className="user-row-email">{user.email}</div>
                            { user.isAdmin ? (<div className="row-badge admin-badge">Admin</div>) : (<div className="row-badge user-badge">User</div>) }
                            { user.isValid ? (<div className="row-badge valid-email">Valid Email</div>) : (<div className="row-badge invalid-email">Invalid Email</div>) }
                        </Link>
                    )
                })
            }
        </div>



    </div>
    )
}


export default withRouter(AllUsers);