import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../../helpers'
import './AllUsers.css'

const AllUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [sortMethod, setSortMethod] = useState("desc");

    // console.log(sortMethod)
     // 

    const params = props.location.search;
    const sortByQuery = new URLSearchParams(params).get('sortBy');


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
            // Sort users before displaying them
            setUsers(data)
            //const sortedUsers = sortUsers(data, sortByQuery);
            //setUsers(...users, sortedUsers);
          // JSON.parse(sessionStorage.getItem('token'))
          
        })
        .catch(error => console.log(error))
    }

    function sortUsers(sortMethod) {
        let sortedUsers;
        console.log(users)

        switch(sortMethod){
            case "asc":
                console.log("Ascending")
                sortedUsers = users.sort((a,b) => 
                    {
                        console.log(a.createdAt)
                        console.log(b.createdAt)
                        a.date = new Date(a.createdAt);
                        b.date = new Date(b.createdAt);
                        return b.date - a.date;
                    }
                )
                setUsers(sortedUsers)
                break;
            case "desc":
                console.log("Descending")
                sortedUsers = users.sort((a,b) => 
                    {
                        console.log(a.createdAt)
                        console.log(b.createdAt)
                        a.date = new Date(a.createdAt);
                        b.date = new Date(b.createdAt);
                        return a.date - b.date;
                    }
                )
                setUsers(sortedUsers)
                break;
            default:
                return users;
        }
    }

    // Everytime component mounts, useEffect hook will run.
    useEffect(() => {
        fetchUsers();        
    }, [])

    function handleSortMethodChange(event) {
        // Setting the sort method state
        setSortMethod(event.target.value);

        sortUsers(sortMethod);
    }

    return(
    <div id="AllUsers">
        <h1>Users</h1>
        <div className="user-rows">
            <div className="total-users-row">
                <div>{users.length} Total Users</div>
                <div>Sort By 
                    <select value={sortMethod} name="sortBy" onChange={(e) => handleSortMethodChange(e)}>
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>
            </div>
            {
                users.map((user, i) => {
                    return (
                        <Link to={`/admin/users/${user._id}`} className="user-row" key={user._id}>
                            <div className="user-row-email">{user.email}</div>
                            { user.isAdmin ? (<div className="row-badge admin-badge">Admin</div>) : (<div className="row-badge user-badge">User</div>) }
                            { user.isValid ? (<div className="row-badge valid-email">Valid Email</div>) : (<div className="row-badge invalid-email">Invalid Email</div>) }
                            {user.createdAt}
                        </Link>
                    )
                })
            }
        </div>



    </div>
    )
}


export default withRouter(AllUsers);