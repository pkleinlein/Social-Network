const initialState = { listOfOnlineUsers: [] };

export default function(state = initialState, action) {
    if (action.type == "RECEIVE_FRIENDS_AND_WANNABES") {
        console.log("HHHH: ", action.list);
        state = Object.assign({}, state, {
            listOfFriends: action.list
        });
    }

    if (action.type == "ONLINE_USERS") {
        state = Object.assign({}, state, {
            onlineUsers: action.visitors
        });
    }

    if (action.type == "USER_JOINED") {
        state = Object.assign({}, state, {
            onlineVisitors: state.onlineUsers.concat(action.newVisitor)
        });
    }

    if (action.type == "USER_LEFT") {
        state = Object.assign({}, state, {
            onlineVisitors: state.onlineUsers.filter(
                user => user.id != action.userLeft
            )
        });
    }
    if (action.type == "CHAT_MESSAGE") {
        console.log("STATE COMING FROM CHAT MESSAGE ", state);
        state = Object.assign({}, state, {
            messages: [...state.messages, action.message]
        });
    }

    if (action.type == "RECENT_CHATS") {
        state = Object.assign({}, state, {
            messages: action.messages
        });
    }
    if (action.type == "USER_SEARCH") {
        state = Object.assign({}, state, {
            searchResults: action.userList
        });
    }

    //     if (action.type == "ACCEPT_FRIENDSHIP") {
    //         state = {
    //             ...state,
    //             listOfFriends: state.listOfFriends.map(user => {
    //                 if (user.id == action.otherUserId) {
    //                     return {
    //                         ...user,
    //                         status: action.updateFriendship
    //                     };
    //                 } else {
    //                     return user;
    //                 }
    //             })
    //         };
    // }
    //
    // if (action.type == "END_FRIENDSHIP") {
    //     state = {
    //         ...state,
    //         listOfFriends: state.listOfFriends.filter(user => {
    //             if (user.id == action.otherUserId) {
    //                 return;
    //             } else {
    //                 return user;
    //             }
    //         })
    //     };
    // }
    return state;
}
