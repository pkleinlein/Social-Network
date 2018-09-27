import React, {Component} from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

function ProfilePic(props){
    return (
        <div id="profilePicBigContainer">
            <div id="profile">
                <img src={props.url} onClick={props.actionToDo} />
                <p>Welcome {props.first}!</p>
            </div>
            <div id="startLinks">
                <Link to="/profile"><h1>Edit your Profile</h1></Link>
                <Link to="/users"><h1>Other Users</h1></Link>
                <Link to="/friends"><h1>Friends</h1></Link>
                <Link to="/onlineusers"><h1>Online peoplez</h1></Link>
                <Link to="/chat"><h1>Chat</h1></Link>
                <Link to="/search"><h1>Search userz</h1></Link>
            </div>
        </div>
    );
}

export default ProfilePic;
