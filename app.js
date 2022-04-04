const express=require('express');
const app=new express();
var http=require('http').createServer(app);
var io=require('socket.io')(http);


io.on('connect',function (client)
{
    client.emit('connected');
    client.on('join',function(name){
        client.nickName=name;
    })

    client.on('message',function(data){
        // for specific client
        // client.emit('msg',data);

        // for group of clients without I    when some one leave from group whatsapp
        // client.broadcast.emit('msg',data);

        // for all with me
        // io.sockets.emit('msg',data);
        io.emit('msg',data)

    })

});

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname+'/chat.html');
})

http.listen(3000);