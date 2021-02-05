import React, { useState } from 'react';


const Signup = () => {

    const [state, setState] = useState({
        // state
        username: '',
        password: ''
      })

    const handleFormCreateUser = event => {
        event.preventDefault();
        const { username, password } = this.state
        

        fetch('http://localhost:4000/users', {
            method:'POST',
            body: {
                name: username,
                password: password
            }
        })
    }

    function handleInputChanged(event) {
        this.setState({[event.target.id]: event.target.value });
    };



    return (
        <form onSubmit={handleFormCreateUser} >
            <div>Sign Up</div>
            <input type="text" id="username" placeholder="Username" onChange={handleInputChanged} />
            <input type="password" id="password" placeholder="Password"  onChange={handleInputChanged} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Signup;