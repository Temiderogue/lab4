var express = require("express"); // импорт express
var app = express(); //инициализация express

var http = require('http').Server(app); // импорт из пакета http и создание http сервера
var io = require('socket.io')(http); // импорт пакета socket io и создание сокет сервера

app.use(express.static('public')); 

//С помощью метода app.get указано обработчик для обращения по пути '/'
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //принять событие 'send message'
  socket.on('send message', function(msg) {
    //порождение события 'receive message'
	io.emit('receive message', msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});