import React from "react";
import ReactDOM from "react-dom";

var styleId = {
  color: 'gray',
  padding: '20px',
  fontSize: '50%'
}

export class Message extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {message : ''};
  }

  render() {
    let text = this.props.message;
    return (
      <div>
        <img src="img/recycle_bin.png" onClick={this.props.deleteHandle} /> - {text}
        <small style={styleId}>{this.props.id}</small><hr/>
      </div>
    )
  }
}

export default Message;