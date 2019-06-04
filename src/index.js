const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get("/", (req, res) => {
  res.sendfile("pages/client.html")
});

http.listen("3000", () => {
  console.log("Server On!");
});
