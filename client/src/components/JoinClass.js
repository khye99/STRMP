import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';

class JoinClass extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.join = this.join.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            code: this.refs.code.value,
            name: this.refs.name.value,
            student_id: this.props.userdata.id,
            student_name: this.props.userdata.username,
        }
        return axios.post('/findclass', data)
          .then((response) => {
            this.join(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    join(data) {
        return axios.post('/joinclass', data)
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Join Class</h1><br/>
                <input type="text" ref="code" placeholder="enter class code" required/>
                <input type="text" ref="name" placeholder="enter class name" required/>
                <input type="submit" value="join"/>
            </form>
        )
    }
}

export default JoinClass;