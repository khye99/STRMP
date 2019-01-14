import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleSignUp(event) {
        event.preventDefault();
        const data = {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            username: this.refs.username.value,
            password: this.refs.password.value,
            identity: this.refs.identity.value
        }
        return axios.post('/signup', data)
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    render() {
        return (
            <div className="Background2">
                <form onSubmit={this.handleSignUp}>
                    <label className="Title">Sign Up</label><br />
                    <label className="FieldLabel"> First Name </label>
                    <input className="FieldInput" type="text" ref="firstName" placeholder="Enter first name"/>
                    <label className="FieldLabel"> Last Name </label>
                    <input className="FieldInput" type="text" ref="lastName" placeholder="Enter last name"/>
                    <label className="FieldLabel"> Username </label>
                    <input className="FieldInput" type="text" ref="username" placeholder="Enter username"/>
                    <label className="FieldLabel"> Password </label>
                    <input className="FieldInput" type="password" ref="password" placeholder="Enter password"/>
                    <label className="FieldLabel"> Are you a student or teacher? </label>
                    <input className="FieldInput" type="text" ref="identity" placeholder="T for teacher, S for student"/>
                    <input className="FieldButton" type="submit" value="Sign Up"/>
                </form>   
            </div>
        )
    }
}
export default SignUp;