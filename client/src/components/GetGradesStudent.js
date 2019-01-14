import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';

class GetGradesStudent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            grades: []
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            code: this.refs.code.value,
            student_id: this.props.userdata.id,
            student_name: this.props.userdata.username,
        }
        return axios.post('/getgradesstudent', data)
          .then((response) => {
            this.setState({
                grades: response.data
            })
          })
          .catch((error) => {
            console.log(error);
          });
        }
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <h1>Get Grades</h1><br/>
                    <input type="text" ref="code" placeholder="Enter class code"/>
                    <input type="submit" value="get grades"/>
                </form>
                <ul>
                {
                    this.state.grades.map((name, i) => {
                        return <li key={i}>{name}</li>;
                    })
                }
                </ul>
            </React.Fragment>
        )
    }
}
export default GetGradesStudent;