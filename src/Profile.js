import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";
import Bio from "./bio";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showBioInput = this.showBioInput.bind(this);
        this.closeBioInput = this.closeBioInput.bind(this);
    }
    showBioInput() {
        this.setState({
            bioFieldVisible: true
        });
    }

    closeBioInput() {
        this.setState({
            bioFieldVisible: false
        });
    }
    render() {
        return (
            <div id="profileDiv">
                <ProfilePic
                    actionToDo={this.props.actionToDo}
                    url={this.props.url}
                    first={this.props.first}
                    last={this.props.last}
                />

                <h1>
                    Welcome to your profile {this.props.first} {this.props.last}!
                </h1>
                <h3>Add your bio below and let your friends know what you are up to</h3>
                {this.state.bioFieldVisible && (
                    <Bio
                        setBio={this.props.setBio}
                        closeBio={this.closeBioInput}
                    />
                )}
                <p>{this.props.bio}</p>
                <p id="addBio" onClick={this.showBioInput}>
                    {this.props.bio ? "Edit" : "Add a bio"}
                </p>
            </div>
        );
    }
}

export default Profile;
