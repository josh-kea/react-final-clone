import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Verify extends React.Component {
    
    constructor(props) {
        super(props);
    }

    state = {
        email: "",
        password: ""
    };


    verifyEmail = (event) => {
        fetch(`http://localhost:4000/verifyEmail/${this.props.match.params.verifyString}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                alert("Email verified!")
            } else {
                alert("Sorry, but that verification link is invalid!")
            }
            return response
        })
        .then(
            this.props.history.push('/')
        )
        .catch(error => console.log('ERROR'))
    }

    componentDidMount() {
        this.verifyEmail();
    }

    render() {
        return (
            <div className="container">
                
            <p>Verifying email...</p>
            
            </div>
        );
    }
}

export default withRouter(Verify);
