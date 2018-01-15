import React, { Component } from 'react';
import logo from './logo.svg';
import fire from './fire';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }

  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { 
        text: snapshot.val(), 
        id: snapshot.key };

      // this.setState({ messages: [message].concat(this.state.messages) });
      // replaced by callback function
      this.setState(prevState => ({
        messages: [message].concat(prevState.messages),
      }));
    })
  }

  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( {
      message: this.inputEl.value}
     );
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        <ul>
          <table border='1px'>
          <tr><th>ID</th><th>Message</th></tr>
          { /* Render the list of messages */
            this.state.messages.map( message => <tr><td>{message.id}</td><td>{message.text}</td></tr> )
          }
          </table>
        </ul>
      </form>
    );
  }
}

export default App;