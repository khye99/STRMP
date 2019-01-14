import React, { Component } from 'react';
import CreateClass from './CreateClass';
import AddGrade from './AddGrade';
import JoinClass from './JoinClass';
import Schedule from './Schedule';
import Roster from './Roster';
import GetGradesStudent from './GetGradesStudent';
import GetGradesTeacher from './GetGradesTeacher';
import Viz from './Viz';
import { sendMsg, getMsg } from './api';
import './../styles/App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        sendMsg(`${this.props.userdata.username} has joined the chat.`,(msg) => this.setState({ 
            msg
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        sendMsg(`${this.props.userdata.username}: ${this.refs.msg.value}`, (msg) => this.setState({ 
            msg
        }));
    }

    render() {
        return (
            <React.Fragment>
                <h1>Welcome {this.props.userdata.username}</h1>
                <div className="section">
                    <Schedule userdata = {this.props.userdata}/>
                </div>
                {this.props.userdata.identity === 'T' ? <div className="section"><CreateClass userdata = {this.props.userdata} /></div> : null}
                    {this.props.userdata.identity === 'S' ? <div className="section"><JoinClass userdata = {this.props.userdata}/></div> : null}
                <div className="section">
                    <Roster userdata = {this.props.userdata}/>
                </div>
                <div className="section">
                    {this.props.userdata.identity === 'T' ? <GetGradesTeacher userdata = {this.props.userdata}/> : <GetGradesStudent userdata = {this.props.userdata}/>}
                </div>
                    {this.props.userdata.identity === 'T' ? <div className="section"><AddGrade userdata = {this.props.userdata}/></div> : null}
                <div className="section">
                    <h1>Chat</h1>
                    <ul>
                    {
                        this.state.msg.map( number => <li>{number}</li>)
                    }
                    </ul>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" ref="msg" placeholder="Enter message"/>
                        <input type="submit" value="send"/>
                    </form>
                </div>
                <div className="section">
                    <Viz />
                </div>
                <script src="/socket.io/socket.io.js"></script>
            </React.Fragment>
        )
    }
}
export default Home;