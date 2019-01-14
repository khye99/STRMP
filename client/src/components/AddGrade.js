import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';

class AddGrade extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.add = this.add.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            code: this.refs.code.value,
            student_name: this.refs.student_name.value,
            grade: this.refs.grade.value
        }
        return axios.post('/findstudent', data)
          .then((response) => {
            this.add(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    add(data2) {
        return axios.post('/addgrade', data2)
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <h1>Add Grade</h1><br/>
                    <input type="text" ref="student_name" placeholder="Enter student name" required/>
                    <input type="text" ref="code" placeholder="Enter class code" required/>
                    <input type="number" ref="grade" placeholder="Enter grade" required/>
                    <input type="submit" value="submit"/>
                </form>
            </React.Fragment>
        )
    }
}
export default AddGrade;