import React, { Component } from 'react';
import axios from 'axios';
import './../styles/App.css';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            id: this.props.userdata.id,
        }
        return axios.post('/schedule', data)
          .then((response) => {
              this.setState({
                  classes: response.data
              })
          })
          .catch((error) => {
            console.log(error);
          });
    }

    componentDidMount() {
        const data = {
            id: this.props.userdata.id,
        }
        return axios.post('/schedule', data)
          .then((response) => {
              this.setState({
                  classes: response.data
              })
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {

        return (
            <React.Fragment>
                {this.props.userdata.identity === 'T' ? <h1>Your Classes</h1> : <h1>Schedule</h1>}
                <ul>
                    { 
                        this.state.classes.map((name, i) => {
                            return <li key={i}>{name}</li>;
                        })
                    }
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="refresh"/>
                </form>
            </React.Fragment>
        )
    }
}

export default Schedule;