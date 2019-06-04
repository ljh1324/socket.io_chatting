var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req, res){
  res.sendfile('pages/client.html');
});

var count=1;

// 사용자가 웹사이트에 접속하게 되면 socket.io에 의해 'connection' event가 자동으로 발생됩니다.
// io.on(EVENT,함수)는 서버에 전달된 EVENT를 인식하여 함수를 실행시키는 event listener입니다. 
// 이때 함수에는 접속한 사용자의 socket이 parameter로 전달됩니다. 
// 해당 접속자(socket)에 관련한 event들은 이 'connection' event listener 안에 작성되어야 합니다.
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
  var name = "user" + count++;

  // io.to(socket.id).emit 을 사용하여 해당 socket.id에만 event를 전달
  io.to(socket.id).emit('change name',name);

  // socket.on(EVENT,함수)는 해당 socket에 전달된 EVENT를 인식하여 함수를 실행시키는 event listener
  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });

  // 'send message' event는 client.html에 작성된 사용자 정의 event로 접속자가 채팅메세지를 전송하는 경우에 발생합니다. 
  // 이 event는 채팅메세지를 보낸 접속자의 이름과 채팅메세지를 parameter로 함께 전달합니다.
  // 'send message' event listener는 이 event를 받은 후 io.emit을 사용하여 모든 클라이언트들에게 event를 전달합니다.
  socket.on('send message', function(name,text) {
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

http.listen(3000, function(){
  console.log('server on!');
});