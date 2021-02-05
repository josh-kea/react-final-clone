import React from 'react';

export default class Signup extends React.Component {
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
        

        fetch('http://localhost:4000/users'), {
            method:'POST',
            body: {
                name: username,
                password: password
            }
        }.then()


        event.preventDefault();


    }

    handleInputChanged = (event) => {
        this.setState({[event.target.id]: event.target.value });
    };


    render() {
        return (
            <form onSubmit={this.handleFormCreateUser} >
                <div>Sign Up</div>
                <input type="text" id="username" placeholder="Username" onChange={this.handleInputChanged} />
                <input type="password" id="password" placeholder="Password"  onChange={this.handleInputChanged} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}
