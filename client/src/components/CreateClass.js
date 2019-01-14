import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';

class CreateClass extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            code: this.refs.code.value,
            name: this.refs.name.value,
            owner_id: this.props.userdata.id,
            owner_name: this.props.userdata.username,
            student_id: this.props.userdata.id,
            student_name: this.props.userdata.username,
        }
        return axios.post('/createclass', data)
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
                <h1>Create Class</h1><br/>
                <input type="text" ref="code" placeholder="enter class code"/>
                <input type="text" ref="name" placeholder="enter class name"/>
                <input type="submit" value="create"/>
            </form>
        )
    }
}
export default CreateClass;