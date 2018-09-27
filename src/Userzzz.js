import React, {Component} from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Userz extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        axios.get("/userzzz").then((resp) => {
            console.log(resp.data);
            this.setState({
                users: resp.data
            });
        }).then(function(){
            console.log("success");
        }).catch(function(err){
            console.log(err);
        });
    }
    render(){
        return (
            <div id="userz">
                <div id="innerUserz">
                    {this.state.users &&
                        this.state.users.map(user => {
                            return (
                                <Link to={`/users/${user.id}`} key={user.id}>
                                    <div className="eachUser" key={user.id}>
                                        <img className="userPhotos"src={user.photo || "assets/swordfish.jpg"}/>
                                        {user.first} {user.last}
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        );
    }
}
