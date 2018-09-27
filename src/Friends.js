import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

import {
    receiveFriendAndWannabes,
    acceptFriendship,
    terminateFriendship
} from "./actions";
import FriendButt from "./friendButton";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(receiveFriendAndWannabes());
    }
    update() {
        this.props.dispatch(receiveFriendAndWannabes());
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Friends</h1>
                <div id="friends">
                    {this.props.friends &&
                        this.props.friends.map(f => (
                            <div className="eachUser" key={f.id}>
                                <Link to={`/users/${f.id}`}>
                                    <img
                                        className="eachUserPicture"
                                        src={f.photo || "/assets/swordfish.jpg"}
                                    />
                                    <p>
                                        {f.first} {f.last}
                                    </p>
                                </Link>
                                <FriendButt opId={f.id} />
                            </div>
                        ))}
                </div>
                <h1>Wannabes</h1>
                <div id="wannabees">
                    {this.props.wannabes &&
                        this.props.wannabes.map(f => (
                            <div className="eachUser" key={f.id}>
                                <Link to={`/users/${f.id}`}>
                                    <img
                                        className="eachUserPicture"
                                        src={f.photo || "/assets/swordfish.jpg"}
                                    />
                                    <p>
                                        {f.first} {f.last}
                                    </p>
                                </Link>
                                <FriendButt opId={f.id} />
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}
const getStateFromRedux = state => {
    // console.log("getStateFromRedux: ", state);
    console.log("STATE: ", state);
    return {
        friends:
            state.listOfFriends &&
            state.listOfFriends.filter(f => f.status == 2),
        wannabes:
            state.listOfFriends &&
            state.listOfFriends.filter(f => f.status == 1)
    };
};

// export default connect(null)(Friends);
export default connect(getStateFromRedux)(Friends);
