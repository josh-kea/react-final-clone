import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Signup extends React.Component {
    state = {
        username: "",
        password: ""
    };

    // handleFormSubmit = (event) => {
    //     const { firstName, lastName } = this.state;
    //     const { onFormSubmitted, history } = this.props;

    //     event.preventDefault();
        
    //     onFormSubmitted(firstName, lastName);

    //     history.push("/");
    // };

    handleFormCreateUser = (event) => {
        const { username, password } = this.state
        

        fetch('http://localhost:4000/users', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: password
            })
        })
        .then(response => {
            return response
        })
        .then(data => console.log(data))
        .catch(error => console.log('ERROR'))


        event.preventDefault();

        // Once useris created, user is taken back to login page
        this.props.history.push("/");


    }

    handleInputChanged = (event) => {
        this.setState({[event.target.id]: event.target.value });
    };


    render() {
        return (
            <div className="container">
                
            <form onSubmit={this.handleFormCreateUser} >
                <div>Sign Up</div>
                <input type="text" id="username" placeholder="Username" onChange={this.handleInputChanged} />
                <input type="password" id="password" placeholder="Password"  onChange={this.handleInputChanged} />
                <button type="submit">Submit</button>
            </form>
            <Link to="/">Already have an account? Sign in.</Link>
            </div>
        );
    }
}

export default withRouter(Signup);
