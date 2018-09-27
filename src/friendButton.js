import React from "react";
import axios from "./axios";

export default class FriendButt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.editButt = this.editButt.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
    }
    componentDidMount() {
        const opId = this.props.opId;
        axios
            .get(`/friendship/${opId}`)
            .then(resp => {
                console.log(
                    "componentDidMount     " +
                        resp.data.recipid +
                        resp.data.senderid
                );
                this.setState({
                    recipId: resp.data.recipid,
                    senderId: resp.data.senderid,
                    status: resp.data.status
                });
                this.editButt();
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    editButt() {
        if (!this.state.status) {
            this.setState({
                text: "Make Friendrequest",
                action: this.makeRequest
            });
        }
        if (this.state.status == 1) {
            if (this.props.opId == this.state.recipId) {
                this.setState({
                    text: "Cancel request",
                    action: this.cancelRequest
                });
            } else {
                this.setState({
                    text: "Accept friendship",
                    action: this.acceptRequest
                });
            }
        }
        if(this.state.status == 2){
            this.setState({
                text: "End friendship",
                action: this.cancelRequest
            });
        }
    }
    makeRequest() {
        axios
            .post("/makerequest", {
                otherId: this.props.opId
            })
            .then(resp => {
                console.log(resp.data.status, resp.data.recipid);
                this.setState({
                    status: resp.data.status,
                    recipId: resp.data.recipid,
                    senderId: resp.data.senderid
                });
                this.editButt();
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    cancelRequest() {
        axios.post("/deleteRequest", {otherId: this.props.opId}).then(() =>{
            console.log("we are here now");
            this.setState({
                status: null,
                recipId: null,
                senderId: null
            });
            this.editButt();
        }).catch(function(err){
            console.log(err);
        });
    }
    acceptRequest(){
        axios.post("/acceptFriendship", {opId: this.props.opId}).then((resp) =>{
            console.log(resp.data.status);
            this.setState({
                status: resp.data.status
            });
            this.editButt();
        });
    }
    render() {
        return (
            <div id="friendButt" onClick={this.state.action}>
                {this.state.text}
            </div>
        );
    }
}
