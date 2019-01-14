import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';

class Roster extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            roster: []
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            code: this.refs.code.value
        }
        return axios.post('/roster', data)
          .then((response) => {
            this.setState({
                roster: response.data
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
                    <h1>Get Roster</h1><br/>
                    <input type="text" ref="code" placeholder="Enter class code" required/>
                    <input type="submit" value="get roster"/>
                </form>
                <ul>
                {
                    this.state.roster.map((name, i) => {
                        return <li key={i}>{name}</li>;
                    })
                }
                </ul>
            </React.Fragment>
        )
    }
}
export default Roster;