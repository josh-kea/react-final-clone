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
            <div className="total-users-row">
                <div>{users.length} Total Users</div>
                <div>Sort By</div>
            </div>
            {
                users.map((user, i) => {
                    return (
                        <div className="user-row" key={user._id}>{user.email}</div>
                    )
                })
            }



    </div>
    )
}


export default withRouter(AllUsers);