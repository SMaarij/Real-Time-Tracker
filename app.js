const express = require('express');
const path = require('path');
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    })
    socket.on("disconnect",function(){
        io.emit("user-disconnect");
    })
});


// Define a route
app.get("/", function(req, res) {
    res.render("index");
});

// Start the server
server.listen(3000, function() {
    console.log('Server is running on port 3000');
});
