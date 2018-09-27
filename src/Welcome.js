// import React from "react";
// import Register from "./register";
// import Login from "./login";
//
// export default function Welcome() {
//     return (
//         <div id="welcome">
//             <h1>Welcome to social network</h1>
//             <Register />
//             <Login />
//         </div>
//     );
// }
import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import Logo from "./Logo";
import Register from "./Register";
import Login from "./Login";

export default function Welcome() {
    return (
        <div id="welcome">
            <Logo />
            <div id="welcomeContainer">
                <h1 id ="welcomeHeader">Welcome to Laconnect</h1>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
