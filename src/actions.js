import axios from "./axios";

export function receiveFriendAndWannabes(){
    return axios.get("/friends.json").then(resp =>{
        console.log("Friend&Wannabes    " + resp);
        return{
            type: "RECEIVE_FRIENDS_AND_WANNABES",
            list: resp.data.allfriends
        };
    });
}
export function onlineUsers(data) {
    return {
        type: "ONLINE_USERS",
        visitors: data
    };
}

export function userJoined(user) {
    return {
        type: "USER_JOINED",
        newVisitor: user
    };
}
export function getUsersForSearch(name) {
    return axios
        .get(`/allUsers/search?q=${encodeURIComponent(name)}`)
        .then(resp => {
            return {
                type: "USER_SEARCH",
                userList: resp.data
            };
        });
}
export function userLeft(user) {
    console.log("checking from userLeft", user);
    return {
        type: "USER_LEFT",
        userLeft: user
    };
}
export function chatMessage(message) {
    console.log("this is the 'payload'", message);
    return {
        type: "CHAT_MESSAGE",
        message: message
    };
}

export function recentChatMessages(messages) {
    console.log("all messages", messages);
    return {
        type: "RECENT_CHATS",
        messages: messages
    };
}
// export function acceptFriendship(otherUserId) {
//     return axios
//         .post("/acceptfriendrequest", {
//             recipient: otherUserId
//         })
//         .then(resp => {
//             // console.log("acceptFriendship axios response: ", resp);
//             // console.log("the status: ", resp.data.data.status);
//             return {
//                 type: "ACCEPT_FRIENDSHIP",
//                 updateFriendship: resp.data.data.status, //or2
//                 otherUserId
//             };
//         });
// }
//
// export function terminateFriendship(otherUserId) {
//     return axios
//         .post("/deletefriendrequest", {
//             recipient: otherUserId
//         })
//         .then(resp => {
//             // console.log("/deletefriendrequest axios resp: ", resp);
//             return {
//                 type: "END_FRIENDSHIP",
//                 updateFriendship: null,
//                 otherUserId
//             };
//         });
// }
