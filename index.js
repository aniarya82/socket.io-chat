var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
// io.sockets.emit('an event sent to all connected clients')
// io.emit('an event been broadcasted')
var chat = io
          .of('/chat')
          .on('connection', function (socket) {
            console.log('incoming connection on chat')
            socket.emit('a message', {
              that: 'only',
              '/chat': 'will get'
            })
            chat.emit('a message', {
              everyone: 'in',
              '/chat': 'will get'
            })
            // socket.on('chat msg', function (msg) {
            //   chat.emit('chat msg', msg)
            // })
          })
var news = io
          .of('/news')
          .on('connection', function (socket) {
            console.log('incoming connection on news')
            socket.emit('item', {news: 'item'})
            socket.on('news msg', function (msg) {
              news.emit('news msg', msg)
            })
          })

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/news', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

// io.on('connection', function (socket) {
//   socket.on('chat message', function (msg) {
//     io.emit('chat message', msg)
//   })
// })

http.listen(3000, function () {
  console.log('listening on *:3000')
})
