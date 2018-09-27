import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
    }
    handleSubmit() {
        const { first, last, email, password } = this;
        axios
            .post("/register", {
                first,
                last,
                email,
                password
            })
            .then(resp => {
                if (resp.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div id="register" className="container">
                {this.state.error && <div className="err">Oops! You suck</div>}
                <h1>Register</h1>
                <input type="text" name="first" placeholder="first name" onChange={this.handleInput}/>
                <input type="text" name="last" placeholder="last name" onChange={this.handleInput}/>
                <input type="email" name="email" placeholder="email" onChange={this.handleInput}/>
                <input type="password" name="password" placeholder="password" onChange={this.handleInput}/>
                <button onClick={this.handleSubmit}>Register</button>
                <p>You already have created an account? Login <Link to="/login">here.</Link></p>
            </div>
        );
    }
}
export default Register;
