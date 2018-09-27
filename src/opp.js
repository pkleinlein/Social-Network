import React from "react";
import axios from "./axios";
import Profile from "./profile";
import Logo from "./logo";
import ProfileView from "./ProfileView";
import FriendButt from "./friendButton";


export default class OtherPersonProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("we are in opp componentdidmount function");
        const id = this.props.match.params.id;
        axios
            .get(`/users/${id}.json`)
            .then((data) => {
                console.log(data);
                this.setState({
                    id: id,
                    url: data.data.data.photo,
                    bio: data.data.data.bio,
                    first: data.data.data.first,
                    last: data.data.data.last
                });
            })
            .catch(function(err) {
                console.log("this is the error at OPP catch" + err);
            });
    }
    render() {
        if (!this.state.id) {
            return <h1>This shit failed</h1>;
        } else {
            return (
                <div id="profileView">
                    <ProfileView
                        first={this.state.first}
                        bio={this.state.bio}
                        url={this.state.url}
                    />
                    <FriendButt opId={this.props.match.params.id} />
                </div>
            );
        }
    }
}
