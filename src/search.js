import React from "react";
import { connect } from "react-redux";
import { getUsersForSearch, getUsers } from "./actions.js";
import { Link } from "react-router-dom";

class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="searchContainer">
                <input
                    id="searchBar"
                    type="text"
                    name="search"
                    placeholder="find user"
                    ref={elem => {
                        this.text = elem;
                    }}
                    onChange={e =>
                        this.props.dispatch(getUsersForSearch(e.target.value))
                    }
                />
                <div id="resultz">
                    {this.props.searchResults &&
                        this.props.searchResults.map(result => {
                            return (
                                <div id="userzzzResult" key={result.id}>
                                    <Link
                                        to={`/users/${result.id}`}
                                    >
                                        <img
                                            src={
                                                result.photo ||
                                                "/assets/swordfish.jpg"
                                            }
                                        />
                                        {result.first} {result.last}
                                    </Link>
                                </div>
                            );
                        })}
                    {this.props.noResults}
                </div>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    console.log("getStateFromRedux IN SEARCH: ", state);
    return {
        searchResults: state.searchResults || [],
        noResults: state.noResults
    };
};
export default connect(getStateFromRedux)(Search);
