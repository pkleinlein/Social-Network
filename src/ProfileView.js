import React from "react";
import axios from "./axios";


export default class ProfileView extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div>
                <h1>Welcome to {this.props.first}´s profile</h1>
                <h2>Bio: {this.props.bio}</h2>
                <img src={this.props.url || "/assets/swordfish.jpg"} />
            </div>
        );
    }
}
