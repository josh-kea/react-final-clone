import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../../helpers'
import './SingleUser.css'

const SingleUser = (props) => {
    const [user, setUser] = useState([]);
    const [isModalActive, setModalState] = useState(false);

    // console.log(props)


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
          
        })
        .catch(error => console.log(error))
    }

    // Everytime component mounts, useEffect hook will run.
    useEffect(() => {
        fetchUser();
    }, [])

    let currentDate = new Date();
    const dateCreated = new Date(user.createdAt);
    const timeSinceCreated = currentDate - dateCreated;

    const minutesSinceCreated = dateCreated.getMinutes() - currentDate.getMinutes();
    console.log(currentDate.getMinutes())

    const createdAt = (user) => {
        const createdAtDate = new Date(user.createdAt)
        let dateString = createdAtDate.toString()
        dateString = dateString.split(' ').slice(0, 5).join(' ');

        return dateString;
    }

    function showEditUserModal() {

    }


    const handleUserEditClick = () => {
        showEditUserModal();
    }

    const editUserModal = () => {
        return (
            
            <div className="edit-user-modal">
                <div className="modal-form-wrapper">
                    <div className="modal-form-header">
                        <p>Edit user</p>
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true" onClick={() => setModalState(false)}><path d="M11.414 10l6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"></path></svg>
                    </div>
                    <form className="modal-form">
                        <div class="form-row">
                            <div class="row-wrapper">
                                <p>First Name</p>
                                <input type="text" value={user.firstName}/>
                            </div >
                            <div class="row-wrapper">
                                <p>Last Name</p>
                                <input type="text" value={user.lastName}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-wrapper">
                                <p>Email</p>
                                <input type="text" value={user.email}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-wrapper">
                                <p>Phone Number</p>
                                <input type="text" value={user.phone}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-wrapper  row-end">
                                <div className="form-btn" onClick={() => setModalState(false)}>Cancel</div>
                                <div className="form-btn">Save</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return(
    <div id="SingleUser">
        <div className="single-user-header"> <Link to="/admin/users/" ><img className="back-icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjYxMnB4IiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9Il94MzdfXzQyXyI+DQoJCTxnPg0KCQkJPHBhdGggZD0iTTUzNS41LDBoLTQ1OUMzNC4yNTMsMCwwLDM0LjI1MywwLDc2LjV2NDU5QzAsNTc3Ljc0NywzNC4yNTMsNjEyLDc2LjUsNjEyaDQ1OWM0Mi4yNDcsMCw3Ni41LTM0LjI1Myw3Ni41LTc2LjV2LTQ1OQ0KCQkJCUM2MTIsMzQuMjUzLDU3Ny43NDcsMCw1MzUuNSwweiBNNTczLjc1LDUzNS41YzAsMjEuMTE0LTE3LjExNywzOC4yNS0zOC4yNSwzOC4yNWgtNDU5Yy0yMS4xMzMsMC0zOC4yNS0xNy4xMzYtMzguMjUtMzguMjV2LTQ1OQ0KCQkJCWMwLTIxLjEzMywxNy4xMTctMzguMjUsMzguMjUtMzguMjVoNDU5YzIxLjEzMywwLDM4LjI1LDE3LjExNywzOC4yNSwzOC4yNVY1MzUuNXogTTQyMC43NSwyODYuODc1SDIxOC4yOTNsNzguODE0LTc4LjgxNA0KCQkJCWM3LjQ3OC03LjQ3OCw3LjQ3OC0xOS41ODQsMC0yNy4wNDNjLTcuNDc4LTcuNDc4LTE5LjU4NC03LjQ3OC0yNy4wNDMsMGwtMTA4LjE5LDEwOC4xOWMtNC41NzEsNC41NzEtNi4wMDUsMTAuODYzLTQuOTU0LDE2Ljc5Mg0KCQkJCWMtMS4wNTIsNS45MjksMC4zODMsMTIuMjIxLDQuOTczLDE2LjgxMWwxMDguMTksMTA4LjE5YzcuNDc4LDcuNDc4LDE5LjU4NCw3LjQ3OCwyNy4wNDMsMHM3LjQ3OC0xOS41ODQsMC0yNy4wNDNsLTc4LjgzMy03OC44MzMNCgkJCQlINDIwLjc1YzEwLjU1NywwLDE5LjEyNS04LjU2OCwxOS4xMjUtMTkuMTI1QzQzOS44NzUsMjk1LjQ0Myw0MzEuMzA3LDI4Ni44NzUsNDIwLjc1LDI4Ni44NzV6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" /></Link><h2>{user.email}</h2></div>

        <div className="card-grid">
            <div className="user-card">
                <div className="user-card-header">
                    <img src="" alt=""/>
                    <div className="user-card-info">
                        <p className="card-title">{user.email}</p>
                        <p className="user-card-created-at-date">{createdAt(user)}</p>
                    </div>
                </div>
            </div>
            <div className="overview-card">
                <div className="overview-card-header">
                    <p className="card-title">User overview</p>
                    <p className="overview-edit-btn" onClick={() => setModalState(true)}>Edit</p>
                </div>
                    <div className="overview-card-info">
                    
                    { user.isAdmin ? (<div className="row-badge admin-badge">Admin</div>) : (<div className="row-badge user-badge">User</div>) }
                    { user.isValid ? (<div className="row-badge valid-email">Valid Email</div>) : (<div className="row-badge invalid-email">Invalid Email</div>) }
                    
                </div>
                <div className="overview-email">{user.email}</div>
            </div>
            <div className="timeline-card"></div>

        </div>

        { isModalActive ? editUserModal() : null }



    </div>
    )
}


export default withRouter(SingleUser);