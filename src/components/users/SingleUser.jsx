import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../../helpers'
import './SingleUser.css'

const SingleUser = (props) => {
    const [user, setUser] = useState([]);

    console.log(props)


    function fetchUser(){
        fetch(`http://localhost:4000/users/${props.match.params.id}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        }).then(data => {

            setUser(data)

          // JSON.parse(sessionStorage.getItem('token'))
          
        })
        .catch(error => console.log(error))
    }

    // Everytime component mounts, useEffect hook will run.
    useEffect(() => {
        fetchUser();
    }, [])

    return(
    <div id="SingleUser">
        <h1>Users</h1>
        <div className="user-rows">
            <div className="total-users-row">
                <div>{user.email}</div>
                <div>Sort By</div>
            </div>

        </div>



    </div>
    )
}


export default withRouter(SingleUser);