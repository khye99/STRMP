import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    handleSignIn(event) {
        event.preventDefault();
        const data = {
            username: this.refs.username.value,
            password: this.refs.password.value
        }
        return axios.post('/signin', data)
          .then((response) => {
            this.props.changeState(response);
          })
          .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="Background"> 
                <form onSubmit={this.handleSignIn}>
                    <label className="Title" >Sign In</label><br />
                    <label className="FieldLabel"> Username </label>
                    <input className="FieldInput" type="text" ref="username" placeholder="Enter username"/>
                    <label className="FieldLabel"> Password </label>
                    <input className="FieldInput" type="password" ref="password" placeholder="Enter password"/>
                    <input className="FieldButton" type="submit" value="Sign In"/>
                </form>
            </div>
        )
    }
}
export default SignIn;