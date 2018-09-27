const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:paul-:postgres@localhost:5432/socialnetwork");
const bcrypt = require("bcryptjs");

exports.registerUser = function(first, last, email, password){
    return db.query("INSERT INTO benutzer (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *",[first, last, email, password]);
};
exports.getUserByEmail = function getUserByEmail(email){
    return db.query("SELECT * FROM benutzer WHERE email = $1", [email]);
};
exports.getUserById = function getUserById(userId){
    return db.query("SELECT * FROM benutzer WHERE id = $1", [userId]);
};
exports.saveImage = function saveImage(id, url){
    return db.query("UPDATE benutzer SET photo = $2 WHERE id = $1 RETURNING photo", [id, url]);
};
exports.updateBio = function updateBio(id, bio){
    return db.query("UPDATE benutzer SET bio = $2 WHERE id = $1 RETURNING bio", [id, bio]);
};
exports.getUserzzz = function getUserzzz(){
    return db.query("SELECT id, first, last, photo FROM benutzer ORDER BY id ASC");
};
exports.getFriendshipStatus = function(id, opId){
    return db.query(`SELECT senderId, recipId, status FROM friendship WHERE senderId = $1 AND recipId = $2 OR senderId = $2 AND recipId = $1  `,[id, opId]);
};
exports.makeRequest = function(id, opId){
    return db.query("INSERT INTO friendship (senderId, recipId, status) VALUES ($1, $2, 1) RETURNING status, recipId, senderId",
        [id, opId]);
};
exports.deleteRequest = function(id, opId){
    return db.query("DELETE FROM friendship * WHERE recipId=$1 AND senderId =$2 OR recipId=$2 AND senderId =$1",[id, opId]);
};
exports.acceptFriendship = function(id, opId){
    return db.query("UPDATE friendship SET status=$3 WHERE recipId=$1 AND senderId =$2 OR recipId=$2 AND senderId =$1 RETURNING status",[id, opId, 2]);
};
exports.getFriendsAndWannabes = function(userId) {
    return db.query(
        `
        SELECT benutzer.id, first, last, photo, status
        FROM friendship
        JOIN benutzer
        ON (status = 1 AND recipId = $1 AND senderId = benutzer.id)
        OR (status = 2 AND recipId = $1 AND senderId = benutzer.id)
        OR (status = 2 AND senderId = $1 AND recipId = benutzer.id)
        `,
        [userId]
    );
};
exports.getUsersByIds = function getUsersByIds(arrayOfIds) {
    return db.query(
        `SELECT id, first, last, photo FROM benutzer WHERE id = ANY($1)`,
        [arrayOfIds]
    );
};

exports.getNewOnlineUser = function getNewOnlineUser(id) {
    return db.query(`SELECT id, first, last, photo FROM benutzer WHERE id = $1`, [
        id
    ]);
};
exports.insertChatMessage = function insertChatMessage(id, message) {
    return db.query(
        `INSERT INTO chat (user_id, message)
                    VALUES ($1, $2)
                    RETURNING id, user_id, message, created_at`,
        [id, message]
    );
};

exports.getChatMessages = function getChatMessages() {
    return db.query(`SELECT benutzer.id, first, last, photo, chat.id, user_id, message, chat.created_at FROM benutzer
        JOIN chat
        ON benutzer.id = user_id
        ORDER BY created_at DESC LIMIT 10`);
};

exports.returnMessage = function returnMessage(id) {
    return db.query(
        `SELECT benutzer.id, first, last, photo, message, chat.created_at FROM chat
        LEFT JOIN benutzer
        ON benutzer.id = user_id
        WHERE chat.id = $1
        `,
        [id]
    );
};
module.exports.findThisUserzzz = function userSearch(name) {
    return db.query(
        `SELECT id, first, last, photo FROM benutzer
        WHERE first = $1
        OR last = $1
        `,
        [name]
    );
};
exports.hashPassword = function (plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            console.log(salt);
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }

                resolve(hash);
            });
        });
    });
};
module.exports.checkPassword = function checkPassword(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
