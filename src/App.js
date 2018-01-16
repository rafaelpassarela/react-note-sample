import React, { Component } from 'react';
import logo from './logo.svg';
import fire from './fire';
import './App.css';
import Message from './message';

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
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  removeMessage(e) {
    //e.preventDefault();
    alert ('Teste 2');
  }

  render() {
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/> 
        <input type="submit"/> <br/> <br/>
          { /* Render the list of messages */
            this.state.messages.map( message => 
              <Message message={message.text} id={message.id} deleteHandle={this.removeMessage} /> )
          }
      </form>
    );
  }
}

export default App;