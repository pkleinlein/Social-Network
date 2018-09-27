import React from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import Userz from "./userzzz";
import OtherPersonProfile from "./opp";
import Friends from "./friends";
import OnlineUsers from "./onlineusers";
import Chat from "./chat";
import Search from "./search";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        console.log("component did mount");
        axios
            .get("/user")
            .then(({ data }) => {
                console.log(
                    "this is the data is recive in componentDidMount" + data
                );
                if (data.user.photo) {
                    this.setState({
                        first: data.user.first,
                        last: data.user.last,
                        photo: data.user.photo,
                        bio: data.user.bio,
                        id: data.user.id
                    });
                } else {
                    this.setState({
                        first: data.user.first,
                        last: data.user.last,
                        bio: data.user.bio,
                        photo:
                            "https://www.telegraph.co.uk/content/dam/news/2017/03/17/JS123501723_SWNScom_trans_NvBQzQNjv4BqUa2thMnvKQadTDM5oFKzfDBYCA4OQ4sPy6pRug3nJks.jpg?imwidth=450",
                        id: data.user.id
                    });
                }
            })
            .then(function() {
                console.log("hiiiiiiii");
            })
            .catch(function(err) {
                console.log("component did mount error " + err);
            });
    }
    showUploader() {
        console.log("showUploader triggered");
        this.setState({
            uploaderIsVisible: true
        });
    }
    setImage(imgUrl) {
        this.setState({
            photo: imgUrl,
            uploaderIsVisible: true
        });
    }
    closeModal() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    setBio(bioText) {
        this.setState({
            bio: bioText
        });
    }
    render() {
        if (!this.state.id) {
            return <h1>YOU FAILED AGAIN PAUL</h1>;
        }
        return (
            <div id="app">
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={this.setImage}
                        closeModal={this.closeModal}
                    />
                )}

                <BrowserRouter>
                    <div>
                        <Route path="*"
                            render={() =>(
                                <div id="logo">
                                    <Link to="/"><Logo /></Link>
                                    <a href="/logout"><h1 id="logout">Logout</h1></a>
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div id="profileStart">
                                    <ProfilePic
                                        first={this.state.first}
                                        last={this.state.last}
                                        url={this.state.photo}
                                        bio={this.state.bio}
                                        actionToDo={this.showUploader}
                                    />
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path="/profile"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    bio={this.state.bio}
                                    url={this.state.photo}
                                    actionToDo={this.showUploader}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/users/:id"
                            component={OtherPersonProfile}
                        />
                        <Route exact
                            path="/users"
                            component={Userz}
                        />
                        <Route exact
                            path="/friends"
                            component={Friends}
                        />
                        <Route
                            path="/onlineusers"
                            component={OnlineUsers} />
                        <Route
                            path="/chat"
                            component={Chat} />
                        <Route
                            path="/search"
                            component={Search} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
