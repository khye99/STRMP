import React, { Component } from 'react';
import Home from './Home.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import './../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: null,
      identity: null,
    }
    this.changeState = this.changeState.bind(this);
  }
  changeState(response) {
    this.setState({
      id: response.data.id,
      username: response.data.username,
      identity: response.data.identity
    })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.id == null ? 
        <React.Fragment>
          <div className=""><SignIn changeState={this.changeState}/> </div>
      
          <SignUp />
        </React.Fragment> : 
        <Home userdata={{id: this.state.id, username: this.state.username, identity: this.state.identity}}/>}
      </React.Fragment>
    );
  }
}
export default App;