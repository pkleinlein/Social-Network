const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const csurf = require("csurf");
const bodyParser = require("body-parser");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const s3 = require("./s3");
const config = require("./config");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("public"));

app.use(compression());

app.use(require("cookie-parser")());

const cookieSessionMiddleware = cookieSession({
    secret: "Arife Tokats",
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
app.post("/register", function(req, res) {
    db
        .hashPassword(req.body.password)
        .then(function(hashedPass) {
            return db.registerUser(req.body.first, req.body.last, req.body.email, hashedPass);
        })
        .then(function(result) {
            req.session.userId = result.rows[0].id;
            req.session.first = result.rows[0].first;
            req.session.last = result.rows[0].last;
            req.session.email = result.rows[0].email;
        })
        .then(function() {
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});
app.post('/upload',uploader.single('file'), s3.upload, (req, res) => {
    db.saveImage(req.session.userId, config.s3Url + req.file.filename).then(function(result) {
        res.json(
            result.rows[0].photo
        );
    }).catch(function(err) {
        console.log("error at app.post upload route " + err);
    });
});


app.post("/login", function(req, res) {
    let userId;
    db
        .getUserByEmail(req.body.email)
        .then(function(data) {
            userId = data.rows[0].id;
            return db.checkPassword(req.body.password, data.rows[0].password);
        })
        .then(function(data) {
            if (data) {
                req.session.userId = userId;
                res.json({
                    success: true
                });
            } else {
                throw new Error();
            }
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});
app.post("/uploadbio", function(req, res){
    db.updateBio(req.session.userId, req.body.bio).then(function(data){
        res.json(data.rows[0]);
    }).catch(function(err){
        console.log(err);
    });
});

app.get("/users/:id.json", function(req,res){
    db.getUserById(req.params.id).then((data) =>{
        res.json({
            data: data.rows[0]
        });
    });
});

app.get("/friendship/:id", function(req, res){
    db.getFriendshipStatus(req.session.userId, req.params.id).then((data) =>{
        res.json(data.rows[0]);
    }).catch(function(err){
        console.log(err);
    });
});
app.post("/makerequest", function(req, res){
    db.makeRequest(req.session.userId, req.body.otherId).then(function(result){
        res.json(result.rows[0]);
    });
});
app.post("/deleteRequest", function(req, res){
    db.deleteRequest(req.session.userId, req.body.otherId).then(() =>{
        res.json({
            success: true
        });
    }).catch(function(err){
        console.log(err);
    });
});
app.post("/acceptFriendship", function(req, res){
    db.acceptFriendship(req.session.userId, req.body.opId).then((result) =>{
        res.json(result.rows[0]);
    });
});
app.get("/allUsers/search", function(req, res) {
    db
        .userSearch(req.query.q)
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => {
            console.log(err);
        });
});
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
app.get("/friends.json", (req, res) => {
    console.log("cool new route");
    db.getFriendsAndWannabes(req.session.userId).then(results => {
        res.json({
            allfriends: results.rows
        });
        console.log("/friends route results", results.rows);
    });
});
app.get("/user", function(req, res){
    return db.getUserById(req.session.userId).then(function(result){
        res.json({
            user: result.rows[0],
            success : true
        });
    }).catch(function(err){
        console.log(err);
    });
});

app.get("/userzzz", function(req,res){
    return db.getUserzzz().then(function(result){
        res.json(result.rows);
    });
});

app.get("/logout", function(req,res){
    req.session = null;
    res.redirect("/welcome");
});

app.get('/welcome', function(req, res) {
    if(req.session.userId){
        res.redirect("/");
    }else{
        res.sendFile(__dirname + '/index.html');
    }
});
app.get('*', function(req, res) {
    if(!req.session.userId){
        res.redirect("/welcome");
    }else{
        res.sendFile(__dirname + '/index.html');
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

let onlineUsers = {};

io.on("connection", function(socket) {
    console.log("connection is in the fcking house and nowhere fkcing else");
    if (!socket.request.session || !socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const socketId = socket.id;
    const userId = socket.request.session.userId;
    onlineUsers[socket.id] = userId;
    var userIds = Object.values(onlineUsers);

    db.getUsersByIds(Object.values(onlineUsers)).then(({ rows }) => {
        socket.emit("onlineUsers", rows);
    });

    db.getChatMessages().then(({ rows }) => {
        io.sockets.emit("recentChatMessages", rows.reverse());
    });

    let count = Object.values(onlineUsers).filter(id => id == userId).length;

    socket.on("chatMessage", message => {
        db.insertChatMessage(userId, message).then(({ rows }) => {
            let chatId = rows[0].id;
            db.returnMessage(chatId).then(({ rows }) => {
                io.sockets.emit("chatMessage", rows[0]);
            });
        });
    });

    if (count == 1) {
        db.getNewOnlineUser(userId).then(({ rows }) => {
            socket.broadcast.emit("userJoined", rows);
        });
    }

    socket.on("disconnect", function() {
        const thisUserId = onlineUsers[socketId];
        delete onlineUsers[socketId];
        let userIndex = userIds.indexOf(userId);
        userIds.splice(userIndex, 1);

        if (userIds.indexOf(userId) == -1) {
            io.sockets.emit("userLeft", thisUserId);
        }
    });
});
