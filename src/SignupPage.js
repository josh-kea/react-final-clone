import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignupPage.css'

class SignupPage extends React.Component {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        message:""
    };

    handleFormCreateUser = (event) => {
        const { firstName, lastName, email, password } = this.state

        if (this.validEmail(email) && this.validPassword(password) && this.validNames(firstName, lastName)) {
            // /POST IF STATES ARE VALID
            
            fetch(`http://localhost:4000/users`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            })
            .then(response => {
                if(response.ok) {
                    alert('User created successfully')
                } else {
                    // alert('User already exists')
                }
                return response.json()
            })
            .then(data => {
                if (data.authToken) {
                    sessionStorage.setItem('token', JSON.stringify(data.authToken))
                    this.props.history.push('/')
                } else {
                    this.setState({ message: data.message})
                }
    
            })
            .catch(error => console.log('ERROR'))

            // END /POST IF STATE ARE VALID
        }
        event.preventDefault();
        
    }

    handleInputChanged = (event) => {
        this.setState({[event.target.id]: event.target.value });
    };

    validEmail(email) {
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexEmail.test(String(email).toLowerCase())){
            return true;
        }   else {
            this.setState({ message: "Please enter a valid email."})
            return false;
        }
    }

    validPassword(password) {
        const regexPassword = /^.*[0-9].*$/;
        if( regexPassword.test(String(password))){
            return true;
        } else {
            this.setState({ message: "Password must be longer than 3 characters & contain at least one digit."})
            return false;
        }
    }

    validNames(firstName, lastName) {
        if( firstName.length > 0 && lastName.length > 0){
            return true;
        } else {
            this.setState({ message: "Please enter your full name."})
            return false;
        }
    }

    validateInput(event, type) {
        const input = event.target;
       
        switch(type){
            case "name":
                if (input.value.length > 0) {
                    input.classList.add("valid")
                    input.classList.remove("invalid")
                } else {
                    input.classList.add("invalid")
                    input.classList.remove("valid")
                }
            break;
            case "email":
                const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let email = input.value;
                if( regexEmail.test(String(email).toLowerCase()) ){
                    input.classList.add("valid")
                    input.classList.remove("invalid")
                } else {
                    input.classList.add("invalid")
                    input.classList.remove("valid")
                }
            break;
            case "password":
                const regexPassword = /^.*[0-9].*$/;
                let password = input.value;
                if( regexPassword.test(String(password))){
                    input.classList.add("valid")
                    input.classList.remove("invalid")
                    this.setState({ message: ""})
                } else {
                    input.classList.add("invalid")
                    input.classList.remove("valid")
                    this.setState({ message: "Password must contain at least one digit."})
                }
            break;
            default:
                break;

        }
    }


    render() {
        return (
            <div className="container">

            <div className="edit-user-modal">
                <div className="modal-form-wrapper">
                    <div className="modal-form-header">
                        <p>Sign Up</p>
                        <Link to="/login" className="sign-in-btn">Already have an account? Sign in.</Link>
                    </div>
                    <form className="modal-form" onSubmit={this.handleFormCreateUser} id="SignUpForm">
                        <div className="form-row">
                            <div className="row-wrapper">
                                <p>First Name</p>
                                <input type="text" id="firstName" placeholder="First Name" onChange={this.handleInputChanged} onBlur={(e) => this.validateInput(e, "name")}/>
                            </div >
                            <div className="row-wrapper">
                                <p>Last Name</p>
                                <input type="text" id="lastName" placeholder="Last Name" onChange={this.handleInputChanged} onBlur={(e) => this.validateInput(e, "name")}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row-wrapper">
                                <p>Email</p>
                                <input type="email" id="email" placeholder="Email address" onChange={this.handleInputChanged} onBlur={(e) => this.validateInput(e, "email")}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row-wrapper">
                                <p>Password</p>
                                <input type="password" id="password" placeholder="Password" onChange={this.handleInputChanged} onBlur={(e) => this.validateInput(e, "password")} />
                            </div>
                        </div>
                        <div className="form-row">
                            
                            <div className="row-wrapper  row-end">
                                <div className="signup-message">{this.state.message}</div>
                                <div className="form-btn" onClick={() => this.props.history.push('/')}>Cancel</div>
                                <button className="form-btn">Sign Up</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>


            </div>
        );
    }
}

export default withRouter(SignupPage);
