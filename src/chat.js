import React from "react";
import { getSocket } from "./socket";
import { connect } from "react-redux";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.socket = getSocket();
    }
    componentDidUpdate() {
        console.log("test", this.elem.clientHeight);
        console.log(this.elem.scrollHeight);
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    render() {
        return (
            <div id="chatComponent">
                <div className="chatDisplay" ref={elem => {this.elem = elem;}}>
                    {this.props.messages &&
                        this.props.messages.map(chat => {
                            return (
                                <div className="chatMessage" key={chat.id}>
                                    <img className="chatPhoto" src={chat.photo || "/assets/user.png"}/>
                                    <h3>{chat.first} {chat.last}</h3>
                                    <h1>{chat.message}</h1>
                                    <p>{chat.created_at}</p>
                                </div>
                            );
                        })}
                </div>
                <div id="chatTextBox">
                    <textarea name="textarea" onChange={e => (this[e.target.name] = e.target.value)}/>
                    <button onClick={() => this.socket.emit("chatMessage", this.textarea)}>Submit</button>
                </div>
            </div>
        );
    }
}
const getStateFromRedux = state => {
    return {
        messages: state.messages
    };
};

export default connect(getStateFromRedux)(Chat);
